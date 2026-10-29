const fatores = [
    "alunos", "estudante", "matricula", "matrícula", "transferencia", "transferência", 
    "rematricula", "rematrícula", "turma", "classe", "sala", "salas", "professor", 
    "professora", "docente", "diretor", "diretora", "coordenador", "coordenadora", 
    "secretaria", "secretário", "secretariaescolar", "pedagógico", "orientador", 
    "orientadora", "funcionário", "funcionarios", "equipe", "escola", "instituição", 
    "endereço", "endereco", "localização", "localizacao", "telefone", "contato", 
    "email", "e-mail", "site", "instagram", "facebook", "whatsapp", "horário", 
    "horario", "funcionamento", "abertura", "fechamento", "entrada", "saída", 
    "saida", "atraso", "portão", "portao", "uniforme", "roupa", "material", 
    "materiais", "mochila", "lista", "livro", "livros", "caderno", "apostila", 
    "estojo", "lápis", "caneta", "borracha", "régua", "calculadora", "tablet", 
    "notebook", "computador", "internet", "wifi", "wi-fi", "senha", "plataforma", 
    "portal", "boletim", "notas", "nota", "média", "media", "aprovação", "aprovacao", 
    "reprovação", "reprovacao", "recuperação", "recuperacao", "prova", "avaliação", 
    "avaliacao", "teste", "simulado", "trabalho", "seminário", "seminario", 
    "apresentação", "apresentacao", "tarefa", "lição", "licao", "dever", "deveres", 
    "atividade", "exercício", "exercicio", "falta", "faltas", "presença", "presenca", 
    "frequência", "frequencia", "atestado", "justificativa", "calendário", "calendario", 
    "feriado", "férias", "ferias", "recesso", "aula", "aulas", "período", "periodo", 
    "manhã", "manha", "tarde", "noite", "integral", "grade", "horárioaula", 
    "disciplinas", "matéria", "materia", "português", "matemática", "matematica", 
    "ciências", "ciencias", "história", "historia", "geografia", "inglês", "ingles", 
    "espanhol", "arte", "artes", "educação", "edfisica", "física", "química", 
    "quimica", "biologia", "filosofia", "sociologia", "redação", "redacao", 
    "literatura", "robótica", "robotica", "programação", "programacao", "informática", 
    "informatica", "laboratório", "laboratorio", "biblioteca", "livraria", "quadra", 
    "pátio", "patio", "refeitório", "refeitorio", "cantina", "lanche", "merenda", 
    "almoço", "almoco", "comida", "cardápio", "cardapio", "bebedouro", "banheiro", 
    "banheiros", "limpeza", "higiene", "acessibilidade", "elevador", "rampa", 
    "cadeirante", "inclusão", "inclusao", "deficiência", "deficiencia", "bullying", 
    "briga", "disciplina", "regras", "regimento", "direitos", "respeito", "convivência", 
    "convivencia", "denúncia", "denuncia", "reclamação", "reclamacao", "sugestão", 
    "sugestao", "achados", "perdidos", "objeto", "celular", "telefonecelular", 
    "foto", "imagem", "privacidade", "dados", "segurança", "seguranca", "emergência", 
    "emergencia", "primeirossocorros", "enfermaria", "machucado", "medicamento", 
    "alergia", "alergias", "saúde", "saude", "psicólogo", "psicologa", "psicologia", 
    "conselho", "reunião", "reuniao", "pais", "responsáveis", "responsaveis", 
    "família", "familia", "responsável", "autorização", "autorizacao", "saídaantecipada", 
    "excursão", "excursao", "passeio", "viagem", "evento", "eventos", "festa", 
    "formatura", "cerimônia", "cerimonia", "gincana", "campeonato", "esporte", 
    "esportes", "futebol", "vôlei", "volei", "basquete", "treino", "eletiva", 
    "projeto", "projetos", "feira", "ciênciasfeira", "olimpíada", "olimpiada", 
    "competição", "competicao", "bolsa", "desconto", "mensalidade", "pagamento", 
    "financeiro", "taxa", "gratuito", "gratuidade", "transporte", "ônibus", "onibus", 
    "van", "estacionamento", "bicicleta", "bicicletário", "portaria", "visitante", 
    "visita", "documento", "documentos", "histórico", "historico", "declaração", 
    "declaracao", "certificado", "diploma"
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
