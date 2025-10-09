import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const reference = searchParams.get("reference");
    
    if (reference) {
      verifyPayment(reference);
    } else {
      setVerifying(false);
    }
  }, [searchParams]);

  const verifyPayment = async (reference: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("verify-payment", {
        body: { reference },
      });

      if (error) throw error;

      if (data.success) {
        setSuccess(true);
        toast({
          title: "Payment Successful",
          description: "Your payment has been confirmed.",
        });
      } else {
        setSuccess(false);
        toast({
          title: "Payment Failed",
          description: "Unable to verify your payment.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setSuccess(false);
      toast({
        title: "Verification Error",
        description: "Failed to verify payment. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center">
            {verifying ? "Verifying Payment..." : success ? "Payment Successful!" : "Payment Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {verifying ? (
            <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" />
          ) : success ? (
            <>
              <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
              <p className="text-muted-foreground">
                Your payment has been successfully processed. Thank you!
              </p>
              <Button onClick={() => navigate("/member/payments")} className="w-full">
                View Payment History
              </Button>
            </>
          ) : (
            <>
              <XCircle className="h-16 w-16 mx-auto text-destructive" />
              <p className="text-muted-foreground">
                We couldn't verify your payment. Please contact support if you were charged.
              </p>
              <Button onClick={() => navigate("/member/payments")} className="w-full">
                Back to Payments
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
