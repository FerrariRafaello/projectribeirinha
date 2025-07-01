# Project Ribeirinha - Interactive Python Learning Platform

Project Ribeirinha is an interactive web-based Python learning platform designed to help students learn Python programming through hands-on practice. The platform features an integrated code editor, lesson progression system, and teacher dashboard for monitoring student progress.

## 🚀 Features

### For Students
- **Interactive Python Editor**: Execute Python code directly in the browser
- **Structured Learning Path**: 9 progressive lessons covering Python fundamentals
- **Real-time Code Execution**: Immediate feedback on code execution
- **Progress Tracking**: Automatic tracking of completed lessons
- **Responsive Design**: Works on desktop and mobile devices
- **Portuguese Interface**: Native Portuguese language support

### For Teachers
- **Student Dashboard**: Monitor student progress and completion rates
- **Analytics**: Visual charts showing completion statistics
- **Student Management**: View and manage enrolled students
- **Progress Overview**: Track which students have completed lessons

## 🛠️ Technology Stack

### Backend
- **Python 3.9+**
- **Flask 2.3.3** - Web framework
- **SQLAlchemy 2.0.23** - Database ORM
- **Flask-SQLAlchemy 3.1.1** - Flask-SQLAlchemy integration
- **Flask-Caching 2.1.0** - Caching support
- **SQLite** - Default database (configurable)
- **Gunicorn 21.2.0** - WSGI server for production

### Frontend
- **HTML5/CSS3/JavaScript** - Core web technologies
- **Tailwind CSS 2.2.19** - Utility-first CSS framework
- **Monaco Editor** (via RequireJS) - Code editor component
- **Chart.js** - Data visualization for teacher dashboard

### Deployment
- **Docker** - Containerization
- **Heroku** - Cloud deployment platform
- **Gunicorn** - Production WSGI server

## 📋 Prerequisites

- Python 3.9 or higher
- pip (Python package installer)
- Git

## 🔧 Installation

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/FerrariRafaello/projectribeirinha.git
   cd projectribeirinha
   ```

2. **Install Python dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:5000`
   - The application will serve the frontend files automatically

### Docker Setup

1. **Build the Docker image**
   ```bash
   docker build -t projectribeirinha .
   ```

2. **Run the container**
   ```bash
   docker run -p 5000:5000 projectribeirinha
   ```

### Heroku Deployment

1. **Install Heroku CLI** and login to your account

2. **Create a new Heroku app**
   ```bash
   heroku create your-app-name
   ```

3. **Deploy to Heroku**
   ```bash
   git push heroku main
   ```

## 🎯 Usage

### For Students

1. **Access the Platform**
   - Navigate to the application URL
   - Click "Sou Aluno" (I'm a Student)

2. **Login**
   - Enter your name and 4-digit RA (Registration Number)
   - The system will create your account automatically if it doesn't exist

3. **Learning Process**
   - Read each lesson content carefully
   - Use the interactive editor to practice Python code
   - Click "Executar" to run your code
   - Complete lessons to unlock the next ones
   - Progress is automatically saved

### For Teachers

1. **Access Teacher Dashboard**
   - Click "Sou Professor" (I'm a Teacher)
   - Enter the password: `Python-is-easy`

2. **Monitor Progress**
   - View completion statistics
   - See lists of students who completed/haven't completed lessons
   - Access visual analytics charts
   - Manage student records

## 📁 Project Structure

```
projectribeirinha/
├── backend/
│   ├── app.py              # Main Flask application
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── index.html         # Main learning interface
│   ├── login.html         # Login page
│   ├── teacher.html       # Teacher dashboard
│   ├── script.js          # Main application logic
│   ├── login.js           # Login functionality
│   ├── teacher.js         # Teacher dashboard logic
│   ├── style.css          # Main styles
│   ├── teacher.css        # Teacher dashboard styles
│   ├── teache.css         # Additional teacher styles
│   └── image.jpg          # Background image
├── Dockerfile             # Docker configuration
├── Procfile              # Heroku deployment config
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🌐 API Endpoints

### Authentication Routes (`/auth/*`)
- `POST /auth/login` - Student login/registration
- `POST /auth/complete_lesson` - Mark lesson as completed

### Main Application Routes
- `GET /` - Serve main application
- `GET /login.html` - Serve login page
- `GET /teacher.html` - Serve teacher dashboard
- `POST /execute` - Execute Python code
- `GET /dashboard_data` - Get student progress data
- `POST /delete_student` - Delete student record

## 🗃️ Database Schema

### Student Table
- `id` (Integer, Primary Key)
- `name` (String) - Student name
- `ra` (String, Unique) - 4-digit registration number
- `lessons_completed` (Integer) - Number of completed lessons

## 📚 Lesson Content

The platform includes 9 progressive Python lessons:
1. Introduction to Python and programming concepts
2. Variables and basic data types
3. Control structures (if/else)
4. Loops and iteration
5. Functions and code organization
6. Lists and data structures
7. Error handling and debugging
8. File operations and data processing
9. Final challenges and next steps

## 🔒 Environment Variables

- `DATABASE_URL` - Database connection string (optional, defaults to SQLite)
- `PORT` - Application port (optional, defaults to 5000)
- `FLASK_ENV` - Flask environment (development/production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 style guide for Python code
- Use meaningful commit messages
- Test your changes before submitting
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **FerrariRafaello** - Initial work - [GitHub Profile](https://github.com/FerrariRafaello)

## 🙏 Acknowledgments

- Built with Flask and modern web technologies
- Inspired by interactive learning platforms
- Special thanks to the Python community for educational resources

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/FerrariRafaello/projectribeirinha/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers through GitHub

---

**Happy Learning! 🐍✨**