let cityName = $(".form-input").val();


// Function to trigger when search button is clicked
$("#search-button").on("click", function(e){
    e.preventDefault();
// Defines variable for search query   
    let apiKey = "6b92529c3fbdbf9af10b80a0441ee81b";
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
  console.log(response)
    let historyButton = $("<button>");
    historyButton.attr("data-name");
    historyButton.addClass("historyTab");

    let button = historyButton.html(cityName);

    $("#history").append(button);
// Applies styling to history buttons
    $(".historyTab").css({"border-radius" : "5px", 
    "border" : "1px solid grey", 
    "padding": "5px",
    "margin-bottom":"8px"});

    // 
}).then(data =>{
displayCityData(data);

})
function displayCityData(){
    
    let cityDataDiv = $("<div>");
    cityDataDiv.html(`
    <p>Temp: ${response.list[0].main.temp}</p>
    <p>Wind: ${Wind}</p>
    <p>Plot: ${Humidity}</p>
    `)
    $("#today").append(cityDataDiv);
    }
})


