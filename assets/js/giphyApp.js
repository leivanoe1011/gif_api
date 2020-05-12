

// Used to create the buttons 
var giphyCategories = ["DOG","CAT","HAMSTER","BIRD","DOLPHIN"]

// Here's where the buttons will be loaded
var buttonContainer = $("#button_container");


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

function giphyCall (giphyCategory){

}


$(document).on("click", ".btn-info") {
    var categoryName = $(this).text();
    console.log(categoryName)
    
}


// Start App
$(document).ready(function(){

    // first create buttons
    createButtons();

})



