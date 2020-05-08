class OpenWeather {
    constructor() {
        this.apikey = 'ff81d6ab13e4f784a6d748e37b7f78e5';
    }
    async search(cityName) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apikey}`);

        const results = await response.json();

        return results;

    }
    async searchByCoordinates(lat, lon) {
        const responseBYCoordinates = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apikey}`);
        const resultsBYCoordinates = await responseBYCoordinates.json();

        return resultsBYCoordinates;
    }
}