document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando dashboard do professor - ' + new Date().toISOString());
    
    // Configurar botão voltar
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }

    // Função para processar e exibir os dados dos alunos
    function processarDados(dados) {
        console.log('Processando dados:', dados);
        
        // Verificar se os dados são válidos
        if (!dados || typeof dados !== 'object') {
            console.error('Dados inválidos recebidos do servidor');
            mostrarMensagemErro('Não foi possível carregar os dados. Tente novamente.');
            return;
        }
        
        // Obter elementos do DOM
        const completedList = document.getElementById('completedStudents');
        const notCompletedList = document.getElementById('notCompletedStudents');
        
        // Limpar listas
        if (completedList) completedList.innerHTML = '';
        if (notCompletedList) notCompletedList.innerHTML = '';
        
        // Verificar e usar arrays de alunos
        const alunosConcluintes = Array.isArray(dados.completed_students) ? dados.completed_students : [];
        const alunosNaoConcluintes = Array.isArray(dados.not_completed_students) ? dados.not_completed_students : [];
        
        console.log(`Processando: ${alunosConcluintes.length} concluintes, ${alunosNaoConcluintes.length} não concluintes`);
        
        // Exibir alunos que concluíram
        if (completedList) {
            if (alunosConcluintes.length > 0) {
                alunosConcluintes.forEach(aluno => {
                    if (aluno && aluno.name && aluno.ra) {
                        const li = document.createElement('li');
                        li.className = 'py-2 border-b border-gray-200 flex justify-between items-center';
                        li.innerHTML = `
                            <span>${aluno.name} (RA: ${aluno.ra}) - Completou ${aluno.lessons_completed || 'todas as lições'}</span>
                            <button class="delete-btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" 
                                   data-ra="${aluno.ra}" data-tipo="completed">X</button>
                        `;
                        completedList.appendChild(li);
                    }
                });
            } else {
                const li = document.createElement('li');
                li.className = 'py-2 text-gray-500 italic';
                li.textContent = "Nenhum aluno completou todas as lições ainda.";
                completedList.appendChild(li);
            }
        }
        
        // Exibir alunos que não concluíram
        if (notCompletedList) {
            if (alunosNaoConcluintes.length > 0) {
                alunosNaoConcluintes.forEach(aluno => {
                    if (aluno && aluno.name && aluno.ra) {
                        const li = document.createElement('li');
                        li.className = 'py-2 border-b border-gray-200 flex justify-between items-center';
                        
                        // Formatação para mostrar as lições completadas
                        const licoesInfo = aluno.lessons_completed ? 
                            `${aluno.lessons_completed}` : 
                            '0 lições';
                        
                        li.innerHTML = `
                            <span>${aluno.name} (RA: ${aluno.ra}) - ${licoesInfo}</span>
                            <button class="delete-btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" 
                                   data-ra="${aluno.ra}" data-tipo="not-completed">X</button>
                        `;
                        notCompletedList.appendChild(li);
                    }
                });
            } else {
                const li = document.createElement('li');
                li.className = 'py-2 text-gray-500 italic';
                li.textContent = "Todos os alunos completaram todas as lições!";
                notCompletedList.appendChild(li);
            }
        }
        
        // Adicionar listeners para botões de exclusão
        adicionarListenersExclusao();
        
        // Atualizar contadores
        atualizarContadores(alunosConcluintes, alunosNaoConcluintes);
        
        // Criar gráficos
        criarGraficos(alunosConcluintes, alunosNaoConcluintes);
    }
    
    // Função para adicionar event listeners aos botões de exclusão
    function adicionarListenersExclusao() {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const ra = this.getAttribute('data-ra');
                const tipo = this.getAttribute('data-tipo');
                
                if (confirm(`Tem certeza que deseja excluir o aluno com RA ${ra}?`)) {
                    excluirAluno(ra, tipo);
                }
            });
        });
    }
    
    // Função para excluir aluno
    function excluirAluno(ra, tipo) {
        fetch('/delete_student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ra: ra })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao excluir aluno: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Remover o elemento da lista
                const parentList = tipo === 'completed' ? 
                    document.getElementById('completedStudents') : 
                    document.getElementById('notCompletedStudents');
                    
                const item = parentList.querySelector(`button[data-ra="${ra}"]`).closest('li');
                if (item) {
                    item.remove();
                }
                
                alert('Aluno excluído com sucesso!');
                
                // Recarregar o dashboard para atualizar contadores e gráficos
                carregarDashboard();
            } else {
                alert('Erro ao excluir aluno: ' + (data.error || 'Erro desconhecido'));
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao tentar excluir o aluno. Tente novamente.');
        });
    }
    
    // Função para atualizar os contadores
    function atualizarContadores(concluintes, naoConcluintes) {
        const totalElement = document.getElementById('totalStudents');
        const completedElement = document.getElementById('completedCount');
        const notCompletedElement = document.getElementById('notCompletedCount');
        
        if (totalElement) {
            totalElement.textContent = (concluintes.length + naoConcluintes.length).toString();
        }
        
        if (completedElement) {
            completedElement.textContent = concluintes.length.toString();
        }
        
        if (notCompletedElement) {
            notCompletedElement.textContent = naoConcluintes.length.toString();
        }
    }

    // Função para mostrar mensagem de erro
    function mostrarMensagemErro(mensagem) {
        const completedList = document.getElementById('completedStudents');
        const notCompletedList = document.getElementById('notCompletedStudents');
        
        const errorMessage = document.createElement('li');
        errorMessage.className = 'text-red-500 py-2';
        errorMessage.textContent = mensagem;
        
        if (completedList) {
            completedList.innerHTML = '';
            completedList.appendChild(errorMessage.cloneNode(true));
        }
        
        if (notCompletedList) {
            notCompletedList.innerHTML = '';
            notCompletedList.appendChild(errorMessage);
        }
    }

    // Função para criar os gráficos
    function criarGraficos(concluintes, naoConcluintes) {
        console.log('Criando gráficos com:', { concluintes: concluintes.length, naoConcluintes: naoConcluintes.length });
        
        // Destruir gráficos existentes se houver
        if (window.chartStatus) {
            window.chartStatus.destroy();
        }
        
        if (window.chartProgress) {
            window.chartProgress.destroy();
        }
        
        // Gráfico de status
        const ctxCompleted = document.getElementById('completedChart');
        if (ctxCompleted) {
            window.chartStatus = new Chart(ctxCompleted.getContext('2d'), {
                type: 'pie',
                data: {
                    labels: ['Não Completaram', 'Completaram'],
                    datasets: [{
                        data: [naoConcluintes.length, concluintes.length],
                        backgroundColor: ['#F44336', '#4CAF50']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { color: 'white' }
                        },
                        title: {
                            display: true,
                            text: 'Status de Conclusão',
                            color: 'white'
                        }
                    }
                }
            });
        }
        
        // Gráfico de progresso
        const ctxProgress = document.getElementById('progressChart');
        if (ctxProgress && naoConcluintes.length > 0) {
            const labels = naoConcluintes.map(aluno => aluno.name);
            const progressData = naoConcluintes.map(aluno => {
                // Extrair número das lições
                const match = String(aluno.lessons_completed || '0').match(/(\d+)/);
                return match ? parseInt(match[1], 10) : 0;
            });

            window.chartProgress = new Chart(ctxProgress.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Lições Completadas',
                        data: progressData,
                        backgroundColor: '#FF9800'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { color: 'white' }
                        },
                        title: {
                            display: true,
                            text: 'Progresso dos Alunos',
                            color: 'white'
                        }
                    },
                    scales: {
                        x: { ticks: { color: 'white' } },
                        y: { beginAtZero: true, ticks: { color: 'white' } }
                    }
                }
            });
        }
    }

    // Função principal para carregar os dados
    function carregarDashboard() {
        console.log('Carregando dashboard...');
        
        // Mostrar mensagem de carregamento
        const completedList = document.getElementById('completedStudents');
        const notCompletedList = document.getElementById('notCompletedStudents');
        
        if (completedList) completedList.innerHTML = '<li class="py-2 text-gray-400">Carregando dados...</li>';
        if (notCompletedList) notCompletedList.innerHTML = '<li class="py-2 text-gray-400">Carregando dados...</li>';
        
        // Buscar dados do servidor
        fetch('/dashboard_data')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Falha na requisição: ${response.status}`);
                }
                return response.json();
            })
            .then(dados => {
                console.log('Dados recebidos:', dados);
                processarDados(dados);
            })
            .catch(error => {
                console.error('Erro ao carregar dados:', error);
                mostrarMensagemErro('Erro ao carregar dados do servidor. Tente novamente mais tarde.');
            });
    }

    // Iniciar o carregamento do dashboard
    carregarDashboard();
});
