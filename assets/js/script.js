let cityName = $(".form-input");
let searchButton = $("#search-button");
let todayTemperature = $("#temperature");
let todayWind = $("#wind");
let todayHumidity = $("#Humidity");
let currentCity = $("#current-data");
let city = "";
// let sCity = [];

let apiKey = "5fbdce717539e1f16120b7e52b90e251";

// function find(c){
//     for (var i=0; i<sCity.length; i++){
//         if(c.toUpperCase()===sCity[i]){
//             return -1;
//         }
//     }
//     return 1;
// }

// Function to display weather data after searching the city value grabbed from text input 
function displayCityData(e){
    e.preventDefault();
    if(cityName.val().trim()!==""){
        city=cityName.val().trim();
        weatherData(city);
    }

    }

// Function to fetch weather data
function weatherData(city) {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        let forecastURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=metric`
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            let forecast = response.daily;
            for (let i = 0; i < 5; i++) {
                let date = new Date(forecast[i].dt * 1000).toLocaleDateString();
                let day = new Date(forecast[i].dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
                let temp = forecast[i].temp.day;
                let humidity = forecast[i].humidity;
                let icon = forecast[i].weather[0].icon;
                let iconurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

                $(`#day${i}`).html(day);
                $(`#date${i}`).html(date);
                $(`#temp${i}`).html(temp + "&#8451");
                $(`#humidity${i}`).html(humidity + "%");
                $(`#icon${i}`).html("<img src=" + iconurl + ">");
            }

        })

        const weathericon = response.weather[0].icon;
        const iconurl = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
        const date = new Date().toLocaleDateString();
        $(currentCity).html(response.name + " " + "(" + date + ")" + "<img src=" + iconurl + ">");

        const tempF = (response.main.temp - 273.15);
        $(todayTemperature).html((tempF).toFixed(1) + "&#8451");

        $(todayHumidity).html(response.main.humidity + "%");

        const ws = response.wind.speed;
        const windsmph = (ws * 2.237).toFixed(1);
        $(todayWind).html(windsmph + "MPH");

    })

}
searchButton.on("click", displayCityData);

// Displays current waether data when search button is clicked
searchButton.on("click", function(e){
    // e.preventDefault();
// Defines history button for search query   
    let historyButton = $("<button>");
    historyButton.attr("data-name");
    historyButton.addClass("historyTab");

    let button = historyButton.html(cityName.val());

    $("#history").append(button);
// Applies styling to history buttons
    $(".historyTab").css({"border-radius" : "5px", 
    "border" : "1px solid grey", 
    "padding": "5px",
    "margin-bottom":"8px",
    });

    // 
})
// get weather data from clicking search history buttons
function buttonClick(e){
    const buttonClk=e.target;
    if (e.target.matches("button")){
        city=buttonClk.textContent.trim();
        weatherData(city);
    }
}
$(document).on("click",buttonClick);





