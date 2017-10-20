(function() {
    
        if(!!navigator.geolocation) {
            
            navigator.geolocation.getCurrentPosition(function(position) {
            
                var CENTER = [position.coords.latitude, position.coords.longitude];
        
                console.log(CENTER);
                
            });
            
        }
        
    })();