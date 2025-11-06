import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaystackPayment } from "@/components/PaystackPayment";
import { ArrowLeft, Calendar, MapPin, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";

export default function EventPayment() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const fetchEvent = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    setEvent(data);
    setIsLoading(false);
  };

  const handlePaymentSuccess = async () => {
    if (!user || !eventId) return;

    // Create event registration
    await supabase
      .from('event_registrations')
      .insert({
        user_id: user.id,
        event_id: eventId,
        payment_status: 'completed',
      });

    navigate('/member/events');
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!event) {
    return (
      <DashboardLayout>
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <p className="text-muted-foreground">Event not found</p>
            <Button onClick={() => navigate('/member/events')} className="mt-4">
              Back to Events
            </Button>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/member/events')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Event Registration Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(event.event_date), 'MMM dd, yyyy')}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">Registration Fee:</span>
                <span className="text-2xl font-bold text-primary">
                  ₦{event.price.toLocaleString()}
                </span>
              </div>

              {user && (
                <PaystackPayment
                  email={user.email || ''}
                  amount={event.price}
                  description={`Event Registration: ${event.title}`}
                  paymentType="event"
                  onSuccess={handlePaymentSuccess}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}