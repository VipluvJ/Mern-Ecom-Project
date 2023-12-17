import crypto from "crypto";

export const verifyPaymentSignature = (attributes, signature) => {
  try {
    // The `attributes` parameter is a concatenation of the Razorpay order ID and payment ID
    const hmac = crypto.createHmac("sha256", "YwVB6g1qhn9YpE0xVZmnqvkW");
    hmac.update(attributes);
    const calculatedSignature = hmac.digest("hex");

    // Compare the calculated signature with the received signature
    return calculatedSignature === signature;
  } catch (error) {
    console.error("Error verifying payment signature:", error);
    return false;
  }
};
