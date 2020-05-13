

// Used to create the buttons 
var giphyCategories = ["DOG","CAT","HAMSTER","BIRD","DOLPHIN"]

// Here's where the buttons will be loaded
var buttonContainer = $("#button_container");

// Used to load giphy
var giphyContainer = $("#giphy_container");

// Giphy URL
var queryURL = "https://api.giphy.com/v1/gifs/";

// Api Query
var apiKey = "api_key=yfswyasYEAhn6HkkdSPoOt4vKr3KKGUF";



// Create Buttons
function createButtons (){

    for(var i = 0; i < giphyCategories.length; i++){
        var categoryButton = $("<button>");
        $(categoryButton).attr("type","button");
        $(categoryButton).attr("class","btn btn-info");
        $(categoryButton).text(giphyCategories[i]);
        $(buttonContainer).append(categoryButton);
    }

}

function loadGifs(gifData){
    
    var results = gifData.data;

    // console.log(gifData);

    for(var i = 0; i < results.length; i++){
        var image = $("<img>");
        var imageUrl = results[i].images.fixed_height.url;
        var imageStillUrl = results[i].images.fixed_height_still.url;

        // console.log(imageurl);
        $(image).attr("src", imageUrl);
        $(image).addClass("gif_grp")
        $(image).attr("data-still",imageStillUrl);
        $(image).attr("data-animate", imageUrl);
        $(image).attr("data-state", "animate");

        $(giphyContainer).append(image);
    }

}


function giphyCall (giphyCategory){
    
    $(giphyContainer).empty();
    
    var searchCategory = "search?q=" + giphyCategory;

    $.ajax({
        url: queryURL + searchCategory + "&" + apiKey ,
        method: "GET"
    })
    .then(function(response){
        loadGifs(response);
    });
}


function randomCategory(categoryArray){
    return categoryArray[Math.floor(Math.random() * categoryArray.length)];
}

function pauseAnimageGif(clickedImage){
    var imageState = $(clickedImage).data("state");
    console.log(imageState);
}


$(document).on("click",".btn-info", function(){

    var categoryName = $(this).text();

    giphyCall(categoryName);

});


$(document).on("click",".gif_grp", function(){
    console.log("in image button")

    var currentImage = $(this);

    pauseAnimageGif(currentImage);
});


// Start App
$(document).ready(function(){

    // first create buttons
    createButtons();

    var category = randomCategory(giphyCategories);

    giphyCall(category)

})



