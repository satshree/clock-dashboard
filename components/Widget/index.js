import React, { Component } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { loadFromLocalStorage } from "../../localStorage";

import Clock from "./Clock";
import Weather from "./Weather";

const Widget = (props) => {
  const handle = useFullScreenHandle();

  // let timezone = loadFromLocalStorage("timezone");

  return (
    <>
      <div className="full-screen-btn">
        <div className="text-center">
          {/* Showing time for {timezone.label}
          <br />
          <br /> */}
          <div>
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={handle.enter}
            >
              Full Screen
            </button>
            <Link href="/">
              <button type="button" className="btn btn-outline-light ms-2">
                Setup
              </button>
            </Link>
          </div>
        </div>
      </div>
      <FullScreen handle={handle}>
        <div style={{ background: "#000" }} onClick={handle.exit}>
          <WidgetContainer />
        </div>
      </FullScreen>
    </>
  );
};

class WidgetContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: {
        show: false,
      },
      timezone: "",
      fullscreen: false,
    };
  }

  componentDidMount() {
    let weather = loadFromLocalStorage("weather");
    let timezone = loadFromLocalStorage("timezone");

    if (!timezone) {
      Router.push("/");
    } else {
      this.setState({ ...this.state, weather, timezone });
    }
  }

  render() {
    return (
      <>
        <Head>
          <title>Clock</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <div className="container">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh", flexDirection: "column" }}
          >
            <Clock timezone={this.state.timezone} />
            {this.state.weather.show ? (
              <Weather weather={this.state.weather} />
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

export default Widget;
