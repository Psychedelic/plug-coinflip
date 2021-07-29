import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/badge.css';
import shortPrincipal from '../utils/short-principal';
import {
  NavLink,
} from "react-router-dom";

const ConnectionBadge = ({ principalId }) => (
  <div className="connection-badge">
    <NavLink
      to={{
        pathname: "/auth",
      }}
    >Home</NavLink>
    <NavLink
      to={{
        pathname: "/leaderboard",
      }}
    >Leaderboard</NavLink>
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
