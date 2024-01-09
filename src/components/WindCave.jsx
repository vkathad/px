import React, { useCallback, useEffect } from 'react';
import { shape, func } from 'prop-types';
import { paymentMethodShape } from '../../../../utils/payment';
import RadioInput from '../../../../components/common/Form/RadioInput';
import usePerformPlaceOrder from '../hooks/usePerformPlaceOrder';
import usePayOneCheckoutFormContext from '../hooks/usePayOneCheckoutFormContext';
import Card from '../../../../components/common/Card';

function WindCave({ method, selected, actions }) {
  const { registerPaymentAction } = usePayOneCheckoutFormContext();
  const isSelected = method.code === selected.code;
  const performPlaceOrder = usePerformPlaceOrder(method.code);
  const placeOrderWithPayPal = useCallback(
    (values) => performPlaceOrder(values),
    [performPlaceOrder]
  );

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithPayPal);
  }, [method, registerPaymentAction, placeOrderWithPayPal]);

  if (!isSelected) {
    return (
      <RadioInput
        value={method.code}
        label={method.title}
        name="paymentMethod"
        checked={isSelected}
        onChange={actions.change}
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
          onChange={actions.change}
        />
        <div className="mx-4 my-4">
          <Card bg="darker">
            <div className="container flex flex-col justify-center w-4/5">
              <div>test</div>
            </div>
          </Card>
        </div>
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
