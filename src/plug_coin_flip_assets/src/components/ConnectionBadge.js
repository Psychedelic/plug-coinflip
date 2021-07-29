import React from 'react';
import PropTypes from 'prop-types';

import shortPrincipal from '../utils/short-principal';

const ConnectionBadge = ({ principalId }) => (
  <div className="connection-badge">
    <span>Leaderboard</span>
    <div className={`principal-badge ${!principalId.length && 'not-connected'}`}>
      <div className="connection-dot" />
      {
        principalId.length ? shortPrincipal(principalId) : 'Not Connected'
      }
    </div>
  </div>
)

ConnectionBadge.defaultProps = {
  principalId: '',
};

ConnectionBadge.propTypes = {
  principalId: PropTypes.string,
};

export default ConnectionBadge;
