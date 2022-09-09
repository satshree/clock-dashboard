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
      blink: true,
    };

    this.getTime = this.getTime.bind(this);
  }

  componentDidMount() {
    window.interval = setInterval(() => {
      let time = this.getTime();
      this.setState({ ...this.state, time, blink: !this.state.blink });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(window.interval);
  }

  getTime() {
    let { timezone } = this.props;

    let offset = timezone.split(" ")[0].replace("(UTC", "").replace(")", "");

    let time = moment().utcOffset(offset).format("h:mm:ss a");

    let timeSplit = time.split(" ");

    return {
      hour: timeSplit[0].split(":")[0],
      minute: timeSplit[0].split(":")[1],
      second: timeSplit[0].split(":")[2],
      ampm: timeSplit[1],
    };
  }

  ready = () => {
    let { time } = this.state;

    return time.hour && time.minute && time.second && time.ampm;
  };

  render() {
    return (
      <div className="clock">
        <div className="d-flex align-items-center w-100">
          {this.ready() ? (
            <>
              <div id="hour">{this.state.time.hour}</div>
              <div
                className="dotdot"
                style={{ color: this.state.blink ? "white" : "gray" }}
              >
                :
              </div>
              <div id="minute">{this.state.time.minute}</div>
              <div className="d-flex align-item-end ms-3 secondary">
                <div id="second">{this.state.time.second}</div>
                <div id="ampm" style={{ marginLeft: "1rem" }}>
                  {this.state.time.ampm}
                </div>
              </div>
            </>
          ) : (
            <div style={{ fontSize: "16px" }}>loading ...</div>
          )}
        </div>
      </div>
    );
  }
}
