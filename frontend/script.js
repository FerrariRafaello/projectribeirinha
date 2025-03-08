// Array com as lições (mantendo todo o conteúdo original)
const lessons = [
    `<p>Bem-vindo ao editor interativo de Python. Aqui você aprenderá um pouco sobre Python e como ele pode te ajudar a se tornar um grande profissional e ajudar muitas outras pessoas no mundo. Nesse mini curso serão apresentadas 8 lições para você entender alguma coisa sobre Python e suas aplicações. A linguagem Python foi criada há algum tempo por um programador chamado Guido Van Rossum. Nos dias atuais, a linguagem é utilizada por vários entusiastas para criar um mundo inteiro dentro de um computador, sabia que foi utilizado Python bem aqui onde você está aprendendo? Exatamente, e isso é só o começo de muitas possibilidades que você poderá criar com algumas linhas de código... Vamos começar?</p>
     <p>Use o editor à direita para escrever seu código e clique no botão "Executar" para ver os resultados. Para essa lição, vamos começar com algo simples, clique no editor e execute: print("Olá, Mundo!") e veja a saída, isso se chama "instrução", utilizamos diversas vezes para testarmos erros e acertos em nossos códigos, e agora você pode dizer que já fez seu primeiro código em Python, viu que fácil? vamos para a próxima lição.</p>`,
    
    `<p>Lição 2: Introdução ao Python</p>
     <p>Nesta lição, aprenderemos sobre variáveis, o que são? Variáveis são formas de armazenar dados, igual você que guarda algo no bolso? então, essas variáveis ajudam a acessar dados mais tarde, entre no editor e digite: variavel1 = 1 , com isso você terá o numero 1 dentro de uma variável para ser acessado mais tarde ;).Vamos prosseguir?</p>`,
    
    `<p>Lição 3: Somando Variáveis</p>
     <p>Nesta lição, você tem sua variavel1 certo? que tal criarmos mais uma variável e somarmos elas? abaixo de variavel1 digite: variavel2 = 2, agora temos 2 variáveis, com isso podemos executar a soma delas, digite abaixo de variavel2: print(variavel1 + variavel2), viu só? isso se chama somar variáveis, bem simples né? que tal subtrair elas? Aperte em concluir e nos vemos na próxima lição. </p>`,
     
     `<p>Lição 4: Subtraindo Variáveis</p>
     <p>Nesta lição, você aprendeu a somar, certo? que tal diminuir? troque o sinal de "+" em print(variavel1 + variavel2) e veja o resultado. Agora você ja aprendeu sobre como mostrar saídas no editor com print e como utilizar variáveis. Vamos para próxima lição? </p>`,
     
     `<p>Lição 5: Listas?</p>
     <p>Nesta lição, você aprenderá a criar uma lista e como somar elas da mesma forma que fizemos com variáveis, para criar uma lista precisamos limpar nosso editor, clique com o mouse dentro do editor e no teclado segure a tecla ctrl e precione A, com isso você selecionar todo o conteúdo do editor, depois você só precisa clicar em backspace, pronto! Rápido né? com nosso editor limpo vamos criar nossas listas: lista1 = [1,2] 
     	lista2 = [3,4]
     	print(lista1 + lista2)
Aqui nós temos apenas 1 conceito diferente, sabe qual é? exatamente os conchetes [], eles são usados para criar listas, você viu o resultado? Legal né? da para fazer isso com tuplas também... sabe o que é uma tupla? </p>`,
     
     `<p>Lição 6: Tuplas?</p>
     <p>Nesta lição, você aprenderá sobre tuplas, elas são parecidas? um pouco, mas são i-mu-ta-veis sabe o que é isso? não podem ser mexidas... Elas utilizam parênteses (), vamos tentar executar o mesmo código anterior com os ()? apenas modifique e veja o que acontece:
     lista1 = (1,2)
     lista2 = (3,4)
     print(lista1 + lista2)
Viu só? interessante não é? para somarmos o conteúdo, seria necessário metódos mais avançados... sinta-se a vontade para perguntar ao seu professor ou buscar sobre, somente a prática te levará a perfeição :) </p>`,
    
    `<p>Lição 7: Onde eu posso aplicar listas e tuplas?</p>
    <p>Nesta lição, você aprenderá que o poder das listas e tuplas podem ir muito além...
    Nós podemos colocar muito mais objetos dentro de tuplas e listas, aliás, você sabe que em Python TUDO É OBJETO, certo? vamos conhecer alguns outros objetos: inteiros: 1, 2, 3, 4... float: 1.0,1.1,1.2...
boolean: True, False e o mais conhecido: strings: "Olá, Mundo!", lembrou de algo? hmmmm, pois é! E que tal colocarmos isso dentro de lista? Lembre-se de limpar seu editor CTRL+A...
	lista1 = ["Olá, Mundo!", 1, 0.1, True]
	print(lista1)
Engraçado, não? tente com tuplas e veja o resultado.. Isso serve não só para guardar valores como também para acessá-los depois.</p>`,
    
    `<p>Lição 8: Acessando valores!</p>
    <p>Nesta lição, você aprenderá a acessar valores. Se perguntou como poderia pegar o valor 1 da lista? bem... em Python nós iniciamos tudo pelo valor 0, então o Olá Mundo possui "índice(valor)" 0, se queremos o 1 então o índice dele é? ahamm, 1. Vamos tentar?
    lista1 = ["Olá, Mundo!", 1, 0.1, True]
    print(lista1[1])
Ué... conchetes? exatamente, para acessarmos um objeto específico, usamos [], viu o resultado? tente com os outros valores :). </p>`,
    
    `<p>Lição 9: E agora?</p>
    <p>Ultima lição. ATENÇÃO>>> Essa será nossa ultima lição... lembre-se: Se você clicar em concluir a lição, não poderá mais acessar o portal, por isso, use bastante o terminal e fique a vontade para refazer, rever ou criar seus próprios códigos aqui, agradeço a colaboração e nos vemos juntos programando XD.
Que tal um desafio? tente criar uma lista com 5 valores, dentro dessa lista coloque seu nome e depois tente acessar ele usando [] e o print, hmm muito fácil? tente criar uma nova váriavel, colocar a lista dentro dela e acessar o valor usando a variável, não a lista! Até a próxima jovem Padawan. </p>`,
];

// Variáveis básicas
let currentLesson = Number(sessionStorage.getItem('lessonsCompleted')) || 0;

// Elementos DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado!');
    
    const backButton = document.getElementById('backButton');
    const nextLessonButton = document.getElementById('nextLesson');
    const prevLessonButton = document.getElementById('prevLesson');
    const completeLessonButton = document.getElementById('completeLesson');
    const lessonContent = document.getElementById('lesson-content');
    const completionMessage = document.getElementById('completionMessage');
    const finishButton = document.getElementById('finishButton');
    const outputDiv = document.getElementById('output');
    const editorContainer = document.getElementById('editor');
    
    // Nome do estudante
    const studentName = sessionStorage.getItem('studentName');
    if (studentName) {
        const studentNameDisplay = document.getElementById('studentNameDisplay');
        if (studentNameDisplay) {
            studentNameDisplay.textContent = `Olá, ${studentName}`;
            studentNameDisplay.classList.remove('hidden');
        }
    }
    
    // Função para carregar lição
    function loadCurrentLesson() {
        const validIndex = Math.min(currentLesson, lessons.length - 1);
        if (lessonContent) {
            lessonContent.innerHTML = lessons[validIndex] || '';
        }
        
        const completedCount = Number(sessionStorage.getItem('lessonsCompleted')) || 0;
        
        // Habilitar/desabilitar botão próxima
        if (nextLessonButton) {
            nextLessonButton.disabled = !(validIndex < completedCount);
        }
        
        // Cor do botão concluir
        if (completeLessonButton) {
            if (validIndex < completedCount) {
                completeLessonButton.classList.remove('bg-gray-500', 'opacity-50');
                completeLessonButton.classList.add('bg-green-500');
            } else {
                completeLessonButton.classList.remove('bg-green-500');
                completeLessonButton.classList.add('bg-gray-500', 'opacity-50');
            }
        }
    }
    
    // Voltar para login
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
    
    // Próxima lição
    if (nextLessonButton) {
        nextLessonButton.addEventListener('click', function() {
            if (currentLesson < lessons.length - 1) {
                currentLesson++;
                loadCurrentLesson();
            } else if (completionMessage) {
                completionMessage.classList.remove('hidden');
            }
        });
    }
    
    // Lição anterior
    if (prevLessonButton) {
        prevLessonButton.addEventListener('click', function() {
            if (currentLesson > 0) {
                currentLesson--;
                loadCurrentLesson();
            }
        });
    }
    
    // Completar lição
    if (completeLessonButton) {
        completeLessonButton.addEventListener('click', function() {
            const completedCount = Number(sessionStorage.getItem('lessonsCompleted')) || 0;
            if (currentLesson >= completedCount) {
                const studentRA = sessionStorage.getItem('studentRA');
                
                fetch('/auth/complete_lesson', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ra: studentRA })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error);
                        return;
                    }
                    
                    sessionStorage.setItem('lessonsCompleted', data.lessons_completed);
                    
                    if (data.lessons_completed >= lessons.length && completionMessage) {
                        completionMessage.classList.remove('hidden');
                    }
                    
                    loadCurrentLesson();
                })
                .catch(error => console.error('Erro:', error));
            }
        });
    }
    
    // Finalizar
    if (finishButton) {
        finishButton.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
    
    // Inicializar editor Monaco
    require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs' } });
    require(['vs/editor/editor.main'], function() {
        if (editorContainer) {
            const editor = monaco.editor.create(editorContainer, {
                value: '# Escreva seu código Python aqui...\n',
                language: 'python',
                theme: 'vs-dark',
                automaticLayout: true
            });
            
            // Botão "Executar"
            const runButton = document.getElementById('runButton');
            if (runButton) {
                runButton.addEventListener('click', function() {
                    const code = editor.getValue();
                    
                    fetch('/execute', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ code })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (outputDiv) {
                            outputDiv.innerText = data.output;
                            outputDiv.classList.remove('hidden');
                        }
                    })
                    .catch(error => {
                        if (outputDiv) {
                            outputDiv.innerText = 'Erro ao executar o código.';
                            outputDiv.classList.remove('hidden');
                        }
                        console.error('Erro:', error);
                    });
                });
            }
        }
    });
    
    // Carregar primeira lição
    loadCurrentLesson();
});
