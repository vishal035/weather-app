// changeWeather({type: 'rain', name: 'Haze', id: 3})



//Global Variables

var weatherStatusCodesArray = [
    ["clear sky", "few clouds", "scattered clouds", "broken clouds"],
    ["shower rain", "rain"], "thunderstorm", "snow", "mist"
];

var newWeatherArr = [
    { superType: 'clear sky', type: 'sun', name: 'Clear Sky' },
    { superType: 'few clouds', type: 'sun', name: 'Clear Sky' },
    { superType: 'scattered clouds', type: 'sun', name: 'Clear Sky' },
    { superType: 'broken clouds', type: 'sun', name: "Clear Sky" },
    { superType: 'shower rain', type: 'thunder', name: 'Rain' },
    { superType: 'overcast rain', type: 'thunder', name: 'Rain' },
    { superType: 'rain', type: 'thunder', name: 'Rain' },
    { superType: 'mist', type: 'thunder', name: 'Rain' },
    { superType: 'thunderstorm', type: 'wind', name: 'Windy' },
    { superType: 'windy', type: 'wind', name: 'Windy' },
    { superType: 'snow', type: 'snow', name: 'Snow' },
    { superType: 'haze', type: 'rain', name: 'Haze' },
]

var months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];


var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//INIT OpenWeather Api

const getWeather = new OpenWeather();

//Getting the the User Locations


var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var longitude = pos.coords.longitude;
    var latitude = pos.coords.latitude;
    // console.log('Your current position is:');
    // console.log(`Latitude : ${latitude}`);
    // console.log(`Longitude: ${longitude}`);
    getWeather.searchByCoordinates(latitude, longitude).then(data => {
        // console.log(data);
        // console.log(data.weather[0].description);

        //Temperature Convertion
        const degC = data.main.temp - 273.15;
        const degCr = Math.floor(degC);
        const degF = degC * 1.8 + 32;
        const degFr = Math.floor(degF);


        results = {
            condition: data.weather[0].main,
            icon: 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png',
            degCr: Math.floor(degCr),
            degFr: Math.floor(degFr),
            city: data.name
        }


        //Display
        var tempShow = document.getElementById('tempShow');
        var tempShowing = tempShow.childNodes[0];
        tempShowing.nodeValue = `${degCr}`;
        // console.log(results, tempShow);

        // Updating the summary
        var addingText = document.getElementById('summary');
        var addingSummary = addingText.childNodes[0];
        addingSummary.nodeValue = `${data.weather[0].description}`;
        var weatherDescriptionFetched = data.weather[0].description;
        // console.log(`${data.weather[0].description}`);

        newWeatherArr.forEach((currentWeather) => {
            if (currentWeather.superType === data.weather[0].description) {
                changeWeather(currentWeather);
            }
        });

        // weatherStatus = document.getElementsByClassName('container');
        // if (weatherStatusCodesArray[0][0] === weatherDescriptionFetched || weatherDescriptionFetched === weatherStatusCodesArray[0][1] || weatherDescriptionFetched === weatherStatusCodesArray[0][2] || weatherDescriptionFetched === weatherStatusCodesArray[0][3]) {
        // container.addClass(weather[0].type);
        // };
        // console.log(weatherStatus);

        // console.log(currentWeather);
        // console.log(weather);



    });
}

function error(err) {
    // console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);






//INIT UI

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getUTCDay();
const todaysDate = currentDate.getDate();

var showDate = document.getElementById('date');
var showAllDateData = showDate.childNodes[0];
showAllDateData.nodeValue = `${days[currentDay]} ${todaysDate} ${months[currentMonth]}`;
// console.log(days[currentDay]);
// console.log(months[currentMonth]);
// console.log(todaysDate);

// Get the input data from the dearch field

const searchCity = document.querySelector('.searchCity');
searchCity.addEventListener('keyup', (event) => {
    //Getting the iputss
    const userText = event.target.value;
    console.log(userText);

    //Make a request to the opewweather API

    getWeather.search(userText).then(data => {
        console.log(data);

        //Temperature Convertion
        const degC = data.main.temp - 273.15;
        const degCr = Math.floor(degC);
        const degF = degC * 1.8 + 32;
        const degFr = Math.floor(degF);


        results = {
            condition: data.weather[0].main,
            icon: 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png',
            degCr: Math.floor(degCr),
            degFr: Math.floor(degFr),
            city: data.name
        }


        //Display
        var tempShow = document.getElementById('tempShow');
        var tempShowing = tempShow.childNodes[0];
        tempShowing.nodeValue = `${degCr}`;
        // console.log(results, tempShow);

        // Updating the summary
        var addingText = document.getElementById('summary');
        var addingSummary = addingText.childNodes[0];
        addingSummary.nodeValue = `${data.weather[0].description}`;

        newWeatherArr.forEach((currentWeather) => {
            if (currentWeather.superType === data.weather[0].description) {
                changeWeather(currentWeather);
            }
        });


    });


});