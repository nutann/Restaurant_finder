/**
 * Created by nutan on 3/24/2017.
 */

$(document).ready(function () {

    $('#search_form').submit(function(event) {
        event.preventDefault()
        var data = $("#search_form").serializeArray();
        console.log("data is ************"+JSON.stringify(data));
        var div1 = (document).getElementById('horizontal-list');
        while(div1 != null && div1.firstChild){
            div1.innerHTML = '';
        }
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
                    console.log(results.length);

                    var cList = $('ul.horizontal-list')
                    $.each(results, function(i,result)
                    {
                        var li = $('<li/>')
                            .addClass('ui-menu-item')
                            .attr('role', 'menuitem')
                            .appendTo(cList);
                        var aaa = $('<a/>')
                            .addClass('ui-all')
                            .text(result.name)
                            .appendTo(li);

                        var photoUrl = result.photos?(result.photos[0].getUrl({maxWidth: 400, maxHeight: 400})):"img";
                        // var img = document.createElement("img");
                        // img.setAttribute('src', photoUrl + "photo.jpg");
                        // img.addClass('res-img');

                        var li = $('<img>')
                            .addClass('ui-img')
                            .attr('src', photoUrl + "photo.jpg")
                            .appendTo(li);
                        console.log("result == "+JSON.stringify(result));
                    });

                    $("ul.horizontal-list").quickPagination({pageSize:"10"})

                    console.log("Done");
                    $iSelector.removeClass('glyphicon glyphicon-repeat gly-spin');
                    $iSelector.addClass('glyphicon glyphicon-search');
                }
            }
        })


    })();

});


