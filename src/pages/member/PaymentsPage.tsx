import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, CreditCard, FileText, Loader2 } from "lucide-react";
import { PaystackPayment } from "@/components/PaystackPayment";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const paymentHistory = [
  {
    id: "INV-2024-001",
    date: "Jan 15, 2024",
    description: "Annual Membership Renewal",
    amount: "₦45,000",
    status: "Paid",
  },
  {
    id: "INV-2023-012",
    date: "Nov 10, 2023",
    description: "CPD Workshop - Leadership Skills",
    amount: "₦15,000",
    status: "Paid",
  },
  {
    id: "INV-2023-008",
    date: "Aug 20, 2023",
    description: "Annual Conference Registration",
    amount: "₦25,000",
    status: "Paid",
  },
  {
    id: "INV-2023-005",
    date: "May 05, 2023",
    description: "Professional Development Course",
    amount: "₦20,000",
    status: "Paid",
  },
];

export default function PaymentsPage() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPayments();
    }
  }, [user]);

  const fetchPayments = async () => {
    if (!user) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', user.id)
      .order('payment_date', { ascending: false });

    if (error) {
      console.error('Error fetching payments:', error);
    } else {
      setPayments(data || []);
    }
    setIsLoading(false);
  };

  const currentYear = new Date().getFullYear();
  const yearPayments = payments.filter(p => 
    new Date(p.payment_date).getFullYear() === currentYear
  );
  
  const totalPaid = yearPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const pendingPayments = yearPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Payments & Invoices</h2>
          <p className="text-muted-foreground">View your payment history and manage invoices</p>
        </div>

        {/* Payment Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid (2024)</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{totalPaid.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{yearPayments.filter(p => p.status === 'completed').length} transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{pendingPayments.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{yearPayments.filter(p => p.status === 'pending').length} pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payment Due</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Dec 31, 2024</div>
              <p className="text-xs text-muted-foreground">Membership renewal</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Payment */}
        <Card>
          <CardHeader>
            <CardTitle>Make a Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Pay for membership renewal or event registration</p>
              {user?.email && (
                <PaystackPayment
                  email={user.email}
                  amount={45000}
                  description="Membership Renewal"
                  paymentType="membership"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : payments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No payment history yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.reference || 'N/A'}</TableCell>
                      <TableCell>{format(new Date(payment.payment_date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell className="font-semibold">₦{Number(payment.amount).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(payment.status)}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
