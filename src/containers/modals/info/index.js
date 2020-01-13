import React, { memo, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import * as actions from '@store/actions';
import { Button } from '@components/elements';
import { LayoutModal } from '@components/layouts';

function Info() {
  const dispatch = useDispatch();

  const onCancel = useCallback(() => {
    dispatch(actions.modal.close(false));
  }, [dispatch]);

  const onSuccess = useCallback(() => {
    dispatch(actions.modal.close(true));
  }, [dispatch]);

  const footer = useMemo(() => <Button onClick={onSuccess}>Всё понятно</Button>, [onSuccess]);

  return (
    <LayoutModal onClose={onCancel} footer={footer}>
      Модальное окно
    </LayoutModal>
  );
}

export default memo(Info);
