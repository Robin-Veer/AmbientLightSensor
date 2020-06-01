let body = document.querySelector('body');
const maxLux = 3500;
if ('AmbientLightSensor' in window) {
    const sensor = new AmbientLightSensor();
    sensor.onreading = () => {
        console.log('Ambient Light level:', sensor.illuminance);
        document.querySelector('#lumen').textContent = sensor.illuminance;

        let percentage = Math.round(getIlluminancePercentage(sensor));
        body.style.backgroundColor = `rgb(255, 255, 255, ${percentage})`;
    };
    sensor.onerror = (event) => {
        console.error(event.error.name, event.error.message);
    };
    sensor.start();
}

function getIlluminancePercentage(sensor) {
    return sensor.illuminance / (maxLux / 100) / 100;
}
