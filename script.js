function calcular() {
    // Obtendo os valores inseridos no formulário
    let valor = parseFloat(document.getElementById("valor").value);
    let dataInicio = new Date(document.getElementById("data-inicio").value);
    let dataPagamento = new Date(document.getElementById("data-pagamento").value);

    // Verificando se a data de pagamento é posterior à data de início do atraso
    if (dataPagamento <= dataInicio) {
        alert("A data de pagamento deve ser posterior à data de início do atraso.");
        return;
    }

    // Calculando o número de dias de atraso
    let diffTime = Math.abs(dataPagamento - dataInicio);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Taxas de juros e multa
    let taxaJurosDiaria = 0.0025; // 0,25% ao dia
    let multaDiaria = 0.01; // 1% ao dia de multa

    // Calculando o valor dos juros e da multa
    let juros = valor * taxaJurosDiaria * diffDays; // Juros de 0,25% ao dia
    let multa = valor * multaDiaria * diffDays; // Multa de 1% ao dia

    // Calculando o valor total
    let total = valor + juros + multa;

    // Exibindo o resultado
    let resultado = `
        Valor original: R$ ${valor.toFixed(2)}<br>
        Juros (0,25% ao dia): R$ ${juros.toFixed(2)}<br>
        Multa (1% por dia): R$ ${multa.toFixed(2)}<br>
        Total a pagar: R$ ${total.toFixed(2)}
    `;

    document.getElementById("resultado").innerHTML = resultado;
}
