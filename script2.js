// makes the string lowercase, then replaces pontuations with space, then splits every word into a string
function message_process(question){
    question = question.toLowerCase()
    question = question.replace("!", " ")
    question = question.replace("?", " ")
    question = question.replace(".", " ")
    question = question.replace(",", " ")
    return question.split(" ")
}

function message_output(messageWords, listaFatores, bigdata) {
    let results;
    
    for (let i = 0; i < messageWords.length; i++) {
        let word = messageWords[i];
        
        // Primeiro: verifica se a palavra está na lista de fatores
        if (listaFatores.includes(word)) {
            // Segundo: se estiver, procura o objeto correspondente no JSON
            let encontrado = bigdata.find(item => item.fator === word);
            
            if (encontrado) {
                results.push(encontrado);
            }
        }
    }
    
    return results; // Retorna os objetos encontrados no JSON
}

let fatores = ["aluno", "estudante", "matricula", "matrícula", "transferencia", "transferência", 
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
    "declaracao", "certificado", "diploma"];

let data = []

fetch("data.json").then(resposta => resposta.json()).then(dados => {
    data = dados
    console.log("JSON CARREGADO")
})

let texto = "quantos alunos temos na escola?"
texto = message_process(texto)
console.log(message_output(texto, fatores, data))