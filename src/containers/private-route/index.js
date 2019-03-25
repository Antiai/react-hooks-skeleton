/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props) {
  const { session, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props =>
        session.user && session.user._id ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  session: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
};

export default connect(state => ({
  session: state.session,
}))(PrivateRoute);
