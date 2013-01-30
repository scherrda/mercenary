define(['text!./infoWindow.mustache'], function (infoWindowTemplate) {
    return Backbone.View.extend({
        el: '#mapCanvas',
        infoWindowTemplate: Hogan.compile(infoWindowTemplate),
        currentMarkers: [],
        initialize: function () {
            this.geocoder = new google.maps.Geocoder();
            this.imageMarker = new google.maps.MarkerImage(
                './img/map-point.png',
                new google.maps.Size(48, 48), // taille
                new google.maps.Point(0, 0), // The origin for this image
                new google.maps.Point(5, 45) // The anchor for this image
            );
            this.infowindow = new google.maps.InfoWindow();

            this.listenTo(Backbone, 'gmap:add', this.addMarker);
        },
        render: function () {
            var latlng = new google.maps.LatLng(37.300275, -99.843750); // USA (48.5, 2); // France
            var myOptions = {
                zoom: 4,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP //ROADMAP HYBRID
            };
            this.map = new google.maps.Map(this.el, myOptions);
        },
        addMarker: function (item) {
            var self = this;

            // Localisation par nom de ville
            this.geocoder.geocode({ 'address': item.get('city') + ',' + item.get('country')}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var marker = new google.maps.Marker({
                        title: item.get('title'),
                        position: results[0].geometry.location,
                        map: self.map,
                        icon: self.imageMarker
                    });
                    google.maps.event.addListener(marker, 'click', function () {
                        self.infowindow.setContent(self.infoWindowTemplate.render(item.toJSON()));
                        self.infowindow.open(this.map, marker);
                    });
                    google.maps.event.addListener(marker, 'mouseover', function () {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    });
                    google.maps.event.addListener(self.map, 'click', function () {
                        marker.setAnimation(null);
                    });
                    self.currentMarkers.push(marker);
                } else {
                    console.log('Localization of ' + item.get('city') + ' not found');
                }
            });
        },
        empty: function () {
            _.each(this.currentMarkers, function (marker) {
                marker.setMap(null);
            });
            this.currentMarkers = [];
        }
    });
});