import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useShallowEqualSelector } from '@hooks';
import * as actions from '@store/actions';
import * as modals from './config.js';
import * as selectors from '@store/selectors';

function Modals({ history }) {
  const dispatch = useDispatch();
  const { modal = {} } = useShallowEqualSelector(selectors.getModal);

  const hideBodyOverflow = useCallback(() => {
    if (document.body.style.overflow !== 'hidden') {
      //document.body.style.overflow = 'hidden';
    }
  }, []);

  const resetBodyOverflow = useCallback(() => {
    if (document.body.style.overflow === 'hidden') {
      //document.body.style.overflow = '';
    }
  }, []);

  const getModal = useCallback(() => {
    const props = {
      ...modal.params,
      history,
      close: result => {
        dispatch(actions.modal.close(result));
      },
    };

    if (modal.show) {
      if (!(modal.params && modal.params.noOverflow)) {
        hideBodyOverflow();
      }
      if (modals[modal.name]) {
        const Component = modals[modal.name];
        return <Component {...props} />;
      }
    } else {
      resetBodyOverflow();
    }

    return null;
  }, [
    dispatch,
    hideBodyOverflow,
    history,
    modal.name,
    modal.params,
    modal.show,
    resetBodyOverflow,
  ]);

  return getModal();
}

Modals.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Modals;
