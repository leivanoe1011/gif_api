

var markets = ["AU","CA", "FR","DE","HK","US","IT","ES","GB","IN"];

var displayRow = $("#display_row");


function displayResults(data){

    var response = data.marketSummaryResponse.result;

    console.log(response);

    for(var i = 0; i < response.length; i++){
        // console.log(response[i].exchangeTimezoneName + " " + response[i].marketState + " " + response[i].exchange + " " + response[i].shortName);

        var card = $("<div>");
        $(card).addClass("card text-white bg-dark mb-3");
        $(card).attr("style","max-width: 18rem");

        var cardHeader = $("<div>");
        $(cardHeader).addClass("card-header text-white bg-dark mb-3");
        $(cardHeader).text(response[i].fullExchangeName);

        var unorderedList = $("<ul>");
        $(unorderedList).addClass("list-group list-group-flush text-white bg-dark mb-3");

        var shortName = $("<li>");
        $(shortName).addClass("list-group-item text-white bg-dark mb-3");
        $(shortName).text(response[i].shortName);

        var regularMarketChange = $("<li>");
        $(regularMarketChange).addClass("list-group-item text-white bg-dark mb-3");
        $(regularMarketChange).text(response[i].regularMarketChange.fmt);

        var regularMarketPrice = $("<li>");
        $(regularMarketPrice).addClass("list-group-item text-white bg-dark mb-3");
        $(regularMarketPrice).text(response[i].regularMarketPrice.fmt);

        var regularMarketChangePercent = $("<li>");
        $(regularMarketChangePercent).addClass("list-group-item text-white bg-dark mb-3");
        $(regularMarketChangePercent).text(response[i].regularMarketChangePercent.fmt);

        var marketState = $("<li>");
        $(marketState).addClass("list-group-item text-white bg-dark mb-3");
        $(marketState).text(response[i].marketState);


        $(unorderedList).append(shortName);
        $(unorderedList).append(regularMarketChange);
        $(unorderedList).append(regularMarketPrice);
        $(unorderedList).append(regularMarketChangePercent);
        $(unorderedList).append(marketState);
        
        $(card).append(cardHeader);
        $(card).append(unorderedList);

        $(displayRow).append(card);
    }


}


function getApi(){

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "0c292c0993mshd75f0effe5adad9p120e45jsn157b0022e4d8"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        displayResults(response);
    });
    
}


$(document).ready(function (){

    getApi();

});



// <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
//   <div class="card-header">Header</div>
//   <div class="card-body">
//     <h5 class="card-title">Dark card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//   </div>
// </div>


// <div class="card" style="width: 18rem;">
//   <div class="card-header">
//     Featured
//   </div>
//   <ul class="list-group list-group-flush">
//     <li class="list-group-item">Cras justo odio</li>
//     <li class="list-group-item">Dapibus ac facilisis in</li>
//     <li class="list-group-item">Vestibulum at eros</li>
//   </ul>
// </div>



