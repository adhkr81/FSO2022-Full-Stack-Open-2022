import { useState } from "react";

const Button = (props) => {
	return <button onClick={props.onClick}>{props.text}</button>;
};

const Display = (props) => {
	return <h2>{props.text}</h2>;
};

const Anecdotescomponent = (props) => {
	return (
		<div>
			<p>{props.text}</p>
			<p>has {props.vote} votes</p>
		</div>
	);
};

function higherVote(vote) {
	let maximum = 0;
	let index = 0;

	for (let i = 0; i < 6; i++) {
		if (vote[i] > maximum) {
			maximum = vote[i];
			index = i;
		}
	}
	return index;
}

function App() {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
	];

	const [selected, setSelected] = useState(0);

	const [vote, setVote] = useState(Array(anecdotes.length).fill(0));

	console.log(vote);

	const handleButton = () => {
		let rng = Math.floor(Math.random() * anecdotes.length);
		setSelected(rng);
	};

	const handleVote = () => {
		const allVotes = [...vote];
		allVotes[selected] += 1;
		setVote(allVotes);
	};

	console.log(higherVote(vote)); // Returns the Index of Higher Number of the Vote Array

	return (
		<div className="App">
			<Display text="Anecdote of the day" />
			<Anecdotescomponent text={anecdotes[selected]} vote={vote[selected]} />

			<Button onClick={handleVote} text="vote" />
			<Button onClick={handleButton} text="next anecdote" />

			<Display text="Anecdote with most votes" />

			<Anecdotescomponent text={anecdotes[higherVote(vote)]} vote={vote[higherVote(vote)]} />
		</div>
	);
}

export default App;
