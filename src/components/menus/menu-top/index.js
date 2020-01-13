import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './style.less';

function MenuTop(props) {
  const { items } = props;

  const menuItems = useMemo(
    () =>
      items.map((item, index) => (
        <li key={index} className="MenuTop__item">
          <NavLink
            to={item.to}
            className="MenuTop__link"
            activeClassName="MenuTop__link_active"
            exact
          >
            {item.title}
          </NavLink>
        </li>
      )),
    [items],
  );

  return (
    <div className="MenuTop">
      <ul className="MenuTop__list">{menuItems}</ul>
    </div>
  );
}

MenuTop.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      to: PropTypes.string,
      active: PropTypes.bool,
    }),
  ).isRequired,

  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default MenuTop;
