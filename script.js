// script.js
document.addEventListener("DOMContentLoaded", function() {
  fetch("DigitalForecast-JawaTimur.xml")
  .then(response => response.text())
  .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      const areas = xml.querySelectorAll("area");
      
      const weatherContainer = document.getElementById("weather-container");
      
      areas.forEach(area => {
          const name = area.querySelector("name").textContent;
          const temperature = area.querySelector("parameter[id='t'] value[unit='C']").textContent;
          const humidity = area.querySelector("parameter[id='hu'] value[unit='%']").textContent;
          const weatherIcon = area.querySelector("parameter[id='weather'] value[unit='icon']").textContent;
          const windDirection = area.querySelector("parameter[id='wd'] value[unit='CARD']").textContent;
          const windSpeed = area.querySelector("parameter[id='ws'] value[unit='Kt']").textContent;
          
          const weatherCard = document.createElement("div");
          weatherCard.classList.add("weather-card");
          weatherCard.innerHTML = `
              <h2>${name}</h2>
              <img src="weather.png" alt="Weather Icon">
              <p>Temperature: ${temperature}°C</p>
              <p>Humidity: ${humidity}%</p>
              <p>Wind: ${windDirection} ${windSpeed} Kt</p>
          `;
          
          weatherContainer.appendChild(weatherCard);
      });
  })
  .catch(error => console.error("Error fetching data:", error));
});
