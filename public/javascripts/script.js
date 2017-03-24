/**
 * Created by nutan on 3/24/2017.
 */

$(document).ready(function () {

    getRelevantGoogleReviews = function() {
        var service = new google.maps.places.PlacesService($('#service-helper').get(0)); // note that it removes the content inside div with tag '#service-helper'
        var originInput = document.getElementById('searchbox');
        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
        originAutocomplete.addListener('place_changed',function(){

            var place = originAutocomplete.getPlace();
            console.log("place change***"+JSON.stringify(place));
        })
    }

});
