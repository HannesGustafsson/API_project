
// REMOVES CURRENT DATA FROM CHOSEN DIV
function clearDiv(elementID) {
    document.getElementById(elementID).innerHTML = "";
}

const uriVisitors = 'https://5ea6a04c84f6290016ba6f29.mockapi.io/api/v1/visitors'
var trivia;


// LOADS PEOPLE AND TRIVIA DATA
function loadData() {

    var people = 0;
    const dropdown = document.getElementById('dropdown');
    const divTrivia = document.getElementById('divTrivia');

    clearDiv('dropdown');
    clearDiv('divTrivia');
    fetch(uriVisitors)
        .then((resp) => resp.json())
        .then(function (data) {
            data.map(function (data) {
                people++;

                let divtag = document.createElement('div');

                divtag.innerHTML = `<button onclick="deleteVisitor(${data.id})">-</button> ${data.name}`;
                dropdown.appendChild(divtag);
            })

            //document.createElement('div').innerHTML = `${"People in the building: " + people}`;
            divTrivia.innerHTML = `${"People in the building: <b>" + people + '</b>'}`;
            //divTrivia.appendChild(document.createElement('div'));
            getTrivia(people);
        })
}


// ADDS NEW VISITOR
function addVisitor() {

    const textInput = document.getElementById('name').value;
    var data = { name: textInput };

    fetch(uriVisitors,
        {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",

            headers:
            {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => console.log(res))

    setTimeout(() => { loadData() }, 500);
}


// DELETES VISITOR
function deleteVisitor(id) {

    fetch(uriVisitors + "/" + id,
        {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",

            headers:
            {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => console.log(res))

    setTimeout(() => { loadData() }, 500);
}


// LOADS UPCOMING TRAIN DEPARTURES
function getDepartures(siteId) {

    const divMetros = document.getElementById('divMetros');
    const divBuses = document.getElementById('divBuses');
    const divTrains = document.getElementById('divTrains');

    const uriTrains = 'https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=81a6a09603e14d51a73276f98ba095bb&siteid= ' + siteId + '&timewindow=10';
    fetch(uriTrains)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data)
            let metros = data.ResponseData.Metros;
            let buses = data.ResponseData.Buses;
            let trains = data.ResponseData.Trains;

            clearDiv('divMetros');
            if (metros.length > 0) {
                //divMetros.style.display = "block";
                divMetros.innerHTML += '<b>' + data.ResponseData.Metros[0].TransportMode + ' Station: ' + data.ResponseData.Metros[0].StopAreaName + '</b>';
                metros.map(function (departure) {
                    let divtag = document.createElement('div');
                    divtag.innerHTML = `${departure.LineNumber + " " + departure.Destination + " " + departure.DisplayTime}`;
                    divMetros.appendChild(divtag);
                })
            }
            else {
                divMetros.style.display = "none";
            }

            clearDiv('divBuses');
            if (buses.length > 0) {
                //divBuses.style.display = "block";
                divBuses.innerHTML += '<b>' + data.ResponseData.Buses[0].TransportMode +' Station: ' + data.ResponseData.Buses[0].StopAreaName + '</b>';
                buses.map(function (departure) {
                    let divtag = document.createElement('div');
                    divtag.innerHTML = `${departure.LineNumber + "&#09;" + departure.Destination + " " + departure.DisplayTime}`;
                    divBuses.appendChild(divtag);
                })
            }
            else {
                divBuses.style.display = "none";
            }

            clearDiv('divTrains');
            if (trains.length > 0) {
                //divMetros.style.display = "block"
                divTrains.innerHTML += '<b>' + data.ResponseData.Trains[0].TransportMode +' Station: ' + data.ResponseData.Trains[0].StopAreaName + '</b>';
                trains.map(function (departure) {
                    let divtag = document.createElement('div');
                    divtag.innerHTML = `${departure.LineNumber + "&#09;" + departure.Destination + " " + departure.DisplayTime}`;
                    divTrains.appendChild(divtag);
                })
            }
            else {
                divTrains.style.display = "none";
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}


// LOADS CURRENT FORECAST
function getForecast(lat, lon) {

    const divForecast = document.getElementById('divForecast');
    const uriForecast = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/' + lon + '/lat/' + lat + '/data.json';

    fetch(uriForecast)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data)
            let forecast = data.timeSeries[1].parameters;
            let divtag = document.createElement('div');

            clearDiv('divForecast');
            // Since the index location of temperature changes for some reason, loops through to find it
            let temp;
            let rain;
            forecast.forEach(element => {
                if (element.name == "t") {
                    temp = element.values[0];
                }
                if (element.name == "pmedian") {
                    rain = element.values;
                }
            });
            divtag.innerHTML = `${'<b>' + temp + '°C</b> and <b> ' + rain + 'mm/h</b> of rain'}`;
            divForecast.appendChild(divtag);
        })
        .catch(function (error) {
            console.log(error);
        });
}


// LOADS CURRENT TIME
function getTime() {

    const divTime = document.getElementById('divTime');
    const uriTime = 'http://worldclockapi.com/api/json/gmt/now';

    fetch(uriTime)
        .then((resp) => resp.json())
        .then(function (data) {
            let date = new Date(data.currentDateTime);
            let time = date.getHours() + ":" + date.getMinutes() + " " + data.dayOfTheWeek;
            let divtag = document.createElement('div');

            clearDiv('divTime');
            divtag.innerHTML = `${time}`;
            divTime.appendChild(divtag);

        })
        .catch(function (error) {
            console.log(error);
        });
}


// LOADS TRIVIA
function getTrivia(int) {

    const uriTrivia = 'http://numbersapi.com/' + int + '/trivia?json';
    const divTrivia = document.getElementById('divTrivia');

    fetch(uriTrivia)
        .then((resp) => resp.json())
        .then(function (data) {
            trivia = data.text;
            let divtag = document.createElement('div');

            divtag.innerHTML = `${"Fact: " + trivia}`;
            divTrivia.appendChild(divtag);
        })

        .catch(function (error) {
            console.log(error);
        });
}