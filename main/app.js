
const api = 'http://api.weatherapi.com/v1';

import { API_KEY } from '../config.js';

const api_call = '/current.json';

const btnCity = document.getElementById('btnCity');
const spanCity = document.getElementById('spanCity');
const infoCity = document.getElementById('infoCity')

function getCity() {
    let inputCity = document.getElementById('inputCity').value;
    let city = ''; 
    if(inputCity && inputCity != '') {
        spanCity.innerText = '';
        city = inputCity;
        let url = `${api}${api_call}?key=${API_KEY}&q=${city}`;
        return url;
    } else {
        spanCity.innerText = 'Please enter a city name';
    }
}

async function weatherData(url) {
    const response = await fetch(url);
    if(response.ok) {
        const data = await response.json();
        return data;
    }
    else {
        spanCity.innerText = 'That city does not exist';
    }
}

function displayInfoCity(data) {
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;
    infoCity.innerText = `Weather: ${condition}, temp: ${temp}`;
}

async function app() {
    let url = getCity();
    if(url != '') {
        let data = await weatherData(url);
        displayInfoCity(data)
    }
}

btnCity.addEventListener('click', app);
