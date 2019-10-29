
  // Fonction appelée lors du click du bouton
  function start() {

      //On va déclarer city pour la faire passer dans le constructeur surchargé de la classe API_WEATHER
      let city = document.getElementById('city-input').value;
      //Et si la value est '', on la passe en undefined
      if(city === ''){
        city = undefined;
      }
    // Création de l'objet apiWeather
    const apiWeather = new API_WEATHER(city);
    // Appel de la fonction fetchTodayForecast

    apiWeather
      .fetchTodayForecast()
      .then(function(response) {
        // Récupère la donnée d'une API
        const data = response.data;

        // On récupère l'information principal
        const main = data.weather[0].main;
        const description = data.weather[0].description;
        const temp = data.main.temp;
        const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

        // Modifier le DOM
        document.getElementById('today-forecast-main').innerHTML = main;
        document.getElementById('today-forecast-more-info').innerHTML = description;
        document.getElementById('icon-weather-container').innerHTML = icon;
        document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;
        
      })
      .catch(function(error) {
        // Affiche une erreur
        console.error(error);
      });

      apiWeather
      .getThreeDayForecast()
      .then(function(response){

        const data = response.data;
        let next_day = 0;
        data.list.forEach((data, index) => {
          next_day++;
          document.getElementById(`${next_day}-forecast-main`).innerHTML = data.weather[0].main;
          document.getElementById(`${next_day}-forecast-more-info`).innerHTML = data.weather[0].description;
          document.getElementById(`${next_day}-icon-weather-container`).innerHTML = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);
          document.getElementById(`${next_day}-forecast-temp`).innerHTML = `${data.temp.day}°C`;

        });
      })
      
      .catch(function (error) {
        // Affiche une erreur
        console.error(error);
      });
  }
  document.onload = start();
