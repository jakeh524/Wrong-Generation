import React, { useState } from 'react'
import InputForm from './components/InputForm'
import Entries from './components/Entries'
import chartService from './services/charts'

const App = () => {
  const [ chartEntries, setChartEntries ] = useState([])
  const [ chartDate, setChartDate ] = useState('')
  const [ newDay, setNewDay ] = useState('');
  const [ newMonth, setNewMonth ] = useState('');
  const [ newYear, setNewYear ] = useState('');
  const [ length, setLength ] = useState('');

  const handleDayChange = (event) => {
    setNewDay(event.target.value);
  }
  const handleMonthChange = (event) => {
    setNewMonth(event.target.value);
  }
  const handleYearChange = (event) => {
    setNewYear(event.target.value);
  }
  const handleLengthChange = (event) => {
    setLength(event.target.value);
  }

  const getNextDayOfWeek = (date, dayOfWeek) => {
    let resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    const month = (resultDate.getUTCMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    const day = (resultDate.getUTCDate() - 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    const year = String(resultDate.getUTCFullYear());
    const formattedDateString = year + '-' + month + '-' + day;
    return formattedDateString;
  }

  const searchChart = (event) => {
    event.preventDefault();
    const formattedMonth = (Number(newMonth)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    const formattedDay = (Number(newDay)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    const formattedInputDate = new Date(`${newYear}-${formattedMonth}-${formattedDay}`);
    const nextChartDate = getNextDayOfWeek(formattedInputDate, 6);
    
    chartService
      .getChart(nextChartDate)
      .then(returnedChart => {
        setChartDate(returnedChart[0].date)
        const filteredEntries = returnedChart[0].entries.filter(entry => entry.position <= length);
        setChartEntries(filteredEntries)
      })
  }


  return(
    <div>
      <h1>Wrong Generation</h1>

      <InputForm 
        searchChart={searchChart} 
        newDay={newDay} newMonth={newMonth} newYear={newYear} length={length} 
        handleDayChange={handleDayChange} handleMonthChange={handleMonthChange} handleYearChange={handleYearChange} handleLengthChange={handleLengthChange} 
      />

      <Entries
        chartDate={chartDate}
        chartEntries={chartEntries}
      />

      
    
    </div>
  );
}

export default App;