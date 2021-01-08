import React from 'react';

const InputForm = ({ searchChart, newDay, newMonth, newYear, length, handleDayChange, handleMonthChange, handleYearChange, handleLengthChange }) => {
    return(
      <form onSubmit={searchChart}>
        <div>
          <div class='inputFieldStyle'>
            Date:
            <input
              class='shortInputFieldStyle'
              value={newMonth}
              onChange={handleMonthChange}
              placeholder='mm'
            /> 
            -
            <input
              class='shortInputFieldStyle'
              value={newDay}
              onChange={handleDayChange}
              placeholder='dd'
            />
            - 
            <input
              class='yearInputFieldStyle'
              value={newYear}
              onChange={handleYearChange}
              placeholder='yyyy'
            />
            Top Songs:
            <input
              class='lengthInputFieldStyle'
              value={length}
              onChange={handleLengthChange}
              placeholder='1-100'
            />
            <div>
              <button class='searchButton' type="submit">Get Chart</button>
            </div>
            
          </div>
        </div>
      </form>
    )
}

export default InputForm;