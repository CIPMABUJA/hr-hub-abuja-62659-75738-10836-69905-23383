import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Plus, Edit, Trash2, Users, MapPin, Clock } from "lucide-react";

const events = [
  {
    id: 1,
    title: "HR Technology & Innovation Summit 2024",
    date: "May 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Transcorp Hilton, Abuja",
    type: "Conference",
    registrations: 45,
    capacity: 250,
    status: "Upcoming",
    cpdPoints: 12,
  },
  {
    id: 2,
    title: "Employee Engagement Workshop",
    date: "May 22, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "CIPM Secretariat, Abuja",
    type: "Workshop",
    registrations: 30,
    capacity: 50,
    status: "Upcoming",
    cpdPoints: 6,
  },
  {
    id: 3,
    title: "Compensation & Benefits Seminar",
    date: "June 5, 2024",
    time: "10:00 AM - 1:00 PM",
    location: "Virtual (Zoom)",
    type: "Seminar",
    registrations: 25,
    capacity: 100,
    status: "Upcoming",
    cpdPoints: 4,
  },
  {
    id: 4,
    title: "Leadership in HR Management",
    date: "March 15, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "CIPM Secretariat, Abuja",
    type: "Workshop",
    registrations: 48,
    capacity: 50,
    status: "Completed",
    cpdPoints: 8,
  },
];

export default function EventsManagement() {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEvents = events.filter(event => 
    statusFilter === "all" || event.status.toLowerCase() === statusFilter.toLowerCase()
  );

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Events Management</h2>
            <p className="text-muted-foreground">Create and manage professional development events</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>Add a new event to the calendar</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Event Title" />
                <Textarea placeholder="Event Description" rows={3} />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Date" type="date" />
                  <Input placeholder="Time" type="time" />
                </div>
                <Input placeholder="Location" />
                <div className="grid grid-cols-2 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="seminar">Seminar</SelectItem>
                      <SelectItem value="webinar">Webinar</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Capacity" type="number" />
                </div>
                <Input placeholder="CPD Points" type="number" />
                <Input placeholder="Registration Fee (₦)" type="number" />
                <Button className="w-full">Create Event</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <p className="text-xs text-muted-foreground">Next 3 months</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revenue (YTD)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦4.2M</div>
              <p className="text-xs text-muted-foreground">From events</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex justify-between items-center">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events List */}
        <div className="grid gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{event.type}</Badge>
                          <Badge variant={event.status === "Upcoming" ? "default" : "secondary"}>
                            {event.status}
                          </Badge>
                          <Badge variant="secondary">{event.cpdPoints} CPD Points</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {event.registrations} / {event.capacity} registered
                      </span>
                      <div className="flex-1 bg-muted rounded-full h-2 ml-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:flex-col gap-2 justify-end">
                    <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 lg:flex-none text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
