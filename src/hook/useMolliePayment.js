// useMollieCardPayment
import { useCallback } from 'react';

export default function useMolliePayment({ methodCode }) {
  console.log(methodCode);
  const placerOrderCallback = () => {
    window.location.assign('/google');
  };

  const placeOrder = useCallback(() => placerOrderCallback(), []);

  return {
    placeOrder,
  };
}
