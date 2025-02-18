
document.getElementById("buscar").addEventListener("click", function () {
    let cidade = document.getElementById("cidade").value.trim();

    if (cidade === "") {
        alert("Por favor, digite o nome de uma cidade.");
        return;
    }

    let url = 'https://goweather.herokuapp.com/weather/${cidade}';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Cidade não encontrada.");
            }
            return response.json();
        })
        .then(data => {
            // Captura os dados recebidos da API
            let temperatura = data.temperature.replace("°C", "").trim();
            let clima = data.description;
            let vento = data.wind.replace("km/h", "").trim();
            let previsao = data.forecast; // Array com previsão dos próximos dias

            // Cria HTML para os próximos dias
            let previsaoHTML = "<h3>Previsão para os próximos dias:</h3>";
            previsao.forEach(dia => {
                previsaoHTML += `
                            <p><strong>Temperatura:</strong> ${dia.temperature}</p>
                            <p><strong>Vento:</strong> ${dia.wind}</p>
                            <hr>
                        `;
            });

            document.getElementById("resultado").innerHTML = `
                        <h2>${cidade.toUpperCase()}</h2>
                        <p><strong>Temperatura:</strong> ${temperatura}°C</p>
                        <p><strong>Clima:</strong> ${clima}</p>
                        <p><strong>Vento:</strong> ${vento} km/h</p>
                        ${previsaoHTML}
                    `;
        })
        .catch(error => {
            alert("Erro: " + error.message);
        });
});