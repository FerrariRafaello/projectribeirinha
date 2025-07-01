# Projeto Ribeirinha

Um projeto desenvolvido com as tecnologias:

- **Backend:** Python (Flask)
- **Frontend:** HTML, CSS, JavaScript
- **Containerização:** Docker
- **Deploy:** Azure Web Apps

## Funcionalidades

- Página inicial e sistema de login com banco de dados para armazenamento dos estudantes.
- Interface dedicada para professores com dashboard para gestão de atividades.
- Integração backend e frontend.

## Execução do Projeto

### Execução Manual
Na pasta `backend` execute:
bash
python app.py
# ou
python3 app.py
Execução Docker
Na raiz do projeto:

bash
Copy code
docker build -t projectribeirinha .
docker run -p 5000:5000 projectribeirinha
Acesse localmente pelo endereço:
http://localhost:5000

Estrutura do Projeto
pgsql
Copy code
backend/
├── app.py
└── requirements.txt

frontend/
├── index.html
├── login.html
├── teacher.html
├── style.css
└── script.js

Dockerfile  
Procfile
Deploy na Azure
Projeto hospedado na Azure, disponível em:
🌐 projectribeirinhaapp.azurewebsites.net

Contexto do Projeto
Este projeto foi criado como trabalho da faculdade para ser utilizado em uma escola da população ribeirinha com o objetivo de ensinar Python para crianças. Por esse motivo, a aplicação conta com:

Um editor integrado para alunos codarem diretamente na aplicação.

Tarefas práticas para facilitar o aprendizado.

Dashboard para que professores possam acompanhar o progresso dos alunos.

Licença
Projeto licenciado sob a MIT License.
