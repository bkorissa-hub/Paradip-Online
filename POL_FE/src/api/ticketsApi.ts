import { get, post, put, ApiResponse } from "./apiClient";

export interface Ticket {
  id: string; // This corresponds to ticketId coming from backend toJSON
  jobCardNo?: string;
  subject: string;
  customer: string;
  phone: string;
  email?: string;
  gadget?: {
    brand: string;
    model: string;
    productName?: string;
    serial: string;
    condition: string;
  };
  images?: string[];
  estimatedPrice?: number;
  advanceReceived?: number;
  password?: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "Diagnosing" | "In Progress" | "Awaiting Parts" | "Ready for Pickup" | "Closed" | "Cancelled";
  date: string;
  comment?: string;
  history?: {
    status: string;
    note: string;
    timestamp: string;
  }[];
}

export async function getTickets(): Promise<ApiResponse<Ticket[]>> {
  return get<Ticket[]>("tickets");
}

export async function getTicketById(id: string): Promise<ApiResponse<Ticket>> {
  return get<Ticket>(`tickets/${id}`);
}

export async function updateTicket(id: string, ticket: Partial<Ticket>): Promise<ApiResponse<Ticket>> {
  return put<Ticket>(`tickets/${id}`, ticket);
}

export async function createTicket(ticket: Partial<Ticket>): Promise<ApiResponse<Ticket>> {
  return post<Ticket>("tickets", ticket);
}

export async function trackTicket(ticketId: string, phone: string, password?: string): Promise<ApiResponse<Ticket>> {
  return post<Ticket>("tickets/track", { ticketId, phone, password });
}
