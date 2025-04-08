function abrirModal(jogo) {
    const modal = document.getElementById('modal-jogo');
    document.getElementById('modal-imagem').src = jogo.imagem;
    document.getElementById('modal-nome').textContent = jogo.nome;
    document.getElementById('modal-sinopse').textContent = jogo.sinopse;
    document.getElementById('modal-categoria').textContent = `Categoria: ${jogo.categoria}`;
    document.getElementById('modal-dificuldade').textContent = `Dificuldade: ${jogo.dificuldade}`;
    document.getElementById('modal-jogadores').textContent = `Jogadores: ${jogo.jogadores}`;

    modal.classList.add('show'); // usando show agora!
}

function fecharModal() {
    const modal = document.getElementById('modal-jogo');
    modal.classList.remove('show');
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('fechar-modal').addEventListener('click', fecharModal);

    const modal = document.getElementById('modal-jogo');
    modal.addEventListener('click', (e) => {
        if (!document.getElementById('modal-conteudo').contains(e.target)) {
            fecharModal();
        }
    });
});