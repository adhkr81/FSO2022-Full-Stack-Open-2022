require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

//MODELS
const Person = require("./models/person");

//MIDDLEWARE
const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	}

	next(error);
};

app.use(express.json());
app.use(cors());
app.use(express.static("build"));
app.use(errorHandler);
app.use(
	morgan((tokens, req, res) => {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, "content-length"),
			"-",
			tokens["response-time"](req, res),
			"ms",
			JSON.stringify(req.body),
		].join(" ");
	})
);

//Get All
app.get("/api/persons", (request, response) => {
	Person.find({}).then((persons) => {
		console.log(persons);
		response.json(persons);
	});
});

//Info
app.get("/info", (request, response) => {
	response.send(`<p>Phonebook has info for ${persons.length} people</p>
                   <p>${new Date()}</p>`);
});

//Get by ID
app.get("/api/persons/:id", (request, response) => {
	id = request.params.id;

	Person.findById(id)
		.then((current) => {
			if (current) {
				response.json(current);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

//Delete
app.delete("/api/persons/:id", (request, response, next) => {
	id = request.params.id;

	Person.findByIdAndRemove(id)
		.then((result) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

//Add new Person
app.post("/api/persons", (request, response) => {
	const body = request.body;
	console.log(request.body);

	if (body === undefined) {
		return response.status(400).json({ error: "content missing" });
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person.save().then((savedPerson) => {
		response.json(savedPerson);
	});
});

//Update
app.put("/api/persons/:id", (request, response, next) => {
	const body = request.body;
	const id = request.params.id;

	const person = {
		name: body.name,
		number: body.number,
	};

	Person.findByIdAndUpdate(id, person, { new: true })
		.then((updatedPerson) => {
			response.json(updatedPerson);
		})
		.catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
