import React from "react";
import Form from "./Form.js";
import Result from "./Result.js";
import "./App.css";
const APIKey = "0c6e3f6176d2671fba28c518a4811850";
class App extends React.Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    err: false
  };

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  handleCitySearch = e => {
    e.preventDefault();
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

    fetch(API)
      .then(res => {
        if (res.ok) {
          return res;
        }
        throw Error("Nie udało się");
      })
      .then(res => res.json())
      .then(json => {
        const time = new Date().toLocaleString();
        this.setState(prevState => ({
          date: time,
          city: prevState.value,
          sunrise: json.sys.sunrise,
          sunset: json.sys.sunset,
          temp: json.main.temp,
          pressure: json.main.pressure,
          wind: json.wind.speed,
          err: false
        }));
      })
      .catch(err => {
        console.log(err);
        this.setState(prevState => ({
          err: true,
          city: prevState.value
        }));
      });
  };
  render() {
    return (
      <div className="App">
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleCitySearch}
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
