import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, Eye, CreditCard, TrendingUp, DollarSign } from "lucide-react";

const payments = [
  {
    id: 1,
    invoiceId: "INV-2024-001",
    member: "John Doe",
    memberId: "CIPM/ABJ/2024/0123",
    description: "Annual Membership Renewal",
    amount: "₦45,000",
    status: "Paid",
    date: "May 10, 2024",
    method: "Bank Transfer",
  },
  {
    id: 2,
    invoiceId: "INV-2024-002",
    member: "Jane Smith",
    memberId: "CIPM/ABJ/2024/0089",
    description: "Event Registration - HR Summit",
    amount: "₦25,000",
    status: "Paid",
    date: "May 09, 2024",
    method: "Card",
  },
  {
    id: 3,
    invoiceId: "INV-2024-003",
    member: "Michael Chen",
    memberId: "CIPM/ABJ/2023/0456",
    description: "CPD Workshop Fee",
    amount: "₦15,000",
    status: "Pending",
    date: "May 08, 2024",
    method: "Bank Transfer",
  },
  {
    id: 4,
    invoiceId: "INV-2024-004",
    member: "Sarah Johnson",
    memberId: "CIPM/ABJ/2024/0078",
    description: "Membership Application Fee",
    amount: "₦10,000",
    status: "Failed",
    date: "May 07, 2024",
    method: "Card",
  },
];

export default function PaymentsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.memberId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Payments Management</h2>
            <p className="text-muted-foreground">Track and manage all financial transactions</p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue (MTD)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦2,450,000</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₦2,100,000</div>
              <p className="text-xs text-muted-foreground">156 transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">₦320,000</div>
              <p className="text-xs text-muted-foreground">23 transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">₦30,000</div>
              <p className="text-xs text-muted-foreground">5 transactions</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="membership">Membership</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="cpd">CPD Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by member, invoice ID..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Member</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono text-sm">{payment.invoiceId}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{payment.member}</p>
                            <p className="text-xs text-muted-foreground">{payment.memberId}</p>
                          </div>
                        </TableCell>
                        <TableCell>{payment.description}</TableCell>
                        <TableCell className="font-semibold">{payment.amount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              payment.status === "Paid"
                                ? "default"
                                : payment.status === "Pending"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="membership">
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">Membership payments will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">Event registration payments will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cpd">
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">CPD activity payments will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
