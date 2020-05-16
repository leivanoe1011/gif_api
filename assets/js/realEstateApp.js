
// get local address
// Then translate either Geolocation or IP address to users local address and timezone
// Next display prospect properties around the area


var listing_state_code = "TN"
var listing_city = "Murfreesboro";
var listing_Zip_Code = "37128";
var listing_Limit = "10";
var apiKey = "0c292c0993mshd75f0effe5adad9p120e45jsn157b0022e4d8";
var listingsObj = $("#listings");


var settings = {
	"async": true,
	"crossDomain": true,
    "url": "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance" 
        + "&postal_code=" + listing_Zip_Code 
        + "&city=" + listing_city 
        + "&limit=" + listing_Limit 
        + "&offset=0"
        +"&state_code=" + listing_state_code + "",

	"method": "GET",
	"headers": {
		"x-rapidapi-host": "realtor.p.rapidapi.com",
		"x-rapidapi-key": apiKey
	}
}


function displayResults(data){

    // console.log("In Display Results");

    //listingsObj
    var properties = data.properties;

    for(var i = 0; i < properties.length; i++){
        console.log(properties[i]);
        
        var property = $("<div>");

        $(property).addClass("col-lg-4 col-xl-4");

        var propertyLink = $("<a>");

        var listingLink = properties[i].rdc_web_url;

        $(propertyLink).attr("href",listingLink);

        var propertyImage = $("<img>");

        var propertyImageUrl = properties[i].thumbnail;

        $(propertyImage).attr("src", propertyImageUrl);



        $(propertyLink).append(propertyImage);


        $(property).append(propertyLink);     
        
        $(property).appendTo(listingsObj);

    }

}

$.ajax(settings).done(function (response) {
    console.log(response);
    
    displayResults(response);
});







