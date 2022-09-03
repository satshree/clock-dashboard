import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timezone: "",
    };
  }

  render() {
    return (
      <div className="container">
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
          <div className="w-100">
            <h2>Setup</h2>
            <hr />
            <div>
              <select
                className="form-select"
                placeholder="Timezone"
                value={this.state.timezone}
                onChange={(e) =>
                  this.setState({ ...this.state, timezone: e.target.value })
                }
              >
                <option value="" disabled>
                  Select Timezone
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
