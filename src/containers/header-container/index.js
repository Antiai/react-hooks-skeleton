import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from '@store/actions';
import { detectActive } from '@utils';
import LayoutHeader from '@components/layouts/layout-header';
import MenuTop from '@components/menus/menu-top';
import Button from '@components/elements/button';
import Logo from '@components/elements/logo';

function HeaderContainer(props) {
  const { location, history, dispatch, session } = props;

  const [items, setState] = useState(
    detectActive(
      [
        { title: 'Главная', to: '/', active: false },
        { title: 'О нас', to: '/about', active: false },
        { title: '404', to: '/some-page', active: false },
      ],
      location,
    ),
  );

  useEffect(() => {
    setState(detectActive(items, location));
  }, [items, location]);

  const onClickLogin = () => {
    history.push('/login');
  };

  const onClickLogout = () => {
    dispatch(actions.session.clear());
  };

  const renderRight = () => {
    const buttons = [];

    if (session.exists) {
      buttons.push(
        <Button key={1} theme={['clear-white', 'margins']} onClick={onClickLogout}>
          Выход
        </Button>,
      );
    } else {
      buttons.push(
        <Button key={1} theme={['clear-white', 'margins']} onClick={onClickLogin}>
          Вход
        </Button>,
      );
    }
    return buttons;
  };

  return <LayoutHeader left={<Logo />} right={renderRight()} center={<MenuTop items={items} />} />;
}

HeaderContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  connect(state => ({
    session: state.session,
  })),
)(HeaderContainer);
