import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { noop, themes } from '@utils';

import './style.less';

function Input(props) {
  const {
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    type,
    placeholder,
    required,
    focused,
    value,
    name,
    theme,
    disabled,
    tabIndex,
    autocomplete,
  } = props;

  const onChange = useCallback(event => handleChange(event), [handleChange]);

  const onFocus = useCallback(event => handleFocus(event), [handleFocus]);

  const onBlur = useCallback(() => handleBlur(), [handleBlur]);

  return (
    <div className={cn('Input', themes('Input', theme))}>
      <input
        className="Input__input"
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        tabIndex={tabIndex}
        disabled={disabled}
        required={required}
        autoFocus={focused}
        autoComplete={autocomplete ? 'on' : 'off'}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}

Input.propTypes = {
  value: PropTypes.node.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  autocomplete: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

Input.defaultProps = {
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  disabled: false,
  type: 'text',
};

export default memo(Input);
