import React from "react";
import GooglePayButton from "@google-pay/button-react";
import { cartPaymentAction } from "../../../../../services/cart/cart.service";

function GooglePay({ cartPaymentInfo, store, styles, gPayData }) {
  const { currency, country_id } = store;
  const payWithGoogle = async (type) => {
    console.log({ type });
    const res = await cartPaymentAction(type, "checkoutcom_google_pay");
    console.log(res);
  };
  return (
    <section className={styles.gPay}>
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: [
                  "AMEX",
                  "DISCOVER",
                  "INTERAC",
                  "JCB",
                  "MASTERCARD",
                  "VISA",
                ],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "checkoutltd",
                  gatewayMerchantId:
                    gPayData?.checkoutcom_google_pay?.active_pk,
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: gPayData?.checkoutcom_google_pay?.merchant_id, // merchand id
            merchantName: "Riva Fashion",
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
