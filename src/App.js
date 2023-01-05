
import React, { useState } from "react";
import "./App.css";
import Nav from './component/Nav.jsx';
import Cards from './component/Cards.jsx';
import Ciudad from './component/Ciudad.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Route } from 'react-router-dom';

const apiKey = "4ae2636d8dfbdc3044bede63951a019b";


export default function App() {
	const [cities, setCities] = useState([]);

	function onClose(id) {
		setCities((oldCities) => oldCities.filter((city) => city.id !== id));
	}

	async function onSearch(cityToSearch) {
		try {
			let jsonCity = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&units=metric&appid=${apiKey}`
			);
			let cityData = jsonCity.data;

			const city = {
				id: cityData.id,
				min: Math.round(cityData.main.temp_min),
				max: Math.round(cityData.main.temp_max),
				img: cityData.weather[0].icon,
				wind: cityData.wind.speed,
				temp: Math.round(cityData.main.temp),
				name: cityData.name,
				weather: cityData.weather[0].main,
				clouds: cityData.clouds.all,
				latitud: cityData.coord.lat,
				longitud: cityData.coord.lon,
			};

			cities.some((e) => e.name === city.name)
				? Swal.fire({
						title: "Error!",
						text: "You've already searched for that city!",
						icon: "warning",
						confirmButtonText: "Alright",
				  })
				: setCities((oldCities) => [...oldCities, city]);
		} catch (error) {
			Swal.fire({
				title: "Error!",
				text: "The city was not found.",
				icon: "error",
				confirmButtonText: "Alright",
			});
		}
	}

	function onFilter(cityId) {
		let city = cities.filter((c) => c.id === parseInt(cityId));

		if (city.length > 0) {
			return city[0];
		} else {
			return null;
		}
	}

	return (
		<div className="App">
			<header>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com"/>
				<link
					href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400&display=swap"
					rel="stylesheet"
				/>
			</header>
			<Route path="/" render={() => <Nav onSearch={onSearch} />} />

			<div className="cards">
				<Route
					exact
					path="/"
					render={() => <Cards cities={cities} onClose={onClose} />}
				/>

				<Route
					exact
					path="/ciudad/:ciudadId"
					render={({ match }) => (
						<Ciudad city={onFilter(match.params.ciudadId)} />
					)}
				/>
			</div>
		</div>
	);
}

