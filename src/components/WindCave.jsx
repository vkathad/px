import React, { useEffect, useCallback } from 'react';
import useCheckoutFormContext from '../../../../hook/useCheckoutFormContext';

function WindCave() {
  const { registerPaymentAction } = useCheckoutFormContext();
  // custom "place order" submit action
  const paymentSubmitHandler = useCallback(async (values) => {
    console.log({ values });
    console.log('yeeeha');
  }, []);

  // registering custom "place order" action for the payment method
  useEffect(() => {
    registerPaymentAction('windcave_pxpay2_iframe', paymentSubmitHandler);
  }, [registerPaymentAction, paymentSubmitHandler]);

  return <h1>Hello</h1>;
}
export default WindCave;
