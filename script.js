const fatores = [
    "alunos",
    "aulas",
    "professores",
    "materias",
    "anos",
    "matricula",
    "escola",
    "estudantes",
    "formatura",
    "eventos",
    "provas",
    "avalia",
    "salas",
    "tecnologias",
    "diretor",
    "coordenacao",
    "secretaria",
    "endereco",
    "contato",
    "horarios",
    "biblioteca",
    "livros",
    "aprovacao",
    "tarefa",
    "quadra",
    "refeitorio",
    "comida",
    "lanche",
    "cardapio",
    "acessibilidade",
    "olimpiadas",
    "bullying",
    "sugestao",
    "sugestoes",
    "pais",
    "responsaveis",
    "familia",
    "passeio",
    "passeios",
    "esporte",
    "diploma"
];

// Variável global para armazenar o JSON carregado da escola
let bigdata = [];
let jsoncarregado = false

// Carrega o JSON assim que o script é lido (ou você pode chamar isso na inicialização da página)
fetch("data.json")
    .then(resposta => resposta.json())
    .then(dados => {
        bigdata = dados;
        jsoncarregado = true
        console.log("JSON carregado e pronto para uso!");
    })
    .catch(erro => console.error("Erro ao carregar o JSON:", erro));

// 2. Processa a pergunta do usuário
function message_process(question) {
    question = question.toLowerCase();
    question = question.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Tira acentos
    question = question.replace(/[!?.,]/g, " "); // Tira pontuação
    return question.trim().split(/\s+/); // Retorna array de palavras
}

// 3. Verifica na lista de fatores e busca no JSON
function message_output(questionText) {
    if(!jsoncarregado){
        console.warn("Json nao carregado")
        return []
    }

    let messageWords = message_process(questionText);
    let result = "";
    
    for (let i = 0; i < messageWords.length; i++) {
        let word = messageWords[i];
        
        // Verifica se a palavra está na lista de fatores
        if (fatores.includes(word)) {
            // Se estiver, procura o objeto correspondente no JSON carregado
            let encontrado = bigdata.find(item => item.fator === word);
            
            if (encontrado && !result.includes(encontrado)) {
                result = encontrado.mensagem;
            }
        }
    }
    
    return result;
}

let botao = document.getElementById("trigger")
let response = document.getElementById("response")

botao.addEventListener("click", function(){
    input = document.getElementById("question").value
    console.log("Trigger!")
    console.log(input)
    
    response.textContent=message_output(input)

})
