let weather = {
    "apiKey": "8a91c1d55adf4c5ec6180ebfe6131bc7",
    fetchWeather: function (city) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=8a91c1d55adf4c5ec6180ebfe6131bc7`
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data))
        .catch(function (e) {
            console.log("error")
        });
        },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        
        document.querySelector(".city").innerText = `Weather in ${name}`;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = `${description}`;
        document.querySelector(".temp").innerText = `${temp}°F`;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind Speed: ${speed}MPH`;

        document.body.style.backgroundImage = "url('https://source.unsplash.com/2000x1200/?" + name +"'"
        },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});
