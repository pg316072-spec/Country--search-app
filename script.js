function searchCountry() {

    let name = document.getElementById("country").value.trim();

    if (name == "") {
        alert("Please enter country name");
        return;
    }

    document.getElementById("result").innerHTML =
        "<p>Searching...</p>";

    fetch("https://countries.dev/countries")
        .then(response => response.json())
        .then(countries => {

            let country = countries.find(c =>
                c.name.toLowerCase() == name.toLowerCase()
            );

            if (!country) {
                throw new Error("Country not found");
            }

            return fetch(
                "https://countries.dev/alpha/" + country.alpha2Code
            );
        })
        .then(response => response.json())
        .then(country => {

            document.getElementById("result").innerHTML =

                "<h2>" + country.flag + " " +
                country.name + "</h2>" +

                "<img class='flag' src='" +
                country.flags.png + "'>" +

                "<div class='info'>" +

                "<p><b>Capital:</b> " +
                country.capital + "</p>" +

                "<p><b>Population:</b> " +
                country.population.toLocaleString() + "</p>" +

                "<p><b>Region:</b> " +
                country.region + "</p>" +

                "<p><b>Sub-Region:</b> " +
                country.subregion + "</p>" +

                "<p><b>Currency:</b> " +
                country.currencies[0].name + "</p>" +

                "<p><b>Language:</b> " +
                country.languages[0].name + "</p>" +

                "<p><b>Area:</b> " +
                country.area.toLocaleString() + " km²</p>" +

                "<p><b>Country Code:</b> " +
                country.alpha2Code + "</p>" +

                "<p><b>Time Zone:</b> " +
                country.timezones[0] + "</p>" +

                "</div>";
        })

        .catch(error => {

            document.getElementById("result").innerHTML =
                "<h3>❌ Country not found</h3>";
        });
}
