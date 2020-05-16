

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

// Api Rating
var ratingApi = "rating=g"



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

    var apiCall = queryURL + searchCategory + "&" + apiKey + "&" + ratingApi;

    // console.log(apiCall);

    $.ajax({
        url: apiCall,
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
    
    var currentImage = clickedImage;
    var imageState = $(currentImage).data("state");
    var imageStillUrl = $(currentImage).data("still");
    var imageAnimateUrl = $(currentImage).data("animate");

    if(imageState === "animate"){
        // $(currentImage).attr()
        $(currentImage).attr("src", imageStillUrl);
        $(currentImage).data("state","still");        
    }
    else {
        $(currentImage).attr("src", imageAnimateUrl);
        $(currentImage).data("state", "animate");
    }
}


function doesButtonExist(newCategory){

    var buttons = $(buttonContainer.children());

    var addedCategory = newCategory;


    for(var i = 0; i < buttons.length; i++){
        if(buttons[i].innerHTML === addedCategory){
            return true;
        }
    }

    return false;
}


function addNewCategory(categoryName){

    var category = categoryName.toUpperCase();
    var emptyCategory = false;

    if(category === null || category === ''){
        emptyCategory = true;
    }


    if(!doesButtonExist(category) && emptyCategory !== true){
        
        var categoryButton = $("<button>");
        $(categoryButton).attr("type","button");
        $(categoryButton).attr("class","btn btn-info");
        $(categoryButton).text(category);

        $(buttonContainer).append(categoryButton);

        giphyCall(categoryName);
    }
    else {
        alert("Category already exists or is empty");
    }
    
}


$(document).on("click",".btn-info", function(){

    var currentButton = $(this);

    var categoryName = $(currentButton).text();

    var buttonId = $(currentButton).attr("id")


    if(buttonId !== "createCategory"){
        giphyCall(categoryName);
    }
    

});


$(document).on("click",".gif_grp", function(){

    var currentImage = $(this);

    pauseAnimageGif(currentImage);
});


$("#createCategory").on("click", function(event){
    
    event.preventDefault();

    var categoryName = $("#categoryEntry").val();

    addNewCategory(categoryName);

    $("#categoryEntry").val('');

})


// Start App
$(document).ready(function(){

    // first create buttons
    createButtons();

    var category = randomCategory(giphyCategories);

    giphyCall(category)

})



