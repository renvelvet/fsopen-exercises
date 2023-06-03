import React from 'react'
import ReactDOM from 'react-dom/client'
import { counterReducer } from './reducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer })

const Display = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ feedback }) => {
  const all = () => {
    const sumAll = Object.values(feedback).reduce((a, b) => a + b, 0)
    return sumAll
  }

  const average = (total) => {
    const average =
      total === 0 ? 0 : (feedback.good * 1 - feedback.bad * 1) / total
    return average
  }

  const positive = (total) => {
    const positive = feedback.good === 0 ? 0 : (feedback.good / total) * 100
    return Intl.NumberFormat('default', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(positive / 100)
  }

  if (all() === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={feedback.good} />
          <StatisticLine text="ok" value={feedback.ok} />
          <StatisticLine text="bad" value={feedback.bad} />
          <StatisticLine text="all" value={all()} />
          <StatisticLine text="average" value={average(all())} />
          <StatisticLine text="positive" value={positive(all())} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  return (
    <div>
      <Display text="give feedback" />
      <Button onClick={() => store.dispatch({ type: 'GOOD' })} text="good" />
      <Button onClick={() => store.dispatch({ type: 'OK' })} text="ok" />
      <Button onClick={() => store.dispatch({ type: 'BAD' })} text="bad" />
      <Button
        onClick={() => store.dispatch({ type: 'ZERO' })}
        text="reset stats"
      />
      <Display text="statistics" />
      <Statistics feedback={store.getState()} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(<App />)

renderApp()
store.subscribe(renderApp)
