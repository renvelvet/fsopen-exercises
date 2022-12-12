import { useState } from "react";

const Display = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ feedback }) => {
  const all = () => {
    const sumAll = Object.values(feedback).reduce((a, b) => a + b, 0);
    return sumAll;
  };

  const average = (total) => {
    const average =
      total === 0 ? 0 : (feedback.good * 1 - feedback.bad * 1) / total;
    return average;
  };

  const positive = (total) => {
    const positive = feedback.good === 0 ? 0 : (feedback.good / total) * 100;
    return Intl.NumberFormat("default", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(positive / 100);
  };

  if (all() === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={feedback.good} />
          <StatisticLine text="neutral" value={feedback.neutral} />
          <StatisticLine text="bad" value={feedback.bad} />
          <StatisticLine text="all" value={all()} />
          <StatisticLine text="average" value={average(all())} />
          <StatisticLine text="positive" value={positive(all())} />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGoodFeedback = () => {
    setGood(good + 1);
    setFeedback({ ...feedback, good: good + 1 });
    console.log(feedback);
  };

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1);
    setFeedback({ ...feedback, neutral: neutral + 1 });
    console.log(feedback);
  };

  const handleBadFeedback = () => {
    setBad(bad + 1);
    setFeedback({ ...feedback, bad: bad + 1 });
  };

  return (
    <div>
      <Display text="give feedback" />
      <Button onClick={handleGoodFeedback} text="good" />
      <Button onClick={handleNeutralFeedback} text="neutral" />
      <Button onClick={handleBadFeedback} text="bad" />
      <Display text="statistics" />
      <Statistics feedback={feedback} />
    </div>
  );
};

export default App;
