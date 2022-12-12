import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const DisplayAnecdote = ({ anecdotes, selectedNumber }) => {
  return <p>{anecdotes[selectedNumber]}</p>;
};

const DisplayVote = ({ points, selected }) => {
  return <p>has {points[selected]} votes</p>;
};

const App = () => {
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
  const [points, setPoints] = useState(
    [...Array(anecdotes.length)].map((x) => 0)
  );
  const [max, setMax] = useState(0);

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;

    const max = Math.max(...copy);
    const index = copy.indexOf(max);
    setMax(index);
    setPoints(copy);
  };

  const handleClick = () => {
    let random = Math.floor(Math.random() * anecdotes.length);

    while (random === selected) {
      random = Math.floor(Math.random() * anecdotes.length);
    }

    setSelected(random);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote anecdotes={anecdotes} selectedNumber={selected} />
      <DisplayVote points={points} selected={selected} />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleClick} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote anecdotes={anecdotes} selectedNumber={max} />
      <DisplayVote points={points} selected={max} />
    </div>
  );
};

export default App;
