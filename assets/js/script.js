let cityName = $(".form-input");
let searchButton = $("#search-button");
let todayTemperature = $("#temperature");
let todayWind = $("#wind");
let todayHumidity = $("#Humidity");
let currentCity = $("#current-data");
let city = "";
// let sCity = [];

let apiKey = "6b92529c3fbdbf9af10b80a0441ee81b";

// function find(c){
//     for (var i=0; i<sCity.length; i++){
//         if(c.toUpperCase()===sCity[i]){
//             return -1;
//         }
//     }
//     return 1;
// }
function displayCityData(e){
    e.preventDefault();
    if(cityName.val().trim()!==""){
        city=cityName.val().trim();
        currentWeather(city);
    }

    }
function currentWeather(city){
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        const weathericon= response.weather[0].icon;
        const iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
        const date=new Date(response.dt*1000).toLocaleDateString();
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");

        const tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(todayTemperature).html((tempF).toFixed(2)+"&#8457");

        $(todayHumidity).html(response.main.humidity+"%");

        const ws=response.wind.speed;
        const windsmph=(ws*2.237).toFixed(1);
        $(todayWind).html(windsmph+"MPH");
        
    })
    
}
$("#search-button").on("click", displayCityData);
// Function to trigger when search button is clicked
// $("#search-button").on("click", function(e){
//     e.preventDefault();
// // Defines variable for search query   
//     let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(response){
//   console.log(response)
//     let historyButton = $("<button>");
//     historyButton.attr("data-name");
//     historyButton.addClass("historyTab");

//     let button = historyButton.html(cityName);

//     $("#history").append(button);
// // Applies styling to history buttons
//     $(".historyTab").css({"border-radius" : "5px", 
//     "border" : "1px solid grey", 
//     "padding": "5px",
//     "margin-bottom":"8px"});

//     // 
// })

// })


