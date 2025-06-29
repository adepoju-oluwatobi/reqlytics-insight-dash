import { PaystackButton } from 'react-paystack';
import { useToast } from "@/hooks/use-toast";

interface PaystackCheckoutProps {
  plan: string;
  email: string;
  handlePlanChange: (plan: string, paymentResponse?: any) => Promise<void>;
}

const PaystackCheckout: React.FC<PaystackCheckoutProps> = ({ plan, email, handlePlanChange }) => {
  const { toast } = useToast();
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || '';
  const amount = plan === 'premium' ? 1000 : 5000; // Amount in cents for USD (e.g., $10 or $50)

  if (!publicKey) {
    console.error('Paystack public key is missing');
    toast({
      title: "Configuration Error",
      description: "Paystack public key is not configured",
      variant: "destructive",
    });
    return null;
  }

  if (!email) {
    console.error('User email is missing');
    toast({
      title: "Error",
      description: "User email is required for payment",
      variant: "destructive",
    });
    return null;
  }

  return (
    <PaystackButton
      email={email}
      amount={amount}
      currency="USD"
      publicKey={publicKey}
      text={`Upgrade to ${plan}`}
      onSuccess={(response) => {
        console.log('Paystack payment success:', response); // Debug
        handlePlanChange(plan, response);
        toast({
          title: "Payment Successful",
          description: `Proceeding to upgrade to ${plan} plan`,
        });
      }}
      onClose={() => {
        console.log('Paystack payment closed'); // Debug
        toast({
          title: "Payment Cancelled",
          description: "You cancelled the payment process",
          variant: "destructive",
        });
      }}
    />
  );
};

export default PaystackCheckout;