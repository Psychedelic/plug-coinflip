import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
  useLocation,
} from "react-router-dom";
import shortPrincipal from '../utils/short-principal';
import '../../assets/badge.css';

const ConnectionBadge = ({ principalId }) => {
  const { pathname } = useLocation();

  return (
    <div className="connection-badge">
      { pathname === '/leaderboard' ? (
        <NavLink
          className="nav-link"
          to={{
            pathname: "/pick",
          }}
        >
          Home
        </NavLink>
        ) : (
        <NavLink
          className="nav-link"
          to={{
            pathname: "/leaderboard",
          }}
        >
          Leaderboard
        </NavLink>
      )}
      <div className={`principal-badge ${!principalId.length && 'not-connected'}`}>
        <div className="connection-dot" />
        {
          principalId.length ? shortPrincipal(principalId) : 'Not Connected'
        }
      </div>
    </div>
  );
}

ConnectionBadge.defaultProps = {
  principalId: '',
};

ConnectionBadge.propTypes = {
  principalId: PropTypes.string,
};

export default ConnectionBadge;
