import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as actions from '@store/actions';
import * as selectors from '@store/selectors';
import { useShallowEqualSelector } from '@hooks';
import LayoutHeader from '@components/layouts/layout-header';
import MenuTop from '@components/menus/menu-top';
import Button from '@components/elements/button';
import Logo from '@components/elements/logo';

const menuItems = [
  { title: 'Главная', to: '/', active: false },
  { title: 'О нас', to: '/about', active: false },
  { title: '404', to: '/some-page', active: false },
];

function HeaderContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { session } = useShallowEqualSelector(selectors.getSession);

  const buttonTheme = useMemo(() => ['clear-white', 'margins'], []);

  const onClickLogin = useCallback(() => {
    history.push('/login');
  }, [history]);

  const onClickLogout = useCallback(() => {
    dispatch(actions.session.clear());
  }, [dispatch]);

  const renderRight = () => {
    const buttons = [];

    if (session.exists) {
      buttons.push(
        <Button key={1} theme={buttonTheme} onClick={onClickLogout}>
          Выход
        </Button>,
      );
    } else {
      buttons.push(
        <Button key={1} theme={buttonTheme} onClick={onClickLogin}>
          Вход
        </Button>,
      );
    }
    return buttons;
  };

  return (
    <LayoutHeader left={<Logo />} right={renderRight()} center={<MenuTop items={menuItems} />} />
  );
}

HeaderContainer.propTypes = {};

export default HeaderContainer;
