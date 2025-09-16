import React, { useState } from "react";
import axios from "axios";
import { useRazorpay } from "react-razorpay";
const Payment = () => {
//   const [Amount, setAmount] = useState("");

//   const { Razorpay } = useRazorpay();

//   const payOnRAzorpay = async () => {
//     console.log(Amount);
//     try {
//       const res = await axios.post(
//         "http://localhost:7000/payment/order/create",
//         { amount: parseInt(Amount) * 100 }
//       );
//       console.log(res.data);

//       var options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
//         amount: res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//         currency: "INR",
//         name: "Harsha", //your business name
//         description: "Test Transaction",
//         image: "https://example.com/your_logo",
//         order_id: res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//         handler: async (response) => {
//           // alert(response.razorpay_payment_id);
//           // alert(response.razorpay_order_id);
//           // alert(response.razorpay_signature);
//           // console.log(response.razorpay_payment_id);
//           // console.log(response.razorpay_order_id);
//           // console.log(response.razorpay_signature);
//           response.order_id = res.data.id;
//           console.log(response);
//           try {
//             const res1 = await axios.post(
//               "http://localhost:7000/payment/order/verify",
//               response
//             );
//             console.log(res1.data);
//           } catch (e) {
//             console.log(e);
//           }
//         },
//         prefill: {
//           //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
//           name: "Harsha", //your customer's name
//           email: "harshakhadgi28@gmail.com",
//           contact: "8080344814", //Provide the customer's phone number for better conversion rates
//         },
//         notes: {
//           address: "Razorpay Corporate Office",
//         },
//         theme: {
//           color: "#09f36b",
//         },
//       };

//       var rzp1 = new Razorpay(options);

//       rzp1.on("payment.failed", function (response) {
//         console.log(response.error.code);
//         console.log(response.error.source);
//         console.log(response.error.step);
//         console.log(response.error.reason);
//         console.log(response.error.metadata.order_id);
//         console.log(response.error.metadata.payment_id);
//         console.log(response.error.description);
//       });

//       rzp1.open();
//     } catch (e) {
//       console.log(e);
//     }
//   };

  return (
    <div>
      <input
        type="text"
        value={Amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <button
        onClick={() => {
          payOnRAzorpay();
        }}
      >
        PAY
      </button>
    </div>
  );
};

export default Payment;
