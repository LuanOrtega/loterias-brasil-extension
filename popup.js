document.getElementById("search").addEventListener("click", async () => {
    const game = document.getElementById("game").value;
    const contest = document.getElementById("contest").value;
    const betsText = document.getElementById("bets").value.trim();
    const resultDiv = document.getElementById("result");

    const limites = {
        megasena: { min: 6, max: 20 },
        quina: { min: 5, max: 15 },
        lotofacil: { min: 15, max: 20 },
        duplasena: { min: 6, max: 15 }
    };

    const showAlert = (msg) => {
        resultDiv.innerHTML = `
            <div style="
                color:#b30000;
                background:#ffe6e6;
                padding:10px;
                border-left:4px solid #b30000;
                border-radius:6px;
                font-weight:bold;
                display:flex;
                gap:8px;
                align-items:center;
            ">
                ⚠️ <span>${msg}</span>
            </div>
        `;
    };

    try {
        if (!contest) return showAlert("Por favor, insira um número de concurso válido.");
        if (!betsText) return showAlert("Digite pelo menos um jogo para conferir.");

        resultDiv.innerHTML = "Carregando...";

        const url = `https://loteriascaixa-api.herokuapp.com/api/${game}/${contest}`;
        let data;

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Concurso não encontrado para este jogo.");

            try {
                data = await res.json();
            } catch {
                throw new Error(`Nenhum dado encontrado para o concurso ${contest} do jogo ${game.toUpperCase()}.`);
            }

            if (!data?.dezenas) {
                throw new Error("Nenhum dado encontrado para este concurso.");
            }
        } catch (err) {
            return showAlert(`Erro ao buscar dados:<br>${err.message}`);
        }

        const officialNumbers = data.dezenas.map(n => n.padStart(2, "0"));

        const bets = betsText
            .split("\n")
            .map(line =>
                line.replace(/[^0-9,]/g, "")
                    .split(",")
                    .map(n => n.padStart(2, "0"))
                    .filter(Boolean)
            )
            .filter(arr => arr.length > 0);

        bets.forEach((bet, i) => {
            const { min, max } = limites[game];
            if (bet.length < min) throw new Error(`Jogo ${i + 1} tem menos números que o mínimo (${min}).`);
            if (bet.length > max) throw new Error(`Jogo ${i + 1} tem mais números que o máximo (${max}).`);
        });

        const nomes = {
            megasena: "Mega-Sena",
            quina: "Quina",
            lotofacil: "Lotofácil",
            duplasena: "Dupla-Sena"
        };

        let html = `
            <div>
                <div style="text-align:center; font-weight:bold; font-size:22px; color:#0a4d8c;">
                    Resultado
                </div>

                <strong>${nomes[data.loteria] || data.loteria}</strong><br>
                Concurso: ${data.concurso}<br>
                Data: ${data.data}<br><br>

                <strong>Números sorteados:</strong><br>
                <div style="font-size:18px; font-weight:bold; color:#0a4d8c;">
                    ${officialNumbers.join(" - ")}
                </div><br>

                <hr>
        `;

        html += `<div style="text-align:center; font-weight:bold; font-size:18px; margin-top:10px;">Suas Apostas</div>`;

        bets.forEach((bet, i) => {
            const hits = bet.filter(n => officialNumbers.includes(n));
            const total = hits.length;

            let color = "#d9534f";
            let msg = "Nenhum prêmio";

            if (game === "megasena") {
                if (total === 4) { color = "#5cb85c"; msg = "🎉 QUADRA!"; }
                else if (total === 5) { color = "#5cb85c"; msg = "🎉🔥 QUINA!"; }
                else if (total === 6) { color = "#2ecc71"; msg = "🤑💰 SENA!!! 💰🤑"; }
                else if (total > 0) { color = "#f0ad4e"; msg = "Acertou alguns números!"; }
            }

            if (game === "quina") {
                if (total === 2) { color = "#5cb85c"; msg = "Acertou DUQUE!"; }
                else if (total === 3) { color = "#5cb85c"; msg = "Acertou TERNO!"; }
                else if (total === 4) { color = "#5cb85c"; msg = "🎉 QUADRA!"; }
                else if (total === 5) { color = "#2ecc71"; msg = "🤑 QUINA!!!"; }
                else if (total > 0) { color = "#f0ad4e"; msg = "Acertou alguns números!"; }
            }

            if (game === "lotofacil") {
                if (total === 11) { color = "#5cb85c"; msg = "11 acertos!"; }
                else if (total === 12) { color = "#5cb85c"; msg = "12 acertos!"; }
                else if (total === 13) { color = "#5cb85c"; msg = "13 acertos!"; }
                else if (total === 14) { color = "#5cb85c"; msg = "🎉 14 acertos!"; }
                else if (total === 15) { color = "#2ecc71"; msg = "🤑💰 15 acertos!!! 💰🤑"; }
                else if (total > 0) { color = "#f0ad4e"; msg = "Acertou alguns números!"; }
            }

            if (game === "duplasena") {
                if (total === 4) { color = "#f0ad4e"; msg = "QUADRA!"; }
                else if (total === 5) { color = "#5cb85c"; msg = "🎉 QUINA!"; }
                else if (total === 6) { color = "#2ecc71"; msg = "🤑 SENA!!!"; }
                else if (total > 0) { color = "#f0ad4e"; msg = "Acertou alguns números!"; }
            }

            html += `
                <div style="padding:10px; border:1px solid #ccc; margin:10px 0; border-radius:6px;">
                    <strong>Jogo ${i + 1}</strong> » ${bet.length} números<br>
                    Apostado: ${bet.join(" - ")}<br>
                    Acertos: <span style="color:${color}; font-weight:bold;">${total}</span><br>
                    ${total > 0 ? "Números acertados: " + hits.join(", ") : ""}<br>
                    <div style="margin-top:5px; font-weight:bold; color:${color};">${msg}</div>
                </div>
            `;
        });

        
        if (data.premiacoes?.length) {
            html += `
                <hr>
                <div style="text-align:center; font-weight:bold; font-size:18px;">
                    Premiações do Concurso
                </div>

                <table style="width:100%; border-collapse: collapse; margin-top:10px;">
                    <tr style="background:#f2f2f2;">
                        <th style="padding:5px; border:1px solid #ccc;">Faixa</th>
                        <th style="padding:5px; border:1px solid #ccc;">Descrição</th>
                        <th style="padding:5px; border:1px solid #ccc;">Ganhadores</th>
                        <th style="padding:5px; border:1px solid #ccc;">Prêmio</th>
                    </tr>
            `;

            data.premiacoes.forEach(p => {
                html += `
                    <tr>
                        <td style="padding:5px; border:1px solid #ccc;">${p.faixa}</td>
                        <td style="padding:5px; border:1px solid #ccc;">${p.descricao}</td>
                        <td style="padding:5px; border:1px solid #ccc;">${p.ganhadores}</td>
                        <td style="padding:5px; border:1px solid #ccc;">${formatarValor(p.valorPremio)}</td>
                    </tr>
                `;
            });

            html += `</table>`;
        }

        html += `
            <hr>
            <div style="text-align:center; font-weight:bold; font-size:18px;">Informações Adicionais</div>
            Acumulou: ${data.acumulou ? "Sim" : "Não"}<br>
            ${data.acumulou ? `Estimativa do próximo prêmio: ${formatarValor(data.valorAcumuladoProximoConcurso)}<br>` : ""}
            <hr>
            <div style="text-align:center;">Dados fornecidos por Loterias Caixa</div>
        `;

        resultDiv.innerHTML = html;

    } catch (err) {
        showAlert(err.message);
    }
});

function formatarValor(valor) {
    if (!valor) return "—";
    return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
