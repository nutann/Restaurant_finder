/**
 * Created by nutan on 3/24/2017.
 */

$(document).ready(function () {

    $('#search_form').submit(function(event) {
        event.preventDefault()
        var data = $("#search_form").serializeArray();
        console.log("data is ************"+JSON.stringify(data));
    });

    var place;
    (function() {
        var service = new google.maps.places.PlacesService($('#searchbox').get(0)); // note that it removes the content inside div with tag '#service-helper'
        var originInput = document.getElementById('searchbox');
        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput);
        var $iSelector;

        originAutocomplete.addListener('place_changed',function(){

            place = originAutocomplete.getPlace();
            console.log("place change***"+JSON.stringify(place));

            var request = {
                location: originAutocomplete.getPlace().geometry.location,
                radius: '500',
                types: ['restaurant']
            };
            $iSelector = $('button.btn').find('i');
            console.log("select ****"+JSON.stringify($iSelector));

            $iSelector.removeClass('glyphicon glyphicon-search')
            $iSelector.addClass('glyphicon glyphicon-repeat gly-spin')
            //<i class="glyphicon glyphicon-repeat gly-spin"></i>


            service.nearbySearch(request, callbck);

            function callbck(results, status) {
                console.log("Entered");
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log(results.size);
                    for (var i = 0; i < results.length; i++) {
                        console.log(results[i].name);
                    }
                    console.log("Done");
                    $iSelector.removeClass('glyphicon glyphicon-repeat gly-spin');
                    $iSelector.addClass('glyphicon glyphicon-search');
                }
            }
        })


    })();



});


