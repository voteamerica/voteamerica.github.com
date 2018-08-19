import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getDriversList, hideDriversList } from '../actions/index.js';

const mapStateToProps = state => {
  const { apiInfo, loginInfo, driversInfo } = state;

  return { apiInfo, loginInfo, driversInfo };
};

const mapDispatchToProps = { getDriversList, hideDriversList };

class DriverBase extends Component {
  handleGetDriversListClick(self) {
    return () => {
      const { apiInfo, getDriversList, loginInfo } = self.props;
      const token = loginInfo.token || '';

      return getDriversList(apiInfo.apiUrl, token);
    };
  }

  handleHideDriversListClick(self) {
    return () => {
      const { hideDriversList } = self.props;

      return hideDriversList();
    };
  }

  render() {
    const { driversInfo } = this.props;

    const showDriver = driver => {
      return <li key={driver.UUID}>{driver.username}</li>;
    };

    const driversList = (
      <ul>
        {driversInfo.drivers
          ? driversInfo.drivers.map(driver => showDriver(driver))
          : false}
      </ul>
    );

    return (
      <div>
        <div>Driver Info</div>
        <div>
          <a href="{{ api }}/users/list">users list</a>

          {driversInfo.showDriversList === false ? (
            <button
              className="button button--large"
              id="driverGetUsersList"
              onClick={this.handleGetDriversListClick(this)}
            >
              Show List
            </button>
          ) : (
            <div>
              <button
                className="button button--large"
                id="driverGetUsersList"
                onClick={this.handleHideDriversListClick(this)}
              >
                Hide List
              </button>
              {driversList}
            </div>
          )}
        </div>
      </div>
    );
  }
}

//                     <li>{driver.username}</li>

const Driver = connect(
  mapStateToProps,
  mapDispatchToProps
)(DriverBase);

export default Driver;