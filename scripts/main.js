const jogos = [
    {
        nome: "Forest Quest",
        categoria: "aventura",
        imagem: "assets/img/forest-quest.png",
        sinopse: "Aventure-se pela floresta encantada e enfrente criaturas mágicas em busca do tesouro perdido!",
        dificuldade: "Fácil",
        jogadores: "1 a 4",
    },
    {
        nome: "Galactic Jelly",
        categoria: "aventura",
        imagem: "assets/img/galactic-jelly.png",
        sinopse: "Viaje pelo espaço coletando geléias cósmicas em missões divertidas!",
        dificuldade: "Fácil",
        jogadores: "2 a 6",
    },
    {
        nome: "Maré Selvagem",
        categoria: "estrategia",
        imagem: "assets/img/mare-selvagem.png",
        sinopse: "Comande sua frota pelos mares perigosos e conquiste territórios estratégicos!",
        dificuldade: "Difícil",
        jogadores: "1 a 8",
    },
    {
        nome: "Ruínas do Amanhã",
        categoria: "estrategia",
        imagem: "assets/img/ruinas-amanha.png",
        sinopse: "Explore as ruínas de civilizações antigas para desvendar o futuro da humanidade.",
        dificuldade: "Médio",
        jogadores: "1 a 12",
    },
    {
        nome: "Sombras da Verdade",
        categoria: "estrategia",
        imagem: "assets/img/sombras-verdade.png",
        sinopse: "Descubra segredos e resolva enigmas em uma cidade cheia de conspirações.",
        dificuldade: "Médio",
        jogadores: "2 a 8",
    },
];


function criarCards(jogosParaExibir) {
    const galeria = document.getElementById('galeria-jogos');
    galeria.innerHTML = '';

    jogosParaExibir.forEach(jogo => {
        const card = document.createElement("div");
        card.classList.add("card-jogo");
        card.innerHTML = `
            <img src="${jogo.imagem}" alt="${jogo.nome}">
            <h3>${jogo.nome}</h3>
        `;
        card.addEventListener('click', () => abrirModal(jogo)); // CHAMA a função abrirModal que agora está em modal.js
        galeria.appendChild(card);
    });
}

function aplicarFiltrosEBusca() {
    const textoBusca = document.getElementById('busca-jogos').value.toLowerCase();
    const categoriasSelecionadas = Array.from(document.querySelectorAll('.filtro-categoria:checked')).map(input => input.value);

    const jogosFiltrados = jogos.filter(jogo => {
        const nomeMatch = jogo.nome.toLowerCase().includes(textoBusca);
        const categoriaMatchBusca = jogo.categoria.toLowerCase().includes(textoBusca);
        const categoriaMatchFiltro = categoriasSelecionadas.length === 0 || categoriasSelecionadas.includes(jogo.categoria.toLowerCase());
        return (nomeMatch || categoriaMatchBusca) && categoriaMatchFiltro;
    });

    criarCards(jogosFiltrados);
}

document.addEventListener("DOMContentLoaded", () => {
    criarCards(jogos);

    document.querySelectorAll('.filtro-categoria').forEach(checkbox => {
        checkbox.addEventListener('change', aplicarFiltrosEBusca);
    });

    document.getElementById('busca-jogos').addEventListener('input', aplicarFiltrosEBusca);
});