 // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)

var GM = {
    init: function () {
        this.initCache();
        this.initMap();
        this.initBannerTopParallax();
    },

    initCache: function() {
        this.$body         = $('body');
        this.$popupContent = $('.js-marker-content');
        this.parallaxImg   = '.js-parallax-img:visible'
    },

    initBannerTopParallax: function () {
        var $parallaxImg  = null;

        this.$body.mousemove(function(e) {
            if($parallaxImg) {
                var $el    = $(e.currentTarget),
                    xPos   = e.pageX - (window.innerWidth / 2),
                    mXPcnt = Math.round(xPos / $el.width() * 100),
                    diffX  = $parallaxImg.width() - $el.width(),
                    myX    = diffX * (mXPcnt / 1500);

                $parallaxImg.animate({left: myX}, 0);
            } else if($(this.parallaxImg).length) {
                $parallaxImg = $(this.parallaxImg);
            }
        }.bind(this));
    },

    initMap: function () {
        var coordinates = {lat: 45.619778, lng: -122.540139},
            popupContent = this.$popupContent.html(),
            markerImage = 'img/gmaps/marker.png',
            zoom = 15,

            map = new google.maps.Map(document.getElementById('map'), {
                center: coordinates,
                zoom: 4,
                disableDefaultUI: true,
                scrollwheel: false
            }),

            infowindow = new google.maps.InfoWindow({
                content: popupContent
            }),

            marker = new google.maps.Marker({
                position: coordinates,
                map: map,
                icon: markerImage
            });

        $.getJSON("map-style_colored.json", function (data) {
            map.setOptions({styles: data});
        });

        google.maps.event.addListener(infowindow,'closeclick',function(){
            marker.setAnimation(google.maps.Animation.BOUNCE);
        });

        marker.addListener('click', function () {
            marker.setAnimation(null);
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        infowindow.open(map, marker);
    }
};

$(document).ready(function() {
    GM.init();
});