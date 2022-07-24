import { useState, useEffect } from "react";
import axios from "axios";
import {Display} from "./components/Display"
import env from "react-dotenv";

function App() {
	const [search, setSearch] = useState({ name: "" });
	const [countries, setCountries] = useState([]);
	const [singleCity, setSingleCity] = useState("");
	const [countriesSearch, setCountriesSearch] = useState([]);
	const [weather, setWeather] = useState({
		current: {temp_f : "",
				 condition: {icon: ""},
				 wind_mph : "",
				 wind_dir : ""
				}
	});

	useEffect(() => {
		async function fetchCountries() {
			try {
				const response = await axios.get("https://restcountries.com/v3.1/all");
				setCountries(response.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchCountries();
	}, []);

	function handleChange(event) {
		setSearch({ ...search, [event.target.name]: event.target.value });
		setCountriesSearch(countries.filter((country) => country.name.common.toLowerCase().includes(search.name.toLowerCase())));
	}

	console.log(weather);

	return (
		<div className="App">
			<form>
				<label>Find countries </label>
				<input
					name="name"
					type="text"
					onChange={(event) => {
						handleChange(event);
					}}
				/>
			</form>

			<Display countriesSearch={countriesSearch} setCountriesSearch={setCountriesSearch} setWeather={setWeather} weather={weather} singleCity={singleCity} setSingleCity={setSingleCity}/>
		</div>
	);
}

export default App;





