import React, { Component } from "react";
import $ from "jquery";

export default class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      main: "",
      description: "",
      icon: "",
      temp: "",
      feels_like: "",
      temp_min: "",
      temp_max: "",
      loaded: false,
      error: false,
    };

    this.unit = this.props.weather.unit === "metric" ? "°C" : "°F";
  }

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather",
      data: {
        lat: this.props.weather.location.lat,
        lon: this.props.weather.location.lon,
        units: this.props.weather.unit,
        appid: process.env.NEXT_PUBLIC_OPENWEATHER_API,
      },
      success: (resp) => {
        let {
          main,
          description,
          icon,
          temp,
          feels_like,
          temp_min,
          temp_max,
          loaded,
        } = this.state;

        main = resp.weather[0].main;
        description = resp.weather[0].description;
        icon = `http://openweathermap.org/img/wn/${resp.weather[0].icon}@2x.png`;

        temp = `${resp.main.temp}${this.unit}`;
        feels_like = `${resp.main.feels_like}${this.unit}`;
        temp_max = `${resp.main.temp_max}${this.unit}`;
        temp_min = `${resp.main.temp_min}${this.unit}`;

        loaded = true;
        this.setState({
          ...this.state,
          main,
          description,
          icon,
          temp,
          feels_like,
          temp_min,
          temp_max,
          loaded,
        });
      },
      error: (err) => {
        console.log(err);
        this.setState({ ...this.state, loaded: true, error: true });
      },
    });
  }

  render() {
    return (
      <div style={{ fontSize: "16px" }}>
        {this.state.error ? (
          <div>Unable to fetch weather. Try refreshing this page.</div>
        ) : this.state.loading ? (
          <small>Fetching weather ...</small>
        ) : (
          <>
            <div className="d-flex align-items-center justify-content-center w-100">
              <img src={this.state.icon} alt="weather" />
              <div>
                <h5>
                  {this.state.temp} | {this.state.main}
                </h5>
                {this.state.description}, feels like {this.state.feels_like}
                {/* <hr />
                Max: {this.state.temp_max} | Min: {this.state.temp_min} */}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
