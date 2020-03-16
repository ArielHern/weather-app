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
        const airQ = json.air_quality;

        document.querySelector('.temparature-degree').textContent = weather.temperature;
        document.querySelector('.temperature-description').textContent = weather.summary;
        document.querySelector('.location-time').textContent = json.weather.timezone;


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

