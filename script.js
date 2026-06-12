function calcular() {
    const valorInput = document.getElementById("valor");
    const dataInicioInput = document.getElementById("data-inicio");
    const dataPagamentoInput = document.getElementById("data-pagamento");
    const resultadoEl = document.getElementById("resultado");

    const valor = Number(valorInput.value.replace(",", "."));
    const dataInicioStr = dataInicioInput.value;
    const dataPagamentoStr = dataPagamentoInput.value;

    if (!valor || valor <= 0) {
        resultadoEl.innerHTML = "Informe um valor valido.";
        return;
    }

    if (!dataInicioStr || !dataPagamentoStr) {
        resultadoEl.innerHTML = "Preencha as duas datas.";
        return;
    }

    // Cria datas sem problema de fuso horario
    const [anoInicio, mesInicio, diaInicio] = dataInicioStr.split("-").map(Number);
    const [anoPag, mesPag, diaPag] = dataPagamentoStr.split("-").map(Number);

    const dataInicio = new Date(anoInicio, mesInicio - 1, diaInicio);
    const dataPagamento = new Date(anoPag, mesPag - 1, diaPag);

    if (dataPagamento <= dataInicio) {
        resultadoEl.innerHTML = "A data de pagamento deve ser posterior a data de inicio do atraso.";
        return;
    }

    const msPorDia = 1000 * 60 * 60 * 24;
    const diffTime = dataPagamento.getTime() - dataInicio.getTime();
    const diffDays = Math.floor(diffTime / msPorDia);

    const taxaJurosDiaria = 0.005; // 0,50% ao dia
    const taxaMultaDiaria = 0.005; // 0,50% ao dia

    const juros = valor * taxaJurosDiaria * diffDays;
    const multa = valor * taxaMultaDiaria * diffDays;
    const total = valor + juros + multa;

    const formatarMoeda = (numero) =>
        numero.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    resultadoEl.innerHTML = `
        <p>Valor original: <strong>${formatarMoeda(valor)}</strong></p>
        <p>Dias de atraso: <strong>${diffDays}</strong></p>
        <p>Juros (0,50% ao dia): <strong>${formatarMoeda(juros)}</strong></p>
        <p>Multa (0,50% ao dia): <strong>${formatarMoeda(multa)}</strong></p>
        <p>Total a pagar: <strong>${formatarMoeda(total)}</strong></p>
    `;
}
