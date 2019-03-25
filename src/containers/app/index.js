import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from '@containers/private-route';
import * as actions from '@store/actions';

import '@theme/style.less';

import { Home, About, Main, Login, NotFound } from '../pages';
import Modals from '../modals';

const history = createBrowserHistory();

function App(props) {
  const { dispatch, session } = props;

  useEffect(() => {
    dispatch(actions.session.remind());
  });

  // If checking token
  if (session.wait) {
    return <Fragment>Загрузка...</Fragment>;
  }

  return (
    <Fragment>
      <Router history={history}>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/main" component={Main} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <Modals history={history} />
    </Fragment>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
};

export default connect(state => ({
  session: state.session,
}))(App);
