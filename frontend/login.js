// Exibe o formulário de aluno e esconde o de professor ao clicar em "Sou Aluno"
document.getElementById('studentButton').addEventListener('click', () => {
    document.getElementById('studentForm').classList.remove('hidden');
    document.getElementById('teacherForm').classList.add('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
});

// Exibe o formulário de professor e esconde o de aluno ao clicar em "Sou Professor"
document.getElementById('teacherButton').addEventListener('click', () => {
    document.getElementById('teacherForm').classList.remove('hidden');
    document.getElementById('studentForm').classList.add('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
});

// Acesso de Aluno
document.getElementById('accessStudent').addEventListener('click', () => {
    let studentName = document.getElementById('studentName').value.trim();
    const studentRA = document.getElementById('studentRA').value.trim();

    // Validação do RA
    const raRegex = /^\d{4}$/;
    if (!raRegex.test(studentRA)) {
        alert('O RA deve conter exatamente 4 dígitos.');
        return;
    }

    // Ajusta nome (capitalização)
    studentName = studentName
        .split(' ')
        .map(
            word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ');

    if (studentName.length > 0 && studentRA.length > 0) {
        // Importante: observe o prefixo '/auth' definido no Blueprint do Flask
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: studentName, ra: studentRA }),
        })
            .then(async response => {
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(text || 'Ocorreu um erro.');
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    alert(data.error);
                    return;
                }
                // Salva info do aluno
                sessionStorage.setItem('studentName', data.name);
                sessionStorage.setItem('studentRA', data.ra);
                sessionStorage.setItem('lessonsCompleted', data.lessons_completed);

                // Se já concluiu todas as lições
                const totalLessons = 3;
                if (data.lessons_completed >= totalLessons) {
                    alert('Você já concluiu todas as lições, nos vemos em breve!');
                } else {
                    window.location.href = 'index.html';
                }
            })
            .catch(error => console.error('Erro:', error));
    } else {
        alert('Por favor, insira um nome e RA válidos.');
    }
});

// Acesso de Professor
document.getElementById('accessTeacher').addEventListener('click', () => {
    const password = document.getElementById('teacherPassword').value.trim();
    if (password === 'Python-is-easy') {
        window.location.href = 'teacher.html';
    } else {
        document.getElementById('errorMessage').classList.remove('hidden');
    }
});
