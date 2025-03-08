# Projeto Ribeirinha

Um sistema de aprendizado para a comunidade ribeirinha, com dashboard para professores acompanharem o progresso dos alunos.

## Estrutura do Projeto
project/ ├── backend/ # Código do servidor Flask ├── frontend/ # Arquivos HTML, CSS e JavaScript └── Dockerfile # Configuração para containerização

Code

## Funcionalidades

- Login de alunos
- Dashboard do professor
- Acompanhamento de progresso
- Gerenciamento de alunos (inclusão e exclusão)

## Tecnologias

- Backend: Python com Flask
- Frontend: HTML, CSS, JavaScript
- Banco de dados: SQLite (desenvolvimento) / Azure SQL (produção)

## Configuração local

1. Clone o repositório:
git clone https://github.com/FerrariRafaello/projectribeirinha.git cd projectribeirinha

Code

2. Instale as dependências:
cd backend pip install -r requirements.txt

Code

3. Execute o aplicativo:
python app.py

Code

4. Acesse o aplicativo em `http://localhost:5000`

## Docker (Opcional)

Para executar usando Docker:

docker build -t projectribeirinha . docker run -p 5000:5000 projectribeirinha

Code

## Licença

Este projeto é licenciado sob a licença MIT.
