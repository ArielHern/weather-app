//Client


if ('geolocation' in navigator) {
    console.log('geolocation available');

    navigator.geolocation.getCurrentPosition(async position => {
        lon = position.coords.longitude;
        lat = position.coords.latitude;

        api_url = `weather/${lat},${lon}`;

        const response = await fetch(api_url);
        const json = await response.json();
        console.log(json);

        //Set weather 
        const weather = json.weather.currently;
        const airq = json.air_quality;

        document.querySelector('.temparature-degree').textContent = weather.temperature;
        document.querySelector('.temperature-description').textContent = weather.summary;
        document.querySelector('.location-time').textContent = json.weather.timezone;

        try {
            document.querySelector('.parameter').textContent = airq.results[0].measurements[0].parameter;
            document.querySelector('.air-q').textContent = airq.results[0].measurements[0].value;
            document.querySelector('.unit').textContent = airq.results[0].measurements[0].unit;
        }
        catch (err) {
            document.querySelector('.air-q').textContent = "Air quality information not available";
        };




        const icon = weather.icon;
        const iconId = document.querySelector('.icon');
        setIcons(icon, iconId);

    });
} else {
    console.log('geolocation not available');
}

function setIcons(icon, id) {
    const skycons = new Skycons({
        color: "white"
    });

    skycons.play();
    return skycons.set(id, icon);
}

