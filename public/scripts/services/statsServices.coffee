window.ourApp.factory('statsServices', ['$rootScope', ($rootScope)->
    statsVar = {}
    device_name = ''
    position = {
        lat: 0,
        long: 0
    }

    setTimeout(()->
        # PUT THE SCRIPT WITH GOOGLE MAPS WHICH REGENERATE THE POSITION EVERY 10 MINUTES
        position = {
            lat: 0,
            long: 0
        }
    ,100000)


    statsVar.getDeviceName = ()->
        if device_name == ''
            user_agent = navigator.userAgent
            if /iPad/.test(user_agent)
                device_name = 'iPad'
            else if /iPhone/.test(user_agent)
                device_name = 'iPhone'
            else if /Android/.test(user_agent)
                device_name = 'Android'

        return statsVar.device_name

    statsVar.getLatLong = ()->
        if position.lat == 0 && position.long == 0
            # PUT THE SCRIPT WITH GOOGLE MAPS
            position = {
                lat: 0,
                long: 0
            }
        return statsVar.position


    statsVar.saveStats = ()->
        this.getLatLong()
        stats = 
            lat: this.position.lat
            long: this.position.long
            swallow: 1
            device: this.device_name

        # SEND THE STATS TO THE WEB SERVICE

    statsVar
])