import React from "react";
import GooglePayButton from "@google-pay/button-react";
import { cartPaymentAction } from "../../../../../services/cart/cart.service";

function GooglePay({ cartPaymentInfo, store, style }) {
  const { currency, country_id } = store;
  const payWithGoogle = async (type) => {
    const res = await cartPaymentAction(type, "checkoutcom_google_pay");
    console.log(res)
  };
  return (
    <section className={style.gPay}>
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "12345678901234567890", // merchand id
            merchantName: "Demo Merchant",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: parseFloat(
              cartPaymentInfo?.total_segments?.find(
                (e) => e.code === "grand_total"
              )?.value
            ).toFixed(2),
            currencyCode: currency,
            countryCode: country_id,
          },
        }}
        onLoadPaymentData={(paymentRequest) => {
          payWithGoogle(paymentRequest);
        }}
      />
    </section>
  );
}

export default GooglePay;
