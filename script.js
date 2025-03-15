const searchValue = document.getElementById("searchValue");
const title = document.getElementById("title");
const temperature = document.getElementById("temperature");
const description = document.querySelector(".description");
const cloud = document.getElementById("cloud");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const form = document.querySelector("form");
const main = document.querySelector('main')

let id = `45ea3a882ab933399bd087a404e1a98a`;
// let url = `http://api.openweathermap.org/data/2.5/weather?units=metric&appid=${id}`;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (searchValue.value != "") {
    searchWeather();
  }else{
    
    console.log("not running");
  }
});


// function for showing data of weathers
function searchWeather() {
  title.querySelector('figcaption').innerHTML = 'searching...'
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue.value},IN&appid=${id}&units=metric`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if(data.cod == 200){
          console.log(`you entered ${data.name}`)
          console.log(data)
          title.querySelector('figcaption').innerHTML = data.name
          title.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/64.png`
          if(data.sys.country == "IN" ){
            title.querySelector('img').src = `citylogo.png`
          } 

          // temperature.querySelector('img').src = `http://openweathermap.org/img/wn/${data.weather[0]}.png`
          temperature.querySelector('figcaption span').innerHTML = data.main.temp
          description.innerHTML = data.weather[0].description
          cloud.innerHTML = data.clouds.all
          humidity.innerHTML = data.main.humidity
          pressure.innerHTML = data.main.pressure
          
        }else{
          main.classList.add('error');
          
          setTimeout(()=>{
            main.classList.remove('error')
          },1000)
        }
searchValue.value = ''
      })
    
    }

    // Function to fetch weather by user's location
    function getWeatherByLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${id}&units=metric`)
          .then(response => response.json())
          .then(data =>{
            title.querySelector('figcaption').innerHTML = data.name
            temperature.querySelector('figcaption span').innerHTML = data.main.temp
            description.innerHTML = data.weather[0].description
            cloud.innerHTML = data.clouds.all
            humidity.innerHTML = data.main.humidity
            pressure.innerHTML = data.main.pressure

                })
                .catch(error => console.error("Error fetching weather:", error));
        }, () => {
            alert("Geolocation not supported or permission denied.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}



// today date showing
  function today (){

    let date = new Date()
    let option = {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }
    document.querySelector('.time').innerHTML = date.toLocaleDateString("en-GB",option)
  }
  today()


  getWeatherByLocation()

  // weather: delhi on load
const initApp = ()=>{
  // searchValue.value = 'Delhi'
  // searchWeather()
}
initApp()