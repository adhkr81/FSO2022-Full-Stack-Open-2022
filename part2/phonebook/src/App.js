import { useState, useEffect } from "react";
import { Filtered } from "./Components/Filter/filter";
import { PersonForm } from "./Components/PersonForm/personform";
import { SearchBar } from "./Components/SearchBar/SearchBar";
import { Alert } from "./Components/Alert/Alert"
import service from "./services/services";
import axios from "axios";

const App = () => {
	const [persons, setPersons] = useState([]);

	const [newName, setNewName] = useState({ name: "", number: "" });

	const [searchbar, setSearchbar] = useState("");

	const [message, setMessage] = useState(null)

	useEffect(() => {
		service.getAll().then((initialLoad) => setPersons(initialLoad));
	}, []);

	const handleFilter = (event) => {
		return setSearchbar(event.target.value);
	};

	function isRepeated(current) {
		return current.name === newName.name;
	}

	function findId(name) {
		const user = persons.filter((current) => current.name === name);
		return user;
	}

	function findAndUpdate(newObj) {
		const updatedArr = persons.map((curr) => {
			return curr.name === newObj.name ? { name: newObj.name, number: newObj.number, id: newObj.number } : { name: curr.name, number: curr.number, id: curr.id };
		});
		console.log("aqiiiiii")
		setPersons(updatedArr);
		setMessage(`${newObj.name} was successfully updated`)
		setTimeout(() => {
			setMessage(null)
		  }, 5000)
	}

	function handleSubmit(e) {
		e.preventDefault();

		if (persons.find(isRepeated)) {
			if (window.alert(`${newName.name} is already added to phonebook, replace the old number with a new one ?`));
			{
				const user = findId(newName.name);
				const id = user[0].id;
				const newObj = user[0];
				newObj.number = newName.number;

				return service.update(id, newObj)
					.then(findAndUpdate(newObj))
					.catch((err) => {
						console.log(err)
					})
			} 
		}

		setPersons([...persons, newName]);

		service.create(newName);
	}

	function handleChange(e) {
		setNewName({ ...newName, [e.target.name]: e.target.value });
	}

	function deleteName(id) {
		if (window.alert(`Do you want to delete? ${newName.name}`));
		{
			service
				.remove(id)
				.catch((err) => {
					console.log(err)
					setMessage(`[ERROR] ${newName.name} was already deleted from server`)
					  setTimeout(() => {
						setMessage(null)
					  }, 5000)
				})
				.then(setPersons(persons.filter((person) => person.id !== id)));
		}
	}

	return (

		<div className="d-flex align-items-center flex-column space-between mt-5">

				<SearchBar handleFilter={handleFilter} />

				<Alert message={message}/>

				<h2 className="mt-4 mb-3">add</h2>
				<PersonForm handleSubmit={handleSubmit} handleChange={handleChange} />

				<h2 className="mt-4 mb-3">Contacts</h2>
				<Filtered persons={persons} searchbar={searchbar} deleteName={deleteName} />

		</div>

	);
};

export default App;

