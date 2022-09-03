import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timezone: "",
      weather: "",
      trafficToWork: false,
      work: "",
    };

    this.completeSetup = this.completeSetup.bind(this);
  }

  completeSetup(e) {
    e.preventDefault();
    alert("Done!");
  }

  render() {
    return (
      <div className="container">
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
          <div className="w-100">
            <p align="justify">
              Use any of your leftover devices (tablets/2-in-1) or televisions
              as signage display for a clock widget dashboard.
            </p>
            <h2>Setup</h2>
            <hr />
            <form onSubmit={this.completeSetup}>
              <div className="row">
                <div className="col-md mb-3">
                  <select
                    className="form-select"
                    placeholder="Timezone"
                    value={this.state.timezone}
                    onChange={(e) =>
                      this.setState({ ...this.state, timezone: e.target.value })
                    }
                    required={true}
                  >
                    <option value="" disabled>
                      Select Timezone
                    </option>
                  </select>
                </div>
                <div className="col-md mb-3">
                  <select
                    className="form-select"
                    placeholder="Weather"
                    value={this.state.weather}
                    onChange={(e) =>
                      this.setState({ ...this.state, weather: e.target.value })
                    }
                    required={true}
                  >
                    <option value="" disabled>
                      Select Weather Location
                    </option>
                  </select>
                </div>
                <div className="col-12">
                  <div className="">
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="checkbox"
                        checked={this.state.trafficToWork}
                        onClick={() =>
                          this.setState({
                            ...this.state,
                            trafficToWork: !this.state.trafficToWork,
                          })
                        }
                      />
                      <label class="form-check-label" for="checkbox">
                        Show traffic data to work
                      </label>
                    </div>
                    <div className="w-100" style={{ marginTop: "10px" }}>
                      <input
                        type="link"
                        className="form-control"
                        placeholder="Enter Google Maps link of your workplace"
                        value={this.state.work}
                        onChange={(e) =>
                          this.setState({ ...this.state, work: e.target.value })
                        }
                        required={this.state.trafficToWork}
                        disabled={!this.state.trafficToWork}
                      />
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
    );
  }
}
