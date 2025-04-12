function aplicarFiltrosEBusca() {
    const textoBusca = document.getElementById('busca-jogos').value.trim().toLowerCase();
    const categoriasSelecionadas = Array.from(document.querySelectorAll('.filtro-categoria:checked')).map(input => input.value);
    const dificuldadesSelecionadas = Array.from(document.querySelectorAll('.filtro-dificuldade:checked')).map(input => input.value);

    const jogosFiltrados = jogos.filter(jogo => {
        const nomeMatch = jogo.nome.toLowerCase().includes(textoBusca);

        const categoriaMatch = categoriasSelecionadas.length === 0 || categoriasSelecionadas.includes(jogo.categoria.toLowerCase());
        const dificuldadeMatch = dificuldadesSelecionadas.length === 0 || dificuldadesSelecionadas.includes(jogo.dificuldade.toLowerCase());
        
        const numeroSelecionado = parseInt(document.getElementById('slider-jogadores').value);
        const jogadoresTexto = jogo.jogadores.replace(/\D/g, ' ').split(' ').filter(Boolean).map(Number);

        let jogadoresMatch = false;
        if (jogadoresTexto.length === 1) {
            jogadoresMatch = jogadoresTexto[0] === numeroSelecionado;
        } else if (jogadoresTexto.length === 2) {
            jogadoresMatch = numeroSelecionado >= jogadoresTexto[0] && numeroSelecionado <= jogadoresTexto[1];
        }

        return nomeMatch && categoriaMatch && dificuldadeMatch && jogadoresMatch;
    });

    criarCards(jogosFiltrados);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.filtro-categoria').forEach(checkbox => {
        checkbox.addEventListener('change', aplicarFiltrosEBusca);
    });

    document.querySelectorAll('.filtro-dificuldade').forEach(checkbox => {
        checkbox.addEventListener('change', aplicarFiltrosEBusca);
    });

    const sliderJogadores = document.getElementById('slider-jogadores');
    sliderJogadores.addEventListener('input', aplicarFiltrosEBusca);

    sliderJogadores.addEventListener('input', () => {
        const valor = sliderJogadores.value;
        document.getElementById('valor-jogadores').textContent = valor + (valor == 1 ? " jogador" : " jogadores");
    });

    document.getElementById('busca-jogos').addEventListener('input', aplicarFiltrosEBusca);
});
