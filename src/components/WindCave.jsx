import React, { useEffect } from 'react';
import { shape, func } from 'prop-types';
import { get as _get } from 'lodash-es';
import { paymentMethodShape } from '../../../../utils/payment';
import useCheckoutFormContext from '../../../../hook/useCheckoutFormContext';
import usePaymentMethodFormContext from '../../../../components/paymentMethod/hooks/usePaymentMethodFormContext';
import usePaymentMethodCartContext from '../../../../components/paymentMethod/hooks/usePaymentMethodCartContext';

import RadioInput from '../../../../components/common/Form/RadioInput';
import useMolliePayment from '../hook/useMolliePayment';

function WindCave({ method, selected, actions }) {
  const methodCode = method.code;
  const isSelected = methodCode === selected.code;
  const { registerPaymentAction } = useCheckoutFormContext();
  const { placeOrder } = useMolliePayment({ methodCode });
  const { submitHandler } = usePaymentMethodFormContext();
  // registering custom "place order" action for the payment method
  // useEffect(() => {
  //   registerPaymentAction('windcave_pxpay2_iframe', paymentSubmitHandler);
  // }, [registerPaymentAction, paymentSubmitHandler]);

  const { methodList } = usePaymentMethodCartContext();

  useEffect(() => {
    registerPaymentAction(methodCode, placeOrder);
  }, [registerPaymentAction, methodCode, placeOrder]);

  const handlePaymentMethodSelection = async (event) => {
    const methodSelected = _get(methodList, `${event.target.value}.code`);
    await actions.change(event);
    console.log('yeeeha');
    console.log('submitcall');
    await submitHandler(methodSelected);
  };

  if (!isSelected) {
    return (
      <RadioInput
        value={method.code}
        label={method.title}
        name="paymentMethod"
        checked={isSelected}
        onChange={handlePaymentMethodSelection}
      />
    );
  }
  return (
    <div>
      <div>
        <RadioInput
          value={method.code}
          label={method.title}
          name="paymentMethod"
          checked={isSelected}
          onChange={handlePaymentMethodSelection}
        />
      </div>
    </div>
  );
}
WindCave.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};
export default WindCave;
