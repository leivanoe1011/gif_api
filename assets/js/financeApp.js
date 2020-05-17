

var markets = ["AU","CA", "FR","DE","HK","US","IT","ES","GB","IN"];

var displayRow = $("#display_row");


function createMarketDropDown(){

    var marketContainer = $("#market_id");

    for(var i = 0; i < markets.length; i++){
        var option = $("<option>");
        $(option).text(markets[i]);

        $(marketContainer).append(option);
    }
}


function displayResults(data){

    $(displayRow).empty();

    var response = data.marketSummaryResponse.result;

    // console.log(response);

    for(var i = 0; i < response.length; i++){
        // console.log(response[i].exchangeTimezoneName + " " + response[i].marketState + " " + response[i].exchange + " " + response[i].shortName);

        var card = $("<div>");
        $(card).addClass("card rounded border-10 bg-light mb-3 wow animate__animated animate__fadeInRight animate__slower");
        $(card).attr("style","max-width: 18rem");
        $(card).attr("data-wow-offset", "30");
        $(card).attr("data-wow-duration", "3s");
        // $(card).attr("data-wow-delay", "1s");

        var cardHeader = $("<div>");
        $(cardHeader).addClass("card-header bg-light mb-3 text-center");
        $(cardHeader).html("<strong>" + response[i].fullExchangeName + "</strong>");

        var unorderedList = $("<ul>");
        $(unorderedList).addClass("list-group list-group-flush bg-light mb-3");

        var shortName = $("<li>");
        $(shortName).addClass("list-group-item bg-light mb-3");
        $(shortName).html("<strong>Short Name: </strong><em>" + response[i].shortName + "</em>");

        var regularMarketChange = $("<li>");
        $(regularMarketChange).addClass("list-group-item bg-light mb-3");
        $(regularMarketChange).html("<strong>Regular Market Change: </strong><em>" + response[i].regularMarketChange.fmt + "</em>");

        var regularMarketPrice = $("<li>");
        $(regularMarketPrice).addClass("list-group-item bg-light mb-3");
        $(regularMarketPrice).html("<strong>Regular Market Price: </strong><em>" + response[i].regularMarketPrice.fmt + "</em>");

        var regularMarketChangePercent = $("<li>");
        $(regularMarketChangePercent).addClass("list-group-item bg-light mb-3");
        $(regularMarketChangePercent).html("<strong>Regular Market Change %: </strong><em>" + response[i].regularMarketChangePercent.fmt + "</em>");

        var marketState = $("<li>");
        $(marketState).addClass("list-group-item bg-light mb-3");
        $(marketState).html("<strong>Current Market State: </strong><em>" + response[i].marketState + "</em>");


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


function getApi(region = "US"){

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=" + region + "&lang=en",
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


$("#get_market").on("click", function(event){
    event.preventDefault();

    var marketValue = $("#market_id").val();

    // console.log(marketValue);

    getApi(marketValue);

})

$(document).ready(function (){

    createMarketDropDown();

    getApi();

});



// <div class="card bg-light mb-3" style="max-width: 18rem;">
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



