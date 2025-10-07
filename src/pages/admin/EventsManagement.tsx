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
import { Calendar, Plus, Edit, Trash2, Users, MapPin, Clock, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export default function EventsManagement() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    registrations: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchEvents();
    fetchStats();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        event_registrations (count)
      `)
      .order('event_date', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
    } else {
      setEvents(data || []);
    }
    setIsLoading(false);
  };

  const fetchStats = async () => {
    const { count: total } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true });

    const { count: upcoming } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'upcoming');

    const { count: registrations } = await supabase
      .from('event_registrations')
      .select('*', { count: 'exact', head: true });

    const { data: eventsData } = await supabase
      .from('events')
      .select('price');
    
    const revenue = eventsData?.reduce((sum, e) => sum + Number(e.price || 0), 0) || 0;

    setStats({
      total: total || 0,
      upcoming: upcoming || 0,
      registrations: registrations || 0,
      revenue: revenue,
    });
  };

  const filteredEvents = events.filter(event => 
    statusFilter === "all" || event.status === statusFilter
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
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
              <p className="text-xs text-muted-foreground">Scheduled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.registrations}</div>
              <p className="text-xs text-muted-foreground">All events</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revenue (Total)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{stats.revenue.toLocaleString()}</div>
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
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredEvents.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-muted-foreground">No events found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredEvents.map((event) => {
              const registrationCount = event.event_registrations?.[0]?.count || 0;
              const capacity = event.capacity || 0;
              
              return (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                                {event.status}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{format(new Date(event.event_date), 'MMM dd, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{event.location || event.venue || 'TBA'}</span>
                          </div>
                        </div>

                        {capacity > 0 && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {registrationCount} / {capacity} registered
                            </span>
                            <div className="flex-1 bg-muted rounded-full h-2 ml-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${Math.min(100, (registrationCount / capacity) * 100)}%` }}
                              />
                            </div>
                          </div>
                        )}
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
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
