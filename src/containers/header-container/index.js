import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import * as actions from '@store/actions';
import * as selectors from '@store/selectors';
import { detectActive } from '@utils';
import { useShallowEqualSelector } from '@hooks';
import LayoutHeader from '@components/layouts/layout-header';
import MenuTop from '@components/menus/menu-top';
import Button from '@components/elements/button';
import Logo from '@components/elements/logo';

function HeaderContainer() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { session } = useShallowEqualSelector(selectors.getSession);

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
  }, [location]);

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

HeaderContainer.propTypes = {};

export default HeaderContainer;
