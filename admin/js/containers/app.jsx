import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fetchWP from '../utils/fetchWP';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };

    this.fetchWP = new fetchWP({
      restURL: this.props.wpObject.api_url,
      restNonce: this.props.wpObject.api_nonce,
    });

    this.getSetting();
  }

  getSetting = () => {
    this.fetchWP.get( 'wp/v2/wpeo-task' )
    .then(
      (json) => this.setState({
        items: json
      }),
      (err) => console.log( 'error', err )
    );
  };

  render() {
    const { items } = this.state;
    return (
      <div className="wrap tm-wrap">
        <div className="wpeo-table table-flex table-projects">
        	<div className="table-row table-header">
    				<div className="table-cell">
    					<span>
    						<i className="fas fa-thumbtack"></i>
    					</span>
    				</div>
    				<div className="table-cell">
    					<span>
    						Project Name
    					</span>
    				</div>
        	</div>

          {items.map((item, key) => (
            <div className="table-row">
              <div className="table-cell">
                <div class="table-cell-container project-title">
                  {item.title.rendered}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    );
  }
}

Admin.propTypes = {
  wpObject: PropTypes.object
};
