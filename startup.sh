cd /home/site/wwwroot
pip install Flask==2.3.3
pip install Flask-SQLAlchemy==3.1.1
pip install Flask-Caching==2.1.0
pip install Werkzeug==2.3.7
pip install SQLAlchemy==2.0.23
pip install gunicorn==21.2.0
pip install pyodbc==4.0.39
cd /home/site/wwwroot
exec gunicorn --chdir backend app:app
