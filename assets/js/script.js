// Fucntion to fire when search button is clicked
$("#search-button").on("click", function(e){
    e.preventDefault();

    var cityName = $(".form-input").val();
    var apiKey = "6b92529c3fbdbf9af10b80a0441ee81b";
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    var historyButton = $("<button>");
    historyButton.attr("data-name");
    historyButton.addClass("historyTab");

    var button = historyButton.html(cityName);

    $("#history").append(button);

    $(".historyTab").css({"border-radius" : "5px", 
    "border" : "1px solid grey", 
    "padding": "5px",
    "margin-bottom":"8px"})
    
});
})