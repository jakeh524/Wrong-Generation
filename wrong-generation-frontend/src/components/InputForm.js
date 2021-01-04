import React from 'react';

const InputForm = ({ searchChart, newDay, newMonth, newYear, length, handleDayChange, handleMonthChange, handleYearChange, handleLengthChange }) => {
    return(
        <form onSubmit={searchChart}>
        <div>
          Day: <input
            value={newDay}
            onChange={handleDayChange}
            placeholder='dd'
          />
        </div>
        <div>
          Month: <input
            value={newMonth}
            onChange={handleMonthChange}
            placeholder='mm'
          />
        </div>
        <div>
          Year: <input
            value={newYear}
            onChange={handleYearChange}
            placeholder='yyyy'
          />
        </div>
        <div>
          Length: <input
            value={length}
            onChange={handleLengthChange}
            placeholder='1-100'
          />
        </div>
        <div>
          <button type="submit">search</button>
        </div>
      </form>
    )
}

export default InputForm;