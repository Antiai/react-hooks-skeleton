import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { themes, noop } from '@utils';
import LayoutField from '@components/layouts/layout-field';
import { Input, Error, Button } from '@components/elements';

import './style.less';

function FormLogin(props) {
  const { data, onChange: handleChange, onSubmit: handleSubmit, errors, wait, theme } = props;

  const onChange = useCallback(
    event => {
      const {
        target: { value, name },
      } = event;
      handleChange({ ...data, [name]: value });
    },
    [data, handleChange],
  );

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      handleSubmit({ ...data });
    },
    [data, handleSubmit],
  );

  return (
    <form className={cn(`FormLogin`, themes('FormLogin', theme))} onSubmit={onSubmit}>
      <LayoutField
        label={'Логин'}
        input={<Input type="text" name="login" value={data.login} onChange={onChange} />}
        error={<Error errors={errors} path={'login'} />}
      />
      <LayoutField
        label={'Пароль'}
        input={<Input type="password" name="password" value={data.password} onChange={onChange} />}
        error={<Error errors={errors} path={'password'} />}
      />
      <LayoutField
        input={
          <Button type="submit" disabled={wait}>
            Войти{wait && '...'}
          </Button>
        }
        error={<Error errors={errors} path={''} />}
      />
    </form>
  );
}

FormLogin.propTypes = {
  data: PropTypes.shape({
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.any,
  wait: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

FormLogin.defaultProps = {
  theme: ['default'],
  errors: {},
  onChange: noop,
  onSubmit: noop,
};

export default memo(FormLogin);
