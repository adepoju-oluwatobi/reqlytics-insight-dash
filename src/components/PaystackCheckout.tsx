
import { PaystackButton } from 'react-paystack';
import { useToast } from "@/hooks/use-toast";

interface PaystackCheckoutProps {
  plan: string;
  email: string;
  handlePlanChange: (plan: string, paymentResponse?: any) => Promise<void>;
}

const PaystackCheckout: React.FC<PaystackCheckoutProps> = ({ plan, email, handlePlanChange }) => {
  const { toast } = useToast();
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';
  
  // Convert plan to amount in kobo (NGN smallest unit) or cents (USD)
  const getAmount = (planType: string) => {
    switch (planType) {
      case 'premium':
        return 15000 * 100; // $10 = 1000 cents or ₦1000 = 100000 kobo
      case 'enterprise':
        return 75000 * 100; // $50 = 5000 cents or ₦5000 = 500000 kobo
      default:
        return 0;
    }
  };

  const amount = getAmount(plan);

  if (!publicKey) {
    console.error('Paystack public key is missing');
    toast({
      title: "Configuration Error",
      description: "Paystack public key is not configured. Please add VITE_PAYSTACK_PUBLIC_KEY to your environment variables.",
      variant: "destructive",
    });
    return (
      <div className="p-4 border border-red-200 rounded-md bg-red-50 text-red-700 text-sm">
        Paystack configuration missing. Please contact support.
      </div>
    );
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

  const paystackProps = {
    email,
    amount,
    currency: "NGN",
    publicKey,
    text: `Pay with Paystack - Upgrade to ${plan}`,
    onSuccess: (response: any) => {
      console.log('Paystack payment success:', response);
      handlePlanChange(plan, response);
      toast({
        title: "Payment Successful",
        description: `Processing upgrade to ${plan} plan`,
      });
    },
    onClose: () => {
      console.log('Paystack payment closed');
      toast({
        title: "Payment Cancelled",
        description: "You cancelled the payment process",
        variant: "destructive",
      });
    },
  };

  return (
    <PaystackButton
      {...paystackProps}
      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
    />
  );
};

export default PaystackCheckout;
