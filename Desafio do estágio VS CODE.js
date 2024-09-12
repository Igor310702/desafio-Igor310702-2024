// JavaScript source code
class RecintosZoo {
constructor() {
    this.recintos = [
        {numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: ['MACACO', 'MACACO', 'MACACO']},
        {numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: []},
        {numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: ['GAZELA']},
        {numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: []},
        {numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: ['LEAO']}
    ];
    this.animaisValidos = {
        'LEAO': {tamanho: 3, bioma: ['savana'], carnivoro: true},
        'LEOPARDO': {tamanho: 2, bioma: ['savana'], carnivoro: true},
        'CROCODILO': {tamanho: 3, bioma: ['rio'], carnivoro: true},
        'MACACO': {tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false},
        'GAZELA': {tamanho: 2, bioma: ['savana'], carnivoro: false},
        'HIPOPOTAMO': {tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false},
    };
}

    analisaRecintos(animal, quantidade) {
        // Valida��o do animal
        if (!this.animaisValidos[animal]) {
            return { erro: "Animal inv�lido" };
        }

        // Valida��o da quantidade
        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inv�lida" };
        }

        const infoAnimal = this.animaisValidos[animal];
        const recintosViaveis = this.recintos.filter(recinto => {
            const espacoOcupado = this.ocupaEspa�o(recinto.animais);
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

            // Verifica se h� bioma compat�vel
            if (!infoAnimal.bioma.includes(recinto.bioma)) return false;

            // Verifica se � carnivoro e se pode conviver
            if (infoAnimal.carnivoro && recinto.animais.length > 0 && !recinto.animais.some(a => a !== animal)) {
                return false;
            }

            // Verifica se � hipopotamo e h� outras esp�cies
            if (animal === 'HIPOPOTAMO' && recinto.animais.length > 0 && !recinto.bioma.includes('savana e rio')) {
                return false;
            }

            // Verifica se � macaco e o recinto est� vazio
            if (animal === 'MACACO' && recinto.animais.length === 0) {
                return false;
            }

            // Verifica se h� espa�o suficiente
            const espacoNecessario = quantidade * infoAnimal.tamanho;
            return espacoLivre >= espacoNecessario;
        })
            // Ordena os recintos por n�mero
            .sort((a, b) => a.numero - b.numero)
            .map(recinto => {
                const espacoOcupado = this.ocupaEspa�o(recinto.animais);
                const espacoLivre = recinto.tamanhoTotal - espacoOcupado - (quantidade * infoAnimal.tamanho);
                return `Recinto ${recinto.numero} (espa�o livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
            });

        if (recintosViaveis.length > 0) {
            return { recintosViaveis };
        }

        return { erro: "N�o existe recinto vi�vel" };
    }