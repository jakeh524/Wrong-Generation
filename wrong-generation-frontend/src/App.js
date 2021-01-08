import React, { useState } from 'react'
import InputForm from './components/InputForm'
import Entries from './components/Entries'
import Notification from './components/Notification'
import chartService from './services/charts'
import Footer from './components/Footer'

const appStyle = {
  margin: '0 auto',
  width: '60%',
  textAlign: 'center',
  paddingBottom: '30px',
}

const aboutStyle = {
  fontSize: '16px',
  margin: '0 auto',
  paddingBottom: '20px',
}

const headerStyle = {
  fontSize: '42px',
}

const App = () => {
  const [ chartEntries, setChartEntries ] = useState([])
  const [ chartDate, setChartDate ] = useState('')
  const [ newDay, setNewDay ] = useState('');
  const [ newMonth, setNewMonth ] = useState('');
  const [ newYear, setNewYear ] = useState('');
  const [ length, setLength ] = useState('');
  const [ message, setMessage ] = useState(null);

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

  const isValidDate = (day, month, year) => {
    day = Number(day);
    month = Number(month) - 1;
    year = Number(year);
    let date = new Date(year, month, day);

    if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) {
      return true;
    }
    return false;
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
    setMessage('')

    if (isValidDate(newDay, newMonth, newYear) === false) {
      setMessage('Please enter a valid date.');
      setChartEntries([]);
      setChartDate('');
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    else if (length < 1 || length > 100) {
      setMessage('Please choose a length that is between 1 and 100');
      setChartEntries([]);
      setChartDate('');
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    else if (isValidDate(newDay, newMonth, newYear) === false) {
      setMessage('Please enter a valid date.');
      setChartEntries([]);
      setChartDate('');
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    else {
      const formattedMonth = (Number(newMonth)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
      const formattedDay = (Number(newDay)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
      const inputDateString = `${newYear}-${formattedMonth}-${formattedDay}`;
      const formattedInputDate = new Date(inputDateString);
      const displayDate = `${formattedInputDate.toLocaleDateString('default', {month: 'long'})} ${formattedDay}, ${newYear}`
      const nextChartDate = getNextDayOfWeek(formattedInputDate, 6);

      chartService
      .getChart(nextChartDate, length)
      .then(returnedChart => {
        setChartDate(displayDate)
        const filteredEntries = returnedChart.filter(entry => entry.position <= length);
        setChartEntries(filteredEntries)
      })
      .catch(error => {
        setMessage('That date is not in our system. Our data goes back to 1962.');
        setChartEntries([]);
        setChartDate('');
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
    

  }


  return(
    <div class='content'>
      <div style={appStyle}>
        <h1 style={headerStyle}>Wrong Generation</h1>

        <div style={aboutStyle}>
          Do you think the music of today sucks? Was music better when you were born? Maybe you were born in the wrong generation! This app lets you look up the songs charting on the Billboard Hot 100 during any week in history (or at least the last 50 years or so). Find out what songs were trending on your birthday. Or during that important historical moment. Or maybe even when your parents met. ;)
        </div>

        <InputForm 
          searchChart={searchChart} 
          newDay={newDay} newMonth={newMonth} newYear={newYear} length={length} 
          handleDayChange={handleDayChange} handleMonthChange={handleMonthChange} handleYearChange={handleYearChange} handleLengthChange={handleLengthChange} 
        />

        <Notification message={message} />

        <Entries
          chartDate={chartDate}
          chartEntries={chartEntries}
        />

      </div>
      <Footer class='footer' />
    </div>
  );
}

export default App;