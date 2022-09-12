import React, { Component } from "react";
import Head from "next/head";
import Router from "next/router";
import $ from "jquery";
import Select from "react-select";

import { saveToLocalStorage, loadFromLocalStorage } from "../../localStorage";

// import timezones from "../../timezones.json";
import namedTimezones from "../../namedTimezones.json";

export default class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timezone: "",
      weather: "",
      showWeather: true,
      weatherUnit: "metric",
      weatherLocation: {
        progress: false,
        lat: "",
        lon: "",
        text: "",
      },
    };

    this.completeSetup = this.completeSetup.bind(this);
    this.setWeatherLocation = this.setWeatherLocation.bind(this);
  }

  componentDidMount() {
    let weather = loadFromLocalStorage("weather");
    let timezone = loadFromLocalStorage("timezone");

    if (weather && timezone) {
      this.setState({
        ...this.state,
        showWeather: weather.show,
        weather: weather.location.text,
        weatherLocation: weather.location,
        weatherUnit: weather.unit,
        timezone,
      });
    }
  }

  setWeatherLocation(e) {
    let city = e.target.value;
    let { weatherLocation } = this.state;
    weatherLocation.progress = true;

    if (city === "") {
      weatherLocation.text = "";
    } else {
      weatherLocation.text = "Cannot find city";
    }

    weatherLocation.lat = "";
    weatherLocation.lon = "";
    this.setState({ ...this.state, weather: city, weatherLocation });

    if (city) {
      $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/geo/1.0/direct",
        data: {
          q: city,
          appid: process.env.NEXT_PUBLIC_OPENWEATHER_API,
        },
        success: (resp) => {
          weatherLocation.progress = false;
          // console.log(resp);

          if (resp[0]) {
            let text = "";
            resp[0].state
              ? (text = `${resp[0].name} (${resp[0].country}/${resp[0].state})`)
              : (text = `${resp[0].name} (${resp[0].country})`);
            weatherLocation.text = text;
            weatherLocation.lat = resp[0].lat;
            weatherLocation.lon = resp[0].lon;
          }

          this.setState({
            ...this.state,
            weatherLocation,
          });
        },
        error: (err) => {
          // console.log(err);

          weatherLocation.progress = false;
          this.setState({
            ...this.state,
            weatherLocation,
          });
        },
      });
    } else {
      weatherLocation.progress = false;
      this.setState({ ...this.state, weather: city, weatherLocation });
    }
  }

  completeSetup(e) {
    e.preventDefault();

    if (
      (this.state.weatherLocation.text === "" ||
        this.state.weatherLocation.text === "Cannot find city") &&
      this.state.showWeather
    ) {
      alert("Select proper city name for weather!");
    } else {
      saveToLocalStorage("weather", {
        show: this.state.showWeather,
        location: this.state.weatherLocation,
        unit: this.state.weatherUnit,
      });

      saveToLocalStorage("timezone", this.state.timezone);

      Router.push("/dashboard");
    }
  }

  getTimezones = () =>
    namedTimezones
      .filter((timezone) => timezone.utc !== "UTC")
      .map((timezone) => ({ value: timezone.utc, label: timezone.timezone }));

  render() {
    return (
      <>
        <Head>
          <title>Clock Dashboard</title>
        </Head>
        <div className="container">
          <div
            className="d-flex align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="w-100">
              <span style={{ textAlign: "justify" }}>
                Use any of your leftover devices (tablets/2-in-1) or televisions
                as signage display for a clock widget dashboard.
              </span>
              <br />
              <br />
              <h2>Setup</h2>
              <hr />
              <form onSubmit={this.completeSetup}>
                <div className="row">
                  <div className="col-md mb-3">
                    <div className="setup-card">
                      <h4>Clock</h4>
                      <hr />
                      <Select
                        instanceId={"timezone-select"}
                        value={this.state.timezone}
                        onChange={(timezone) =>
                          this.setState({
                            ...this.state,
                            timezone,
                          })
                        }
                        options={this.getTimezones()}
                        placeholder="Select Timezone"
                        noOptionsMessage={() =>
                          "Try searching for continent/country or nearby city"
                        }
                        isSearchable
                      />
                    </div>
                  </div>
                  <div className="col-md mb-3">
                    <div className="setup-card">
                      <h4>Weather</h4>
                      <hr />
                      <div className="d-flex align-items-center">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="checkbox"
                            checked={this.state.showWeather}
                            onChange={() =>
                              this.setState({
                                ...this.state,
                                showWeather: !this.state.showWeather,
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkbox"
                          >
                            Show
                          </label>
                        </div>
                        <div className="w-100 ms-2">
                          <div
                            className="input-group"
                            style={{
                              marginBottom: this.state.weather ? "0.25rem" : 0,
                            }}
                          >
                            <input
                              className="form-control"
                              placeholder="Enter City Name"
                              value={this.state.weather}
                              onChange={this.setWeatherLocation}
                              required={this.state.showWeather}
                              disabled={!this.state.showWeather}
                              style={{ width: "60%" }}
                            />
                            <select
                              className="form-select"
                              placeholder="Unit"
                              value={this.state.weatherUnit}
                              onChange={(e) =>
                                this.setState({
                                  ...this.state,
                                  weatherUnit: e.target.value,
                                })
                              }
                              required={this.state.showWeather}
                              disabled={!this.state.showWeather}
                            >
                              <option value="" disabled>
                                Select Weather Unit
                              </option>
                              <option value="metric">Metric (Celsius)</option>
                              <option value="imperial">
                                Imperial (Fahrenheit)
                              </option>
                            </select>
                          </div>
                          {this.state.weatherLocation.text ? (
                            <span>
                              {this.state.weatherLocation.progress ? (
                                <div className="d-flex align-items-center">
                                  <div
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                  >
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </div>
                                  Fetching location data...
                                </div>
                              ) : (
                                <span>
                                  {this.state.weatherLocation.text}{" "}
                                  {this.state.weatherLocation.text ===
                                  "Cannot find city" ? (
                                    <i className="fa fa-times-circle text-danger"></i>
                                  ) : (
                                    <i className="fa fa-check-circle text-success"></i>
                                  )}
                                </span>
                              )}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="text-center">
                  <button type="submit" className="btn btn-outline-light">
                    Complete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
