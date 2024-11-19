"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const paypalOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb", // Use sandbox client ID by default
  currency: "USD",
  intent: "capture",
};

export default function PayPalProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      {children}
    </PayPalScriptProvider>
  );
}