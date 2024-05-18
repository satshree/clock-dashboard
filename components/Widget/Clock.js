import React, { Component } from "react";
import moment from "moment";

export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: {
        hour: "",
        minute: "",
        second: "",
        ampm: "",
      },
      date: moment(new Date()).format("MMMM Do YYYY"),
      blink: true,
    };

    this.getTime = this.getTime.bind(this);
  }

  componentDidMount() {
    window.interval = setInterval(() => {
      const time = this.getTime();
      this.setState({ ...this.state, time, blink: !this.state.blink });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(window.interval);
  }

  getTime() {
    const { timezone } = this.props;

    // let offset = timezone.split(" ")[0].replace("(UTC", "").replace(")", "");

    // let time = moment().utcOffset(timezone.value).format("h:mm:ss a");

    // let timeSplit = time.split(" ");

    const date = new Date();
    const dateUTC = new Date(
      date.toLocaleString("en-US", { timeZone: timezone.label })
    );

    const hour = dateUTC.getHours();

    return {
      hour: hour > 12 ? hour - 12 : hour,
      minute: String(dateUTC.getMinutes()).padStart(2, "0"),
      second: String(dateUTC.getSeconds()).padStart(2, "0"),
      ampm: hour > 11 ? "PM" : "AM",
    };
  }

  ready = () => {
    const { time } = this.state;

    return time.hour && time.minute && time.second && time.ampm;
  };

  render() {
    return (
      <div className="clock">
        <div className="d-flex align-items-center w-100">
          {this.ready() ? (
            <>
              <div className="d-flex align-items-center justify-content-center w-100">
                <div id="hour">{this.state.time.hour}</div>
                <div
                  className="dotdot"
                  style={{ color: this.state.blink ? "white" : "gray" }}
                >
                  :
                </div>
                <div id="minute">{this.state.time.minute}</div>
                <div className="d-flex align-items-center ms-3 secondary">
                  <div id="second">{this.state.time.second}</div>
                  <div id="ampm">{this.state.time.ampm}</div>
                </div>
              </div>
            </>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center w-100"
              style={{ fontSize: "16px", padding: "2rem" }}
            >
              Loading ...
            </div>
          )}
        </div>
        <div className="text-center" style={{ fontSize: "20px" }}>
          {this.state.date}
        </div>
      </div>
    );
  }
}
