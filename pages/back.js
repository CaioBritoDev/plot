function Make(labels, values) {
    // Obtenha uma referência ao elemento canvas
    var ctx = document.getElementById('myChart').getContext('2d');

    // Crie o gráfico usando Chart.js
    const myChart = new Chart(ctx, {
        type: 'bar', // Tipo de gráfico (por exemplo, barra, linha, pizza, etc.)
        data: {
            labels: {labels},
            datasets: [{
                label: 'Vendas',
                data: {values}, // Dados do gráfico
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Cor de fundo das barras
                borderColor: 'rgba(255, 99, 132, 1)', // Cor da borda das barras
                borderWidth: 1 // Largura da borda das barras
            }]
        },
        options: {
            // Opções de personalização do gráfico
        }
    });
}