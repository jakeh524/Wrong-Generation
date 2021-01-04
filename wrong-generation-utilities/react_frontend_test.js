import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';


class DateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: "",
      day: "",
      year: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value; 

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    let submitted_date = this.state.year + "-" + this.state.month + "-" + this.state.day;
    alert('Your entered date is:' + submitted_date);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter the date:
          <select name='month' value={this.state.month} onChange={this.handleInputChange}>
            <option value="">Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <input 
            name="day"
            type="number"
            placeholder="Day"
            min="1"
            max="31"
            value={this.state.day}
            onChange={this.handleInputChange} />
          <input
            name="year"
            type="number"
            placeholder="Year"
            min="1962"
            max="2019"
            value={this.state.year}
            onChange={this.handleInputChange} />



        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <DateForm />,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
