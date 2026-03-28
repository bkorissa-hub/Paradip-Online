import { useState, useEffect } from "react";
import { Check, Clock, MessageSquare, MoreHorizontal, User, Loader2, Search, ArrowUpDown, Send, Plus, Phone, Laptop, Shield, Upload, ImageIcon, Copy, Mail, FileText, Calendar, History, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadImages } from "@/api/apiClient";
import { Badge } from "@/components/ui/badge";
import { getTickets, updateTicket, createTicket, Ticket } from "@/api/ticketsApi";
import { useToast } from "@/hooks/use-toast";

const Tickets = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"priority" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Dialog states
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [manageDialogOpen, setManageDialogOpen] = useState(false);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [commentText, setCommentText] = useState("");
  const [historyNote, setHistoryNote] = useState("");
  const [saving, setSaving] = useState(false);

  const [repeatCustomerTickets, setRepeatCustomerTickets] = useState<Ticket[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  const [newTicket, setNewTicket] = useState<Partial<Ticket>>({
    jobCardNo: "",
    subject: "",
    customer: "",
    phone: "",
    email: "",
    priority: "Medium",
    status: "Open",
    gadget: { brand: "", model: "", productName: "", serial: "", condition: "" },
    images: [],
    date: new Date().toISOString().split('T')[0],
    password: Math.random().toString(36).slice(-6).toUpperCase(),
  });

  useEffect(() => {
    loadTickets();
  }, []);

  // Repeat customer check based on phone number input
  useEffect(() => {
    if (newTicket.phone && newTicket.phone.length >= 8) {
      const pastTickets = tickets.filter(t => t.phone === newTicket.phone);
      setRepeatCustomerTickets(pastTickets);
    } else {
      setRepeatCustomerTickets([]);
    }
  }, [newTicket.phone, tickets]);

  const loadTickets = async () => {
    setLoading(true);
    const { data, error } = await getTickets();
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else if (data) {
      setTickets(data);
    }
    setLoading(false);
  };

  // Filter by search query (ID or customer name)
  const filteredTickets = tickets.filter((ticket) => {
    const query = searchQuery.toLowerCase();
    return (
      ticket.id.toLowerCase().includes(query) ||
      ticket.customer.toLowerCase().includes(query) ||
      ticket.subject.toLowerCase().includes(query)
    );
  });

  // Sort tickets
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      const diff = priorityOrder[a.priority] - priorityOrder[b.priority];
      return sortOrder === "desc" ? -diff : diff;
    } else {
      // Sort by date
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    }
  });

  const handleStatusChange = async (ticket: Ticket, newStatus: Ticket["status"], note: string = "Status updated by administrator") => {
    const historyEntry = {
      status: newStatus,
      note: note,
      timestamp: new Date().toISOString()
    };

    const updated = {
      ...ticket,
      status: newStatus,
      history: [...(ticket.history || []), historyEntry]
    };

    const { error } = await updateTicket(ticket.id, updated);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Ticket updated", description: `Status changed to ${newStatus}.` });
      loadTickets();
    }
  };

  const handleCreateTicket = async () => {
    setSaving(true);
    const { error } = await createTicket(newTicket);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Repair job card created successfully." });
      setCreateDialogOpen(false);
      // Reset form
      setNewTicket({
        jobCardNo: "", subject: "", customer: "", phone: "", email: "", priority: "Medium", status: "Open",
        gadget: { brand: "", model: "", productName: "", serial: "", condition: "" }, images: [],
        date: new Date().toISOString().split('T')[0], password: Math.random().toString(36).slice(-6).toUpperCase()
      });
      loadTickets();
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadingImages(true);
      const files = Array.from(e.target.files);
      const { data, error } = await uploadImages(files);
      if (error) {
        toast({ title: "Upload failed", description: error, variant: "destructive" });
      } else if (data) {
        const urls = data.map(img => img.url);
        setNewTicket(prev => ({ ...prev, images: [...(prev.images || []), ...urls] }));
        toast({ title: "Success", description: "Images uploaded successfully." });
      }
      setUploadingImages(false);
    }
  };

  const copyCommunicationTemplate = () => {
    if (!selectedTicket) return;
    const text = `Hello ${selectedTicket.customer},\n\nYour repair job is currently: *${selectedTicket.status}*\nJob Card No: ${selectedTicket.jobCardNo || selectedTicket.id}\nTrack exactly what is happening live on our website using your phone number and this tracking password: ${selectedTicket.password}\n\nThank you for choosing us!`;
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Message copied to clipboard." });
  };

  const generateEmailLink = () => {
    if (!selectedTicket || !selectedTicket.email) return "#";
    const subject = `Repair Update - Job Card ${selectedTicket.jobCardNo || selectedTicket.id}`;
    const body = `Hello ${selectedTicket.customer},\n\nThis is an update regarding your repair (${selectedTicket.gadget?.productName || 'device'} - ${selectedTicket.gadget?.brand} ${selectedTicket.gadget?.model}).\n\nCurrent Status: ${selectedTicket.status}\n\nYou can track the live progress on our website using your tracking password: ${selectedTicket.password}\n\nRegards,\nThe Support Team`;
    return `mailto:${selectedTicket.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleUpdateManage = async () => {
    if (!selectedTicket) return;
    setSaving(true);
    const { error } = await updateTicket(selectedTicket.id, selectedTicket);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Ticket details updated." });
      setManageDialogOpen(false);
      loadTickets();
    }
    setSaving(false);
  };

  const openCommentDialog = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setCommentText(ticket.comment || "");
    setCommentDialogOpen(true);
  };

  const handleSaveComment = async () => {
    if (!selectedTicket) return;
    setSaving(true);
    const updated = { ...selectedTicket, comment: commentText };
    const { error } = await updateTicket(selectedTicket.id, updated);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Comment saved", description: "Your comment has been added to the ticket." });
      loadTickets();
    }
    setSaving(false);
    setCommentDialogOpen(false);
    setSelectedTicket(null);
    setCommentText("");
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-600 bg-red-50 border-red-200";
      case "Medium": return "text-orange-600 bg-orange-50 border-orange-200";
      case "Low": return "text-green-600 bg-green-50 border-green-200";
      default: return "";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Open": return "default";
      case "In Progress": return "secondary";
      case "Closed": return "outline";
      default: return "default";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Support Tickets</h1>
          <p className="text-muted-foreground mt-1">
            Manage customer support requests ({tickets.length} tickets)
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Create New Ticket
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by ticket ID, customer name, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={(value: "priority" | "date") => setSortBy(value)}>
          <SelectTrigger className="w-full sm:w-48">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priority">Sort by Priority</SelectItem>
            <SelectItem value="date">Sort by Date</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={toggleSortOrder} title={sortOrder === "desc" ? "Descending" : "Ascending"}>
          <ArrowUpDown className={`h-4 w-4 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />
        </Button>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Customer / Phone</TableHead>
              <TableHead>Subject / Gadget</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{ticket.customer}</div>
                    <div className="text-xs text-muted-foreground">{ticket.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px]">
                    <div className="truncate font-medium">{ticket.subject}</div>
                    {ticket.gadget && (
                      <div className="text-[10px] text-blue-600 font-bold truncate">
                        {ticket.gadget.brand} {ticket.gadget.model}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(ticket.status) as any}>{ticket.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {ticket.date}
                  </div>
                </TableCell>
                <TableCell>
                  {ticket.comment ? (
                    <span className="text-xs text-muted-foreground max-w-[150px] truncate block" title={ticket.comment}>
                      {ticket.comment.slice(0, 30)}{ticket.comment.length > 30 ? "..." : ""}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground/50">No comment</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleStatusChange(ticket, "Open")}>Mark as Open</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(ticket, "In Progress")}>Mark In Progress</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(ticket, "Closed")}>
                        <Check className="mr-2 h-3 w-3" /> Mark as Closed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setSelectedTicket(ticket);
                        setManageDialogOpen(true);
                      }}>
                        <Shield className="mr-2 h-3 w-3" /> Manage Job Card
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openCommentDialog(ticket)}>
                        <MessageSquare className="mr-2 h-3 w-3" /> Add/Edit Comment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {sortedTickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No tickets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create Ticket Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-4xl" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Create New Repair Job Card</DialogTitle>
            <DialogDescription>
              Fill in customer and gadget details to generate a new tracking ID.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" /> Customer Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="ph">Phone Number (Required for Tracking)</Label>
                <Input id="ph" value={newTicket.phone} onChange={(e) => setNewTicket({ ...newTicket, phone: e.target.value })} placeholder="Mobile Number" className="!pl-3" autoComplete="new-password" />
              </div>

              {repeatCustomerTickets.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2 text-amber-800">
                    <History className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Repeat Customer Found ({repeatCustomerTickets.length})</span>
                  </div>
                  <div className="text-xs text-amber-900 space-y-1 max-h-24 overflow-y-auto">
                    {repeatCustomerTickets.map(t => (
                      <div key={t.id} className="flex justify-between items-center bg-white/50 p-1.5 rounded">
                        <span className="font-medium truncate w-24" title={t.customer}>{t.customer}</span>
                        <span className="text-[10px] text-muted-foreground">{t.date}</span>
                        <Badge variant="outline" className="text-[9px] tabular-nums whitespace-nowrap bg-white">{t.status}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs h-7 mt-2 bg-white hover:bg-amber-100 text-amber-900 border-amber-300" onClick={() => setNewTicket({ ...newTicket, customer: repeatCustomerTickets[0].customer, email: repeatCustomerTickets[0].email || "" })}>
                    Autofill Name & Email
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="cust" className="ml-1">Customer Name</Label>
                <Input id="cust" value={newTicket.customer} onChange={(e) => setNewTicket({ ...newTicket, customer: e.target.value })} placeholder="Full name" className="!pl-3" autoComplete="new-password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input id="email" type="email" value={newTicket.email} onChange={(e) => setNewTicket({ ...newTicket, email: e.target.value })} placeholder="customer@email.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobCardNo">Physical Job Card No (Optional)</Label>
                <Input id="jobCardNo" value={newTicket.jobCardNo} onChange={(e) => setNewTicket({ ...newTicket, jobCardNo: e.target.value })} placeholder="Leave blank to auto-generate" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postDate">Job Posting Date</Label>
                <Input type="date" id="postDate" value={newTicket.date} onChange={(e) => setNewTicket({ ...newTicket, date: e.target.value })} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Laptop className="h-4 w-4" /> Gadget & Issue Details
              </h3>
              <div className="space-y-2">
                <Label htmlFor="subj">Subject / Issue Summary</Label>
                <Input id="subj" value={newTicket.subject} onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })} placeholder="e.g. Broken Screen" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1 col-span-1">
                  <Label className="text-[10px]">Product</Label>
                  <Input className="h-8 text-xs" value={newTicket.gadget?.productName} onChange={(e) => setNewTicket({ ...newTicket, gadget: { ...newTicket.gadget!, productName: e.target.value } })} placeholder="Laptop" />
                </div>
                <div className="space-y-1 col-span-1">
                  <Label className="text-[10px]">Brand</Label>
                  <Input className="h-8 text-xs" value={newTicket.gadget?.brand} onChange={(e) => setNewTicket({ ...newTicket, gadget: { ...newTicket.gadget!, brand: e.target.value } })} placeholder="Apple" />
                </div>
                <div className="space-y-1 col-span-1">
                  <Label className="text-[10px]">Model</Label>
                  <Input className="h-8 text-xs" value={newTicket.gadget?.model} onChange={(e) => setNewTicket({ ...newTicket, gadget: { ...newTicket.gadget!, model: e.target.value } })} placeholder="iPhone 13" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ser" className="text-xs">Serial Number</Label>
                <Input id="ser" className="h-8 text-xs" value={newTicket.gadget?.serial} onChange={(e) => setNewTicket({ ...newTicket, gadget: { ...newTicket.gadget!, serial: e.target.value } })} placeholder="SN-XXXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cond" className="text-xs">Received Condition</Label>
                <Textarea id="cond" className="text-xs" value={newTicket.gadget?.condition} onChange={(e) => setNewTicket({ ...newTicket, gadget: { ...newTicket.gadget!, condition: e.target.value } })} placeholder="Scratches on back, no power..." rows={2} />
              </div>

              <div className="space-y-2 pt-2 border-t">
                <Label className="flex items-center gap-2 text-xs">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" /> Upload Device Photos
                </Label>
                <div className="flex items-center gap-2">
                  <Input id="image-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <Button type="button" variant="outline" size="sm" className="w-full text-xs" onClick={() => document.getElementById('image-upload')?.click()} disabled={uploadingImages}>
                    {uploadingImages ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    Select Images
                  </Button>
                </div>
                {newTicket.images && newTicket.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newTicket.images.map((img, i) => (
                      <div key={i} className="relative group">
                        <img src={img} alt="Upload" className="h-12 w-12 object-cover rounded border" />
                        <button type="button" onClick={() => setNewTicket(prev => ({ ...prev, images: prev.images?.filter((_, index) => index !== i) }))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-2 bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-900 uppercase">Tracking Password</p>
                  <p className="text-lg font-mono font-bold text-blue-700">{newTicket.password}</p>
                </div>
              </div>
              <p className="text-[10px] text-blue-500 max-w-[200px] text-right">
                Provide this password to the customer for live status tracking.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTicket} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              Create Job Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Ticket Dialog */}
      <Dialog open={manageDialogOpen} onOpenChange={setManageDialogOpen}>
        <DialogContent className="sm:max-w-4xl" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Manage Job Card: <span className="font-mono text-blue-600">{selectedTicket?.jobCardNo || selectedTicket?.id}</span>
            </DialogTitle>
          </DialogHeader>

          {selectedTicket && (
            <div className="grid grid-cols-3 gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
              {/* Col 1: Status & Notes */}
              <div className="space-y-4 col-span-1">
                <div className="space-y-2">
                  <Label>Current Status</Label>
                  <Select value={selectedTicket.status} onValueChange={(val: any) => setSelectedTicket({ ...selectedTicket, status: val })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="Diagnosing">Diagnosing</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Awaiting Parts">Awaiting Parts</SelectItem>
                      <SelectItem value="Ready for Pickup">Ready for Pickup</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Add Timeline Note</Label>
                  <Textarea
                    placeholder="Technician update (visible to customer)..."
                    value={historyNote}
                    onChange={(e) => setHistoryNote(e.target.value)}
                    rows={3}
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      handleStatusChange(selectedTicket, selectedTicket.status, historyNote);
                      setHistoryNote("");
                      setManageDialogOpen(false);
                    }}
                  >
                    Post History Update
                  </Button>
                </div>
              </div>

              {/* Col 2: Gadget & Finance */}
              <div className="space-y-4 col-span-1">
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Gadget Specs</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-[10px]">Product</Label>
                        <Input className="h-8 text-xs" value={selectedTicket.gadget?.productName} onChange={(e) => setSelectedTicket({ ...selectedTicket, gadget: { ...selectedTicket.gadget!, productName: e.target.value } })} />
                      </div>
                      <div>
                        <Label className="text-[10px]">Brand</Label>
                        <Input className="h-8 text-xs" value={selectedTicket.gadget?.brand} onChange={(e) => setSelectedTicket({ ...selectedTicket, gadget: { ...selectedTicket.gadget!, brand: e.target.value } })} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-[10px]">Model</Label>
                        <Input className="h-8 text-xs" value={selectedTicket.gadget?.model} onChange={(e) => setSelectedTicket({ ...selectedTicket, gadget: { ...selectedTicket.gadget!, model: e.target.value } })} />
                      </div>
                      <div>
                        <Label className="text-[10px]">Serial</Label>
                        <Input className="h-8 text-xs" value={selectedTicket.gadget?.serial} onChange={(e) => setSelectedTicket({ ...selectedTicket, gadget: { ...selectedTicket.gadget!, serial: e.target.value } })} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 bg-green-50 p-4 rounded-xl border border-green-200">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-green-700">Internal Finance (Hidden)</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[10px] text-green-900">Estimated Price (₹)</Label>
                      <Input type="number" className="h-8 text-xs border-green-300" value={selectedTicket.estimatedPrice} onChange={(e) => setSelectedTicket({ ...selectedTicket, estimatedPrice: Number(e.target.value) })} />
                    </div>
                    <div>
                      <Label className="text-[10px] text-green-900">Advance Rcvd (₹)</Label>
                      <Input type="number" className="h-8 text-xs border-green-300" value={selectedTicket.advanceReceived} onChange={(e) => setSelectedTicket({ ...selectedTicket, advanceReceived: Number(e.target.value) })} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 3: Communication */}
              <div className="space-y-4 col-span-1">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-800 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Customer Comms
                  </h4>

                  <div className="space-y-2 bg-white p-3 rounded border border-blue-100 text-xs text-slate-700">
                    <p><strong>Name:</strong> {selectedTicket.customer}</p>
                    <p><strong>Phone:</strong> {selectedTicket.phone}</p>
                    <p><strong>Pass:</strong> <span className="font-mono bg-blue-100 px-1 rounded">{selectedTicket.password}</span></p>
                  </div>

                  <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-xs h-8" onClick={copyCommunicationTemplate}>
                    <Copy className="h-3 w-3 mr-2" />
                    Copy WhatsApp Snippet
                  </Button>

                  {selectedTicket.email ? (
                    <Button variant="outline" className="w-full text-xs h-8" asChild>
                      <a href={generateEmailLink()}>
                        <Mail className="h-3 w-3 mr-2 text-blue-600" />
                        Notify via Email
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full text-xs h-8 text-muted-foreground" disabled title="No email address on file">
                      <Mail className="h-3 w-3 mr-2" />
                      No Email Provided
                    </Button>
                  )}

                  <div className="pt-4 border-t border-blue-200">
                    <Label className="text-[10px] text-blue-800">Rotate Tracking Password</Label>
                    <div className="flex gap-2 mt-1">
                      <Input className="h-8 font-mono bg-white text-xs" value={selectedTicket.password} onChange={(e) => setSelectedTicket({ ...selectedTicket, password: e.target.value })} />
                      <Button size="sm" variant="outline" className="h-8 bg-white" onClick={() => setSelectedTicket({ ...selectedTicket, password: Math.random().toString(36).slice(-6).toUpperCase() })}>Gen</Button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setManageDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateManage} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Comment to Ticket</DialogTitle>
            <DialogDescription>
              {selectedTicket && (
                <>Ticket <span className="font-mono">{selectedTicket.id}</span> - {selectedTicket.subject}</>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="comment">Your Comment</Label>
              <Textarea
                id="comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a note or response for this ticket..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCommentDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveComment} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Send className="mr-2 h-4 w-4" />
              Save Comment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tickets;
