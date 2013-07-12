window.ourApp.factory('statsServices', ['Stats', '$http', (Stats, $http)->
    statsVar = {}
    statsVar.device_name = ''
    statsVar.position = {
        lat: 0,
        long: 0,
        city: ''
        cp: ''
        region: ''
        country: ''

    }

    
    localize = ()->
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition((position)->
                latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                geocoder = new google.maps.Geocoder()
                geocoder.geocode({'latLng':latlng}, (results, status)->
                    
                    statsVar.position.cp = results[0]['address_components'][6]['long_name']
                    statsVar.position.city = results[0]['address_components'][2]['long_name']
                    statsVar.position.region = results[0]['address_components'][3]['long_name']
                    statsVar.position.country = results[0]['address_components'][5]['long_name']
                    


                    rows_city = Stats.query({query: JSON.stringify({city:"Lille"})}, ()->
                        if rows_city.length > 0
                            statsVar.position.lat = rows_city[0].lat
                            statsVar.position.long = rows_city[0].longitude
                            
                            statsVar.saveStats(0)
                        else
                            geocoder.geocode({'address': statsVar.position.city}, (results, status)->
                                statsVar.position.lat = results[0].geometry.location.jb
                                statsVar.position.long = results[0].geometry.location.kb

                                statsVar.saveStats(0)
                            )
                    )
                )
                true
            );
        true

    localize()

    # setTimeout(()->
    #     # PUT THE SCRIPT WITH GOOGLE MAPS WHICH REGENERATE THE POSITION EVERY 10 MINUTES
    #     statsVar.position = {
    #         lat: 0,
    #         long: 0
    #     }
    # ,100000)


    statsVar.getDeviceName = ()->
        if this.device_name == ''
            user_agent = navigator.userAgent
            if /iPad/.test(user_agent)
                this.device_name = 'iPad'
            else if /iPhone/.test(user_agent)
                this.device_name = 'iPhone'
            else if /Android/.test(user_agent)
                this.device_name = 'Android'
            else if /Chrome/.test(user_agent)
                this.device_name = 'Google Chrome'
            else if /Firefox/.test(user_agent)
                this.device_name = 'Firefox'
            else if /Internet Explorer/.test(user_agent)
                this.device_name = 'Internet Explorer'
            else
                this.device_name = 'Unknown'

        return statsVar.device_name

    statsVar.getLatLong = ()->
        if this.position.lat == 0 && this.position.long == 0
            # PUT THE SCRIPT WITH GOOGLE MAPS
            localize()
        return this.position


    statsVar.saveStats = (nb_swallow=1)->
        this.getLatLong()
        statistiques = 
            lat: this.position.lat
            long: this.position.long
            city: this.position.city
            cp: this.position.cp
            region: this.position.region
            country: this.position.country
            swallow: nb_swallow
            device: statsVar.getDeviceName()
            created_at : new Date()

        

        # A TESTER
        newStats = new Stats(statistiques)
        newStats.$save()

        console.log newStats


        # SEND THE STATS TO THE WEB SERVICE

    statsVar
])