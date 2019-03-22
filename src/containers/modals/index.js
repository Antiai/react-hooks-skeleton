import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '@store/actions';
import * as modals from './config.js';

function Modals({ dispatch, history, modal }) {
  function getModal() {
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
  }

  function hideBodyOverflow() {
    if (document.body.style.overflow !== 'hidden') {
      //document.body.style.overflow = 'hidden';
    }
  }

  function resetBodyOverflow() {
    if (document.body.style.overflow === 'hidden') {
      //document.body.style.overflow = '';
    }
  }

  return getModal();
}

Modals.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
};

export default connect(state => ({
  modal: state.modal,
}))(Modals);
