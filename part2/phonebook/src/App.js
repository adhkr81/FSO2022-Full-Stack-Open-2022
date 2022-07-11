import { useState } from "react";
import { Filtered } from "./Components/Filter/filter"
import { PersonForm } from "./Components/PersonForm/personform"
import { SearchBar } from "./Components/SearchBar/SearchBar"




const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-1234567", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);

	const [newName, setNewName] = useState({ name: "", number: "" });

	const [searchbar, setSearchbar] = useState("");

	const handleFilter = (event) => {
		return setSearchbar(event.target.value)
	};

	function isRepeated(current) {
		return current.name === newName.name;
	}

	function handleSubmit(e) {
		e.preventDefault();

		if (persons.find(isRepeated)) {
			return alert(`${newName.name} is already added to phonebook`);
		}

		setPersons([...persons, newName]);
	}

	function handleChange(e) {
		setNewName({ ...newName, [e.target.name]: e.target.value });
	}



	return (
		<div>
			<h2>Phonebook</h2>

      <SearchBar handleFilter={handleFilter}/>
			
			<h2>add a new</h2>

			<PersonForm handleSubmit={handleSubmit} handleChange={handleChange}/>

			<h2>Numbers</h2>

			<div>
				<Filtered persons={persons} searchbar={searchbar}/>
			</div>
		</div>
	);
};

export default App;
