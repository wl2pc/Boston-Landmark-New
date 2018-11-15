mapboxgl.accessToken = 'pk.eyJ1IjoicmVteTk1NjkiLCJhIjoiY2puNHd5d3dmMGR4ZDNwbzVmYTNiMHFoayJ9.I5_UHJ0WlaVOFZzmZ8LgAg';

        $(document).ready(function(){
    $("#Name1").on('mousemove',function(){
        var div = $("#Name1");  
        div.animate({left: '25px'}, "slow");
        div.animate({fontSize: '1.8em'}, "slow");

    });
});


var map = new mapboxgl.Map({
    container: 'map',
    minZoom: 10,
    maxZoom: 17,
    style: 'mapbox://styles/remy9569/cjobvoc552rlk2so7raclaelz',     
    attributionControl: 'City of Charlottesville Open Data Portal (http://opendata.charlottesville.org/)'
});




$("#about").on('click', function() {
    $("#screen").fadeToggle();
    $(".modal").fadeToggle();
});

$(".modal>.close-button").on('click', function() {
    $("#screen").fadeToggle();
    $(".modal").fadeToggle();
});

// Legend
var layers = [
    'Landmark',
    'Historical site',
    'University and College'
];

var colors = [
    '#006400',
    '#98FB98',
    '#FF69B4',
   
];

for (i=0; i<layers.length; i++) {
    var layer =layers[i];
    var color =colors[i];

   

var itemHTML = "<div><span class='legend-key'></span><span>" + layer + "</span></div>"; // create the HTML for the legend element to be added
    var item = $(itemHTML).appendTo("#legend"); // add the legend item to the legend
    var legendKey = $(item).find(".legend-key"); // find the legend key (colored circle) for the current item
    legendKey.css("background", color); // change the background color of the legend key
}




map.on('mousemove', function(e) {   // Event listener to do some code when the mouse moves, see https://www.mapbox.com/mapbox-gl-js/api/#events. 
     var History = map.queryRenderedFeatures(e.point, { 
        layers: ['boston-landmarks-commission-b-6taprb'] 
     });
    
     if (History.length > 0) {   // if statement to make sure the following code is only added to the info window if the mouse moves over a state

            $('#info-window-body').html('<h2><strong>' + History[0].properties.PLACE_NAME);
  
        } else {    // what shows up in the info window if you are NOT hovering over a park

            $('#info-window-body').html('<p>Not hovering over a <strong>landmark</strong> right now.</p>');
            
        }

    });

 map.on('mousemove', function(e) {   // Event listener to do some code when the mouse moves, see https://www.mapbox.com/mapbox-gl-js/api/#events. 
     var Landmark = map.queryRenderedFeatures(e.point, { 
        layers: ['boston-landmarks-commission-b-9dbf7j (1)'] 
     });
    
     if (Landmark.length > 0) {   // if statement to make sure the following code is only added to the info window if the mouse moves over a state

            $('#info-window-body').html('<h2><strong>' + Landmark[0].properties.Name_of_Pr+ '<p>'+Landmark[0].properties.Date_Desig+'</p><img class="Landmark-image" src="img/' + Landmark[0].properties.Name_of_Pr +'.jpg">');
  
        } else {    // what shows up in the info window if you are NOT hovering over a park

            $('#info-window-body').html('<p>Not hovering over a <strong>landmark</strong> right now.</p>');
            
        }

    });


// POPUPS CODE

 map.on('click', function(e) {   // Event listener to do some code when the mouse moves, see https://www.mapbox.com/mapbox-gl-js/api/#events. 
     var University = map.queryRenderedFeatures(e.point, { 
        layers: ['colleges-and-universities-9i397v (1)'] 
     });
     if (University.length == 0) {
        return;
    }

     var popup = new mapboxgl.Popup({ 
        closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
        closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
        anchor: 'bottom', // The popup's location relative to the feature. Options are 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left' and 'bottom-right'. If not set, the popup's location will be set dynamically to make sure it is always visible in the map container.
        offset: [0, -15] // A pixel offset from the centerpoint of the feature. Can be a single number, an [x,y] coordinate, or an object of [x,y] coordinates specifying an offset for each of the different anchor options (e.g. 'top' and 'bottom'). Negative numbers indicate left and up.
    });
    popup.setLngLat(University[0].geometry.coordinates);

    console.log(University[0].properties);

      // Set the contents of the popup window
      popup.setHTML('<h2> ' + University[0].properties.Name + '</h3><p>' + University[0].properties.Address +'<p>Built: ' + University[0].properties.YearBuilt);
            // stops[0].properties.stop_id will become the title of the popup (<h3> element)
            // stops[0].properties.stop_name will become the body of the popup


        // popup.setHTML('<p>' + stops[0].properties.stop_name + '</p>')
        

      // Add the popup to the map 
      popup.addTo(map);  // replace "map" with the name of the variable in line 4, if different

      map.flyTo({
        center: e.lngLat,
        zoom: 16,
        pitch: 56,
        bearing:0 ,
      })


  });

 map.on('mouseover', function(e) {
    // do something when you hover over the map
 })




 var layers = [  // an array of the layers you want to include in the layers control (layers to turn off and on)

        // [layerMachineName, layerDisplayName]
        // layerMachineName is the layer name as written in your Mapbox Studio map layers panel
        // layerDisplayName is the way you want the layer's name to appear in the layers control on the website
        ['boston-landmarks-commission-b-6taprb', 'Historical Site'],                      // layers[0]
        ['boston-landmarks-commission-b-9dbf7j (1)', 'Landmark'],                              // layers[1][1] = 'Parks'
        ['colleges-and-universities-9i397v (1)', 'University'],     
        ['traffic', 'Road'],
        ['background', 'Map background']
        // add additional live data layers here as needed
    ]; 
    map.on('load', function () {
        
        
        for (i=0; i<layers.length; i++) {

            // add a button for each layer
            $("#layers-control").append("<a href='#' class='active button-default' id='" + layers[i][0] + "'>" + layers[i][1] + "</a>"); // see http://api.jquery.com/append/
        }
         $("#layers-control>a").on('click', function(e) {

                var clickedLayer = e.target.id;

                e.preventDefault();
                e.stopPropagation();

                var visibility = map.getLayoutProperty(clickedLayer, 'visibility');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#getlayoutproperty
                console.log(visibility);

                if (visibility === 'visible') {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                    $(e.target).removeClass('active');
                } else {
                    $(e.target).addClass('active');
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible'); // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                }
        });
    });

    // CHANGE LAYER STYLE
var swatches = $("#swatches");

    var colors = [  // an array of color options for the bus stop ponts
        '#06491E',
        '#ffd700',
        '#FC1C8C',
        '#673ab7'
    ]; 

    var layer = 'boston-landmarks-commission-b-9dbf7j (1)';

    colors.forEach(function(color) {
        var swatch = $("<button class='swatch'></button>").appendTo(swatches);

        $(swatch).css('background-color', color); 

        $(swatch).on('click', function() {
            map.setPaintProperty(layer, 'fill-color', color); // 'circle-color' is a property specific to a circle layer. Read more about what values to use for different style properties and different types of layers at https://www.mapbox.com/mapbox-gl-js/style-spec/#layers
        });

        $(swatches).append(swatch);
    });

