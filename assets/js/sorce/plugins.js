// Plugins object

plugins = {

    iePlaceholder: function() {

        // Only do anything if the browser does not support placeholders
        if (!Modernizr.input.placeholder) {
            $('input, textarea').placeholder();
        }
    },

    googleMap: function() {

        // Map dragging
        var mapDrag = true;

        // Scrolling condition
        if(Modernizr.touch){
            mapDrag = false;
        }

        // Plum Creek Longitude & Latitude
        var pccLatLng = new google.maps.LatLng(39.3483428,-104.869894);

        // Map Options
        var mapOptions = {
            center: pccLatLng,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            draggable: mapDrag
        };

        // Map
        var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

        // // Marker for map
        // var marker = new google.maps.Marker({
        //     position: pccLatLng,
        //     map: map,
        //     icon: iconBase +  'svg-marker.svg',
        //     title: 'Plum Creek Church'
        // });

        // Colors for map
        map.set('styles', [{"featureType":"water","stylers":[{"color":"#5acde0"},{"visibility":"on"}]},{"featureType":"landscape","stylers":[{"color":"#f6f6f6"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]}]);
    }
        
};

// Avoid `console` errors in browsers that lack a console.

(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

