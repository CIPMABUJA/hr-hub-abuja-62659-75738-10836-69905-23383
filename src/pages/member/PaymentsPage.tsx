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
import { Download, CreditCard, FileText } from "lucide-react";

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
              <div className="text-2xl font-bold">₦85,000</div>
              <p className="text-xs text-muted-foreground">3 transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦0</div>
              <p className="text-xs text-muted-foreground">No pending payments</p>
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

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-16 bg-muted rounded flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Bank Transfer</p>
                  <p className="text-sm text-muted-foreground">Primary payment method</p>
                </div>
              </div>
              <Button variant="outline">Update Method</Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell className="font-semibold">{payment.amount}</TableCell>
                    <TableCell>
                      <Badge variant="default">{payment.status}</Badge>
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
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
