import React, { useCallback } from "react";
import { ApplePayButton } from "react-apple-pay-button";
 
function ApplePay() {
  const onRequestApplePay = useCallback(() => /* TODO */ []);
  return (
    <ApplePayButton onClick={onRequestApplePay} theme="light">
      {"Subscribe with"}
    </ApplePayButton>
  );
}
 
export default ApplePay;
