
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "d82105d5f36a26fd6f8d992a815b97aa";
const date = document.querySelector(" .date");
var now;


form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  //check if there's already a city
  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      if (inputVal.includes(",")) {
        //only takes first 2 alphabets after ,
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well`;
      form.reset();
      input.focus();
      return;
    }
  }

  //API calling
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      //For Weather icon
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;
      
      
      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })  
   
    .catch(() => {
      msg.textContent = "Please search for a valid city";
    });


  now = new Date();
 date.innerText = dateBuilder(now);

  function dateBuilder(d){
    let months = ["January", "Februaary", "March", "April","May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
  }

  //Reset
  msg.textContent = "";
  form.reset();
  input.focus();

});


  /*var ac = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
  google.maps.event.addListener(ac,'place_changed',function(){
    var place=ac.getPlace();
    console.log(place.formatted_address);
    console.log(place.url);
    console.log(place.geometry.location);
  });
  */