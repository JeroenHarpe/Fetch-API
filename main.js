document.querySelector('#button1').addEventListener('click', fetchFunction)
const url = 'http://api.apixu.com/v1/forecast.json?key=c03a1c43ebd94ad59eb80153190204&q=kathmandu&days=5';


function fetchFunction() {
    fetch(url)
        .then(response => response.json())
        .then(data => {

            let cityData = JSON.stringify(data.location.name);
            cityData = cityData.replace(/\"/g, "");
            document.getElementById("location").append(cityData);

            const dateOptions = {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            };

            data.forecast.forecastday.forEach((forecast) => {
                let date = new Date(forecast.date_epoch * 1000);
                date = date.toLocaleDateString('en-GB', dateOptions);
                let icon = forecast.day.condition.icon;
                let weatherText = forecast.day.condition.text;
                let celsius = forecast.day.avgtemp_c;

                function createNode(element) {
                    return document.createElement(element);
                }

                function append(parent, el) {
                    return parent.appendChild(el);
                }

                let tbDate = document.getElementById('date');
                let tableHeader = createNode('th');
                tableHeader.innerHTML = date;
                append(tbDate, tableHeader);

                let tbIcon = document.getElementById('icon');
                let tableImg = createNode('td');
                let img = createNode('img');
                img.src = `http:${icon}`;
                tableImg.append(img);
                append(tableImg, img);
                append(tbIcon, tableImg);

                let tbText = document.getElementById('weatherText');
                let tableData = createNode('td');
                tableData.innerHTML = weatherText;
                append(tbText, tableData);

                let tbCelsius = document.getElementById('celsius');
                let tbDataCel = createNode('td');
                tbDataCel.innerHTML = `${celsius}  &#8451`;
                append(tbCelsius, tbDataCel);

            });
        })
        .catch(error => console.log('error'))
}