document.querySelector('#button1').addEventListener('click', fetchFunction)
const url = 'http://api.apixu.com/v1/forecast.json?key=c03a1c43ebd94ad59eb80153190204&q=kathmandu&days=5';


function fetchFunction() {
    fetch(url)
        .then(response => response.json())
        .then(data => {

            let cityData = JSON.stringify(data.location.name);
            cityData = cityData.replace(/\"/g, "");
            document.getElementById("location").append(cityData);

            // let date = new Date(data.forecast.forecastday[0].date_epoch * 1000);

            data.forecast.forecastday.forEach((forecast) => {
                let date = new Date(forecast.date_epoch * 1000);
                let icon = forecast.day.condition.icon;
                let weatherText = forecast.day.condition.text;

                function createNode(element) {
                    return document.createElement(element);
                }

                function append(parent, el) {
                    return parent.appendChild(el);
                  }

                    let ul = document.getElementById("icon");
                    let li = createNode('li')
                    let img = createNode('img');
                    img.src =`http:${icon}`;
                    append(li, img)
                    append(ul, li)

                    let ulDate = document.getElementById('date');
                    let p = createNode('p');
                    p.innerHTML = date;
                    append(ulDate, li)
                    append(li, p)

                    let ulText = document.getElementById('weatherText');
                    let pText = createNode('p');
                    pText.innerHTML = weatherText;
                    append(ulText, li);
                    append(li, pText);
            });
        })
        .catch(error => console.log('error'))
}