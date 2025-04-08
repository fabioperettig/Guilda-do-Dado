const jogos = [
    {
        nome: "Forest Quest",
        categoria: "Aventura",
        imagem: "assets/img/forest-quest.png",
        sinopse: "Aventure-se pela floresta encantada e enfrente criaturas mágicas em busca do tesouro perdido!",
        dificuldade: "Fácil",
        jogadores: "1 a 4",
    },
    {
        nome: "Galactic Jelly",
        categoria: "aventura",
        imagem: "assets/img/galactic-jelly.png",
        dificuldade: "Fácil",
        jogadores: "2 a 6",
    },
    {
        nome: "Maré Selvagem",
        categoria: "estrategia",
        imagem: "assets/img/mare-selvagem.png",
        dificuldade: "Difícil",
        jogadores: "1 a 8",
    },
    {
        nome: "Ruínas do Amanhã",
        categoria: "estrategia",
        imagem: "assets/img/ruinas-amanha.png",
        dificuldade: "Médio",
        jogadores: "1 a 12",
    },
    {
        nome: "Sombras da Verdade",
        categoria: "estrategia",
        imagem: "assets/img/sombras-verdade.png",
        dificuldade: "Médio",
        jogadores: "2 a 8",
    },
];

function criarCards() {
    jogos.forEach(jogo => {
        const card = document.createElement("div");
        card.classList.add("card-jogo");
        card.innerHTML = `
            <img src="${jogo.imagem}" alt="${jogo.nome}">
            <h3>${jogo.nome}</h3>
        `;

        card.addEventListener('click', () => abrirModal(jogo));

        const galeria = document.querySelector(`.grid-jogos.${jogo.categoria.toLowerCase()}`);
        if (galeria) {
            galeria.appendChild(card);
        } else {
            console.error(`Galeria não encontrada para a categoria: ${jogo.categoria}`);
        }
    });
}

function abrirModal(jogo) {
    document.getElementById('modal-imagem').src = jogo.imagem;
    document.getElementById('modal-nome').textContent = jogo.nome;
    document.getElementById('modal-sinopse').textContent = jogo.sinopse;
    document.getElementById('modal-categoria').textContent = `Categoria: ${jogo.categoria}`;
    document.getElementById('modal-dificuldade').textContent = `Dificuldade: ${jogo.dificuldade}`;
    document.getElementById('modal-jogadores').textContent = `Jogadores: ${jogo.jogadores}`;

    document.getElementById('modal-jogo').classList.remove('hidden');
}

function aplicarFiltrosEBusca() {
    const textoBusca = document.getElementById('busca-jogos').value.toLowerCase();
    const categoriasSelecionadas = Array.from(document.querySelectorAll('.filtro-categoria:checked')).map(input => input.value);

    const galeria = document.getElementById('galeria-jogos');
    galeria.innerHTML = ''; // Limpa a galeria antes de atualizar

    const jogosFiltrados = jogos.filter(jogo => {
        const nomeMatch = jogo.nome.toLowerCase().includes(textoBusca);
        const categoriaMatchBusca = jogo.categoria.toLowerCase().includes(textoBusca);

        const categoriaMatchFiltro = categoriasSelecionadas.length === 0 || categoriasSelecionadas.includes(jogo.categoria.toLowerCase());

        return (nomeMatch || categoriaMatchBusca) && categoriaMatchFiltro;
    });

    jogosFiltrados.forEach(jogo => {
        const card = document.createElement("div");
        card.classList.add("card-jogo");
        card.innerHTML = `
            <img src="${jogo.imagem}" alt="${jogo.nome}">
            <h3>${jogo.nome}</h3>
        `;
        card.addEventListener('click', () => abrirModal(jogo));
        galeria.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    aplicarFiltrosEBusca();

    // Listeners para filtros e busca
    document.querySelectorAll('.filtro-categoria').forEach(checkbox => {
        checkbox.addEventListener('change', aplicarFiltrosEBusca);
    });

    document.getElementById('busca-jogos').addEventListener('input', aplicarFiltrosEBusca);

    document.getElementById('fechar-modal').addEventListener('click', () => {
        document.getElementById('modal-jogo').classList.add('hidden');
    });
});