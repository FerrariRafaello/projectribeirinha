import os
import subprocess
from flask import Flask, request, jsonify, redirect, send_from_directory, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_caching import Cache
from werkzeug.middleware.proxy_fix import ProxyFix
from sqlalchemy.exc import SQLAlchemyError

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, '..', 'frontend')

app = Flask(
    __name__,
    static_folder=FRONTEND_DIR,
    static_url_path=''
)
app.config['SECRET_KEY'] = 'you-will-never-guess'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CACHE_TYPE'] = 'SimpleCache'
app.config['CACHE_DEFAULT_TIMEOUT'] = 300

db = SQLAlchemy(app)
cache = Cache(app)

# Blueprints
main_bp = Blueprint('main', __name__)
auth_bp = Blueprint('auth', __name__)

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    ra = db.Column(db.String(20), unique=True, nullable=False)
    lessons_completed = db.Column(db.Integer, default=0)

with app.app_context():
    db.create_all()

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

@main_bp.route('/')
def index_page():
    return redirect('/login.html')

@main_bp.route('/login.html')
def login_page():
    return app.send_static_file('login.html')

@main_bp.route('/index.html')
def index_html():
    return app.send_static_file('index.html')

@main_bp.route('/teacher.html')
def teacher_page():
    return app.send_static_file('teacher.html')

@main_bp.route('/execute', methods=['POST'])
def execute_code():
    code = request.json.get('code', '')
    try:
        result = subprocess.run(
            ['python3', '-c', code],
            capture_output=True,
            text=True,
            check=True
        )
        output = result.stdout
    except subprocess.CalledProcessError as e:
        output = e.stderr
    return jsonify({'output': output})

# NOVO ENDPOINT: Adicionar rota para excluir alunos
@main_bp.route('/delete_student', methods=['POST'])
def delete_student():
    try:
        # Obter dados da solicitação
        data = request.json
        
        # Verificar se o RA foi fornecido
        if not data or 'ra' not in data:
            print("RA não fornecido na solicitação")
            return jsonify({'success': False, 'error': 'RA do aluno não fornecido'}), 400
            
        ra = data['ra']
        print(f"Solicitação para excluir aluno com RA: {ra}")
        
        # Verificar se o aluno existe
        student = Student.query.filter_by(ra=ra).first()
        
        if not student:
            print(f"Aluno com RA {ra} não encontrado")
            return jsonify({'success': False, 'error': f'Aluno com RA {ra} não encontrado'}), 404
            
        # Excluir o aluno
        student_name = student.name  # Guardar o nome para o log
        db.session.delete(student)
        db.session.commit()
        
        print(f"Aluno {student_name} (RA: {ra}) excluído com sucesso")
        return jsonify({'success': True, 'message': f'Aluno com RA {ra} excluído com sucesso'})
        
    except SQLAlchemyError as e:
        db.session.rollback()
        error_msg = str(e)
        print(f"Erro SQL ao excluir aluno: {error_msg}")
        return jsonify({'success': False, 'error': error_msg}), 500
    except Exception as e:
        error_msg = str(e)
        print(f"Erro inesperado ao excluir aluno: {error_msg}")
        return jsonify({'success': False, 'error': error_msg}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    name = data.get('name')
    ra = data.get('ra')

    if not name or not ra:
        return jsonify({'error': 'Nome e RA são obrigatórios'}), 400

    try:
        student = Student.query.filter_by(ra=ra).first()
        if not student:
            student = Student(name=name, ra=ra)
            db.session.add(student)
            db.session.commit()
        return jsonify({
            'name': student.name,
            'ra': student.ra,
            'lessons_completed': student.lessons_completed
        })
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/complete_lesson', methods=['POST'])
def complete_lesson():
    data = request.json
    ra = data.get('ra')
    if not ra:
        return jsonify({'error': 'RA é obrigatório'}), 400

    try:
        student = Student.query.filter_by(ra=ra).first()
        if student:
            student.lessons_completed += 1
            db.session.commit()
            print(f"Lição completada por {student.name} (RA: {student.ra}). Total: {student.lessons_completed}")
        else:
            print(f"Aluno com RA {ra} não encontrado")
            return jsonify({'error': 'Aluno não encontrado'}), 404
            
        return jsonify({'lessons_completed': student.lessons_completed})
    except SQLAlchemyError as e:
        db.session.rollback()
        print(f"Erro ao atualizar lição: {str(e)}")
        return jsonify({'error': str(e)}), 500

@main_bp.route('/dashboard_data', methods=['GET'])
def dashboard_data():
    try:
        # Obter todos os alunos do banco de dados
        students = Student.query.all()
        
        if not students:
            print("Nenhum aluno encontrado no banco de dados")
        else:
            print(f"Total de {len(students)} alunos encontrados")
            for student in students:
                print(f"Aluno: {student.name}, RA: {student.ra}, Lições: {student.lessons_completed}")
        
        # Número de lições consideradas para "completar" o curso
        # Consideramos o total de lições do script.js que atualmente tem 8 lições (índices 0-7)
        total_lessons = 8
        
        # Contar alunos que completaram e que não completaram
        completed_students_list = []
        not_completed_students_list = []
        
        for s in students:
            # Se completou todas as lições
            if s.lessons_completed >= total_lessons:
                completed_students_list.append({
                    'name': s.name,
                    'ra': s.ra,
                    'lessons_completed': f"{s.lessons_completed} lições"
                })
            # Se ainda não completou todas as lições
            else:
                not_completed_students_list.append({
                    'name': s.name,
                    'ra': s.ra,
                    'lessons_completed': f"{s.lessons_completed} lições"
                })
        
        # Log para depuração
        print(f"Alunos que completaram: {len(completed_students_list)}")
        print(f"Alunos que não completaram: {len(not_completed_students_list)}")
        
        # Retornar os dados
        return jsonify({
            'total_students': len(students),
            'completed_lessons': len(completed_students_list),
            'not_completed_lessons': len(not_completed_students_list),
            'completed_students': completed_students_list,
            'not_completed_students': not_completed_students_list
        })
    except SQLAlchemyError as e:
        print(f"Erro no banco de dados: {str(e)}")
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        print(f"Erro inesperado: {str(e)}")
        return jsonify({'error': str(e)}), 500

app.register_blueprint(main_bp)
app.register_blueprint(auth_bp, url_prefix='/auth')

if __name__ == '__main__':
    app.wsgi_app = ProxyFix(app.wsgi_app)
    app.run(host='0.0.0.0', port=5000, debug=True)
