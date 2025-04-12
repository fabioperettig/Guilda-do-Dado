let jogos = [];

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
        card.addEventListener('click', () => abrirModal(jogo));
        galeria.appendChild(card);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    fetch('assets/dados/jogos.json')
        .then(resposta => resposta.json())
        .then(dados => {
            jogos = dados;
            criarCards(jogos);

            document.querySelectorAll('.filtro-categoria').forEach(checkbox => {
                checkbox.addEventListener('change', aplicarFiltrosEBusca);
            });

            document.getElementById('busca-jogos').addEventListener('input', aplicarFiltrosEBusca);
        })
        .catch(erro => console.error("Erro ao carregar jogos:", erro));
});