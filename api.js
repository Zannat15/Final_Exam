function connect() {
  var searchBox = document.getElementById("searchBox");
  var searchTerm = searchBox.value.trim();

  if (!searchTerm) {
    alert("Please enter a country name.");
    return;
  }

  var url = "https://restcountries.com/v3.1/name/" + searchTerm;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      showInBrowser(data);
      searchBox.value = "";         
      searchBox.focus();            
    })
    .catch(function (error) {
      console.error("Error fetching country data:", error);
      var displayArea = document.getElementById("displayArea");
      displayArea.innerHTML = "<p>Country not found!</p>";
    });
}

function showInBrowser(data) {
  var displayArea = document.getElementById("displayArea");

  
  displayArea.innerHTML = "";

  if (!Array.isArray(data) || data.length === 0) {
    displayArea.innerHTML = "<p>No country found!</p>";
    return;
  }

  for (var i = 0; i < data.length; i++) {
    var country = data[i];

    var name = country.name.common;
    var capital = country.capital ? country.capital[0] : "N/A";
    var flag = country.flags.png;
    var region = country.region;
    var population = country.population.toLocaleString();
    var currencyKey = country.currencies ? Object.keys(country.currencies)[0] : "N/A";
    var currency = currencyKey !== "N/A" ? country.currencies[currencyKey].name : "N/A";
    var lat = country.latlng ? country.latlng[0] : 0;
    var lng = country.latlng ? country.latlng[1] : 0;

    var newDiv = document.createElement("div");
    newDiv.classList.add("innerStyle");

    newDiv.innerHTML = `
      <h3>${name}</h3>
      <img src="${flag}" alt="Flag of ${name}">
      <p><strong>Capital:</strong> ${capital}</p>
      <p><strong>Region:</strong> ${region}</p>
      <p><strong>Population:</strong> ${population}</p>
      <p><strong>Currency:</strong> ${currency}</p>
      <iframe 
        src="https://maps.google.com/maps?q=${lat},${lng}&z=5&output=embed" 
        width="100%" 
        height="200" 
        frameborder="0" 
        style="border:0; border-radius:10px;" 
        allowfullscreen>
      </iframe>
    `;

    displayArea.appendChild(newDiv);
  }
}