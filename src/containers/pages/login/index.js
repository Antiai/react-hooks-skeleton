import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LayoutPage } from '@components/layouts';
import LayoutContent from '@components/layouts/layout-content';
import HeaderContainer from '@containers/header-container';
import FormLogin from '@components/forms/form-login';
import * as actions from '@store/actions';

function Login(props) {
  const { dispatch, history, formLogin } = props;

  const onChangeForm = data => {
    dispatch(actions.formLogin.change(data));
  };

  const onSubmitForm = data => {
    dispatch(actions.formLogin.submit(data)).then(() => {
      history.replace('/main');
    });
  };

  return (
    <LayoutPage header={<HeaderContainer />}>
      <LayoutContent>
        <div>
          <h1>Login page</h1>
          <FormLogin
            data={formLogin.data}
            errors={formLogin.errors}
            wait={formLogin.wait}
            onChange={onChangeForm}
            onSubmit={onSubmitForm}
          />
        </div>
      </LayoutContent>
    </LayoutPage>
  );
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  formLogin: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({
  formLogin: state.formLogin,
  session: state.session,
}))(Login);
