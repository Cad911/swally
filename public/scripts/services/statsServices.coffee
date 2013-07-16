window.ourApp.factory('statsServices', ['Stats', '$http', (Stats, $http)->
    statsVar = {}
    statsVar.device_name = ''
    statsVar.alreadyCheck = false
    statsVar.position = {
        lat: 0,
        long: 0,
        city: ''
        cp: ''
        region: ''
        country: ''

    }

    
    localize = (callback)->
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition((position)->
                latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                geocoder = new google.maps.Geocoder()
                geocoder.geocode({'latLng':latlng}, (results, status)->
                    
                    for t, result of results
                        switch result.types[0]
                            when 'locality'
                                statsVar.position.city = result['address_components'][0]['long_name']
                            when 'postal_code'
                                statsVar.position.cp = result['address_components'][0]['long_name']
                            when 'administrative_area_level_1'
                                statsVar.position.region = result['address_components'][0]['long_name']
                            when 'administrative_area_level_2'
                                statsVar.position.department = result['address_components'][0]['long_name']
                            when 'country'
                                statsVar.position.country = result['address_components'][0]['long_name']
                        
                            
                    
                    statsVar.alreadyCheck = true

                    rows_city = Stats.query({query: JSON.stringify({city:"Lille"})}, ()->
                        if rows_city.length > 0
                            statsVar.position.lat = rows_city[0].lat
                            statsVar.position.long = rows_city[0].long
                            
                            # CONTINUEr ICI
                            callback()
                            # statsVar.saveStats(0)
                        else
                            geocoder.geocode({'address': statsVar.position.city}, (results, status)->
                                statsVar.position.lat = results[0].geometry.location.jb
                                statsVar.position.long = results[0].geometry.location.kb

                                callback()
                                # statsVar.saveStats(0)
                            )
                    )
                )
                true
            );
        else
            statsVar.position = {
                lat: 0,
                long: 0,
                city: 'None'
                cp: 'None'
                region: 'None'
                country: 'None'
            }
            callback()
        true

    localize(()->
        statsVar.saveStats(0)
    )

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

    # statsVar.getLatLong = ()->
    #     if this.position.lat == 0 && this.position.long == 0 && !statsVar.alreadyCheck
    #         # PUT THE SCRIPT WITH GOOGLE MAPS
    #         localize()
    #         return false

    #     return true


    statsVar.saveStats = (nb_swallow=1)->
        if this.position.lat == 0 && this.position.long == 0 && !statsVar.alreadyCheck
            localize(()->
                statsVar.saveStats(nb_swallow)
            )
        else
            statistiques = 
                lat: this.position.lat
                long: this.position.long
                city: this.position.city
                cp: this.position.cp
                department: this.position.department
                region: this.position.region
                country: this.position.country
                swallow: nb_swallow
                device: statsVar.getDeviceName()
                created_at : new Date()


            console.log statistiques
            

            # A TESTER
            newStats = new Stats(statistiques)
            newStats.$save()

            console.log newStats


        # SEND THE STATS TO THE WEB SERVICE

    statsVar
])