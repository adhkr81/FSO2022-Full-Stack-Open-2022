import { useEffect } from "react";
import axios from "axios";

export function Display({ countriesSearch, setCountriesSearch, setWeather, weather, singleCity, setSingleCity }) {
	const API_KEY = process.env.REACT_APP_API_KEY;

	useEffect(() => {
		async function fetchWeather(singleCity) {
			try {
				const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${singleCity}&aqi=no`);
				setWeather(response.data);
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		} fetchWeather(singleCity)
	}, [singleCity])

	function buttonShow(country) {
		console.log(country);
		setCountriesSearch([country]);
	}

	if (countriesSearch.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	}

	if (countriesSearch.length <= 10 && countriesSearch.length > 1) {
		return (
			<>
				{countriesSearch.map((country) => {
					return (
						<p key={country.cca2}>
							{country.name.common}{" "}
							<button
								onClick={() => {
									buttonShow(country);
								}}
							>
								show
							</button>
						</p>
					);
				})}
			</>
		);
	}

	if (countriesSearch.length === 1) {
		let objKeys = Object.keys(countriesSearch[0].languages);
		
		setSingleCity(countriesSearch[0].capital[0])

		return (
			<>
				<h3>
					<strong>{countriesSearch[0].name.common}</strong>
				</h3>
				<p>capital {countriesSearch[0].capital}</p>
				<p>area {countriesSearch[0].area}</p>

				<h3>
					<strong>languages:</strong>
				</h3>

				<ul>
					{objKeys.map((current) => {
						return <li key={current}>{countriesSearch[0].languages[current]}</li>;
					})}
				</ul>

				<img src={countriesSearch[0].flags.png} alt="flags" width="200" height="150" />

				<h3>
					<strong>Weather in {countriesSearch[0].capital}</strong>
				</h3>

				<p>temperature: {weather.current.temp_f}° Celcius</p>
          		<img src={`https://${weather.current.condition.icon}`} alt="Weather icon"></img>
         		<p>wind: {weather.current.wind_mph} mph direction {weather.current.wind_dir}</p>			
			</>
		);
	}
}