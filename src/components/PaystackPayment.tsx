import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface PaystackPaymentProps {
  email: string;
  amount: number;
  description: string;
  paymentType: string;
  onSuccess?: () => void;
}

export function PaystackPayment({
  email,
  amount,
  description,
  paymentType,
  onSuccess,
}: PaystackPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const reference = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const callbackUrl = `${window.location.origin}/member/payment-success?reference=${reference}`;

      console.log('Initializing Paystack payment:', { email, amount, reference });

      // Create payment record first
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("User not authenticated");

      const { error: insertError } = await supabase.from("payments").insert({
        user_id: userData.user.id,
        amount,
        reference,
        description,
        payment_type: paymentType,
        status: "pending",
      });

      if (insertError) throw insertError;

      const { data, error } = await supabase.functions.invoke('paystack-payment', {
        body: {
          action: 'initialize',
          email,
          amount,
          reference,
          callback_url: callbackUrl,
          metadata: {
            description,
            payment_type: paymentType,
          },
        },
      });

      if (error) throw error;

      console.log('Payment initialized:', data);

      // Redirect to Paystack payment page
      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to initialize payment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePayment} 
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        `Pay ₦${amount.toLocaleString()}`
      )}
    </Button>
  );
}
