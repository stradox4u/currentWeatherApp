let longitude;
    let latitude;
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureDegrees = document.querySelector('.conditions-temperature');
    const condition = document.querySelector('.conditions-description');
    const temperatureMeasurement = document.querySelector('.conditions-measurement');
    const unit = document.querySelector('.conditions-unit');
//Get Location from browser
window.addEventListener("load", () => {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`
            const api = `${proxy}https://api.darksky.net/forecast/3bf8daadc7695459e1f0a02a22655c24/${latitude},${longitude}`;
            fetch(api)
                .then(result => {
                    return result.json();
                })
                .then(result => {
                    //console.log(result);
                    const {
                        temperature,
                        summary,
                        icon
                    } = result.currently;

                    //Set DOM Elements
                    temperatureDegrees.textContent = temperature;
                    condition.textContent = summary;
                    locationTimezone.textContent = result.timezone;

                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    //Change Units on Click
                    temperatureMeasurement.addEventListener('click', () => {
                        if (unit.textContent === "F") {
                            unit.textContent = "C";
                            temperatureDegrees.textContent = ((temperature - 32) / 1.8).toFixed(1);
                        } else {
                            unit.textContent = "F";
                            temperatureDegrees.textContent = temperature;
                        }


                    })
                });
        })
    } else {
        alert('You need to allow us to access your location in order to show you the weather!');
    };

    function setIcons(icon, iconId) {
        const skycons = new Skycons({
            color: "black"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);

    }
});