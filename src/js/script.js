async function buscarKosmos(date) {
    const apiKeykosmos = 'yax5hrTcj9uVgTX3NpWwoE2T3pQPFQ2b2OCZbvfv';
    const urlkosmos = `https://api.nasa.gov/planetary/apod?api_key=${apiKeykosmos}&date=${date}`;
    
    let responsekosmos = await fetch(urlkosmos);
    
    if (responsekosmos.ok) {
        let datakosmos = await responsekosmos.json();

        let explicacao = document.querySelector('#explicacao');
        explicacao.textContent = datakosmos['explanation'];

        let title = document.querySelector('#title');
        title.textContent = datakosmos['title'];

        let img = document.querySelector('#image');
        img.src = datakosmos['hdurl'];
        img.style.display = 'inline';

        let dataImagem = document.querySelector('#dataImagem');
        dataImagem.textContent = `Em: ${datakosmos['date']}`;
    } else {
        alert('Erro ao buscar a imagem doKosmos. Tente novamente mais tarde.');
    }
}

async function buscarClima(cidade) {
    const apiKey = '9ca13acd02ac5b279c7c299f38de0cc9';
    const urlClima = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${apiKey}`;
    let responseClima = await fetch(urlClima);

    if (responseClima.ok) {
        let dataClima = await responseClima.json();

        let climaDescricao = document.querySelector('#climaDescricao');
        climaDescricao.textContent = dataClima.weather[0].description;

        let climaTemperatura = document.querySelector('#climaTemperatura');
        climaTemperatura.textContent = dataClima.main.temp + '°C';  // Corrigido aqui

        let climaUmidade = document.querySelector('#climaUmidade');
        climaUmidade.textContent = dataClima.main.humidity + '%';

        let climaVento = document.querySelector('#climaVento');
        climaVento.textContent = dataClima.wind.speed + ' km/h';

        let climaIcone = document.querySelector('#climaIcone');
        let iconCode = dataClima.weather[0].icon;
        climaIcone.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
        climaIcone.style.display = 'inline';
    } else {
        alert('Erro ao buscar informações climáticas');
    }
}


function main() {
    let btnkosmos = document.querySelector('#buscarKosmos');
    btnkosmos.addEventListener('click', function() {
        let txtDate = document.querySelector('#date');
        let date = txtDate.value;
        buscarKosmos(date);
    });

    let btnClima = document.querySelector('#buscarClima');
    btnClima.addEventListener('click', function() {
        let txtCidade = document.querySelector('#cidade');
        let cidade = txtCidade.value;
        buscarClima(cidade);
    });
}

main();