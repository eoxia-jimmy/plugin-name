import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fetchWP from '../utils/fetchWP';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      err: undefined
    };

    this.fetchWP = new fetchWP({
      restURL: this.props.wpObject.api_url,
      dolApiKey: '1r6CmRpGb0t7rm8NG0qG9tmSX5vH5EN2'
    });

    this.getSetting();
  }

  getSetting = () => {
    this.fetchWP.get( 'products' )
    .then(
      (json) => this.setState({
        items: json
      }),
      (err) => this.setState({
        err: err
      })
    );
  };

  render() {
    const { items, err } = this.state;

    if (err) {
        return (
          <p>{err.error.message}</p>
        );
    } else if (items.length == 0) {
      return (
        <p>No product found</p>
      );
    } else {
      return (
        <div className="wrap tm-wrap">
          {items.map((item, key) => (
              <div className="table-row">
                <div className="table-cell">
                  <div className="table-cell-container project-title">
                    {item.title.rendered}
                  </div>
                </div>
              </div>
            ))}
        </div>
      );
    }
  }
}

Admin.propTypes = {
  wpObject: PropTypes.object
};
