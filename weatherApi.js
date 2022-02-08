navigator.geolocation.getCurrentPosition(
    function(position) {
        let lat = Math.floor(position.coords.latitude);
        let lon = Math.floor(position.coords.longitude);
        async function test(){
            let url =  "http://api.openweathermap.org/data/2.5/weather?lat="+`${lat}`+"&lon="+`${lon}`+"&appid=6d808d6d33269c0a56560a96f537263c";
            let response = await fetch(url);
            let data = await response.json(); 
            return data;
        }
    test().then(function (data){;
            document.querySelector('#weather-name').textContent = data.name;
            document.querySelector('#weather-img li').innerHTML = `<img src = "https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
            document.querySelector('#weather-temp').innerHTML = Math.round(data.main.temp - 273) + '&deg' ;
        })
	});


 

