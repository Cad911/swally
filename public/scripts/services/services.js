// Generated by CoffeeScript 1.6.3
(function() {
  window.ourApp.factory('Categories', [
    '$resource', function($resource) {
      return $resource('http://:url/:categoryId.json', {
        url: "swally.herokuapp.com/categories",
        categoryId: '@id'
      }, {
        getById: {
          method: 'GET'
        }
      });
    }
  ]);

  window.ourApp.factory('Pledges', [
    '$resource', function($resource) {
      return $resource('http://:url/pledges.json', {
        url: "swally.herokuapp.com"
      }, {
        getAll: {
          method: 'GET'
        }
      });
    }
  ]);

  window.ourApp.factory('sharedServices', [
    '$rootScope', function($rootScope) {
      var sharedVar;
      sharedVar = {};
      sharedVar.show_mini_game = false;
      sharedVar.current_mini_game = [];
      sharedVar.showMiniGame = function(current_mini_game) {
        this.show_mini_game = true;
        this.current_mini_game = current_mini_game;
        return $rootScope.$broadcast('show-mini-game');
      };
      sharedVar.hideMiniGame = function() {
        this.show_mini_game = false;
        this.current_mini_game = {};
        return $rootScope.$broadcast('hide-mini-game');
      };
      sharedVar.sharedScrollToZero = function() {
        return $rootScope.$broadcast('scroll-to-zero');
      };
      return sharedVar;
    }
  ]);

  window.ourApp.factory('Stats', [
    '$resource', function($resource) {
      return $resource('https://api.mongolab.com/api/1/databases/heroku_app12577889/collections/Stat?apiKey=6Utcl_PXWwHq64dribp2m8XA2pOAlLnG&q=:query');
    }
  ]);

  window.ourApp.factory('statsServices', [
    'Stats', '$http', function(Stats, $http) {
      var localize, statsVar;
      statsVar = {};
      statsVar.device_name = '';
      statsVar.alreadyCheck = false;
      statsVar.position = {
        lat: 0,
        long: 0,
        city: '',
        cp: '',
        region: '',
        country: ''
      };
      localize = function(callback) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geocoder, latlng;
            latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({
              'latLng': latlng
            }, function(results, status) {
              var result, rows_city, t;
              for (t in results) {
                result = results[t];
                switch (result.types[0]) {
                  case 'locality':
                    statsVar.position.city = result['address_components'][0]['long_name'];
                    break;
                  case 'postal_code':
                    statsVar.position.cp = result['address_components'][0]['long_name'];
                    break;
                  case 'administrative_area_level_1':
                    statsVar.position.region = result['address_components'][0]['long_name'];
                    break;
                  case 'administrative_area_level_2':
                    statsVar.position.department = result['address_components'][0]['long_name'];
                    break;
                  case 'country':
                    statsVar.position.country = result['address_components'][0]['long_name'];
                }
              }
              statsVar.alreadyCheck = true;
              return rows_city = Stats.query({
                query: JSON.stringify({
                  city: "Lille"
                })
              }, function() {
                if (rows_city.length > 0) {
                  statsVar.position.lat = rows_city[0].lat;
                  statsVar.position.long = rows_city[0].long;
                  return callback();
                } else {
                  return geocoder.geocode({
                    'address': statsVar.position.city
                  }, function(results, status) {
                    statsVar.position.lat = results[0].geometry.location.jb;
                    statsVar.position.long = results[0].geometry.location.kb;
                    return callback();
                  });
                }
              });
            });
            return true;
          });
        } else {
          statsVar.position = {
            lat: 0,
            long: 0,
            city: 'None',
            cp: 'None',
            region: 'None',
            country: 'None'
          };
          callback();
        }
        return true;
      };
      localize(function() {
        return statsVar.saveStats(0);
      });
      statsVar.getDeviceName = function() {
        var user_agent;
        if (this.device_name === '') {
          user_agent = navigator.userAgent;
          if (/iPad/.test(user_agent)) {
            this.device_name = 'iPad';
          } else if (/iPhone/.test(user_agent)) {
            this.device_name = 'iPhone';
          } else if (/Android/.test(user_agent)) {
            this.device_name = 'Android';
          } else if (/Chrome/.test(user_agent)) {
            this.device_name = 'Google Chrome';
          } else if (/Firefox/.test(user_agent)) {
            this.device_name = 'Firefox';
          } else if (/Internet Explorer/.test(user_agent)) {
            this.device_name = 'Internet Explorer';
          } else {
            this.device_name = 'Unknown';
          }
        }
        return statsVar.device_name;
      };
      statsVar.saveStats = function(nb_swallow) {
        var newStats, statistiques;
        if (nb_swallow == null) {
          nb_swallow = 1;
        }
        if (this.position.lat === 0 && this.position.long === 0 && !statsVar.alreadyCheck) {
          return localize(function() {
            return statsVar.saveStats(nb_swallow);
          });
        } else {
          statistiques = {
            lat: this.position.lat,
            long: this.position.long,
            city: this.position.city,
            cp: this.position.cp,
            department: this.position.department,
            region: this.position.region,
            country: this.position.country,
            swallow: nb_swallow,
            device: statsVar.getDeviceName(),
            created_at: new Date()
          };
          console.log(statistiques);
          newStats = new Stats(statistiques);
          newStats.$save();
          return console.log(newStats);
        }
      };
      return statsVar;
    }
  ]);

}).call(this);
