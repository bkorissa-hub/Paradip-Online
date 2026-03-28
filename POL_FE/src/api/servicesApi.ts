import { get, post, put, patch, del } from './apiClient';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
  color: string;
  image?: string;
  detailedDescription?: string;
  category?: string;
  popular: boolean;
  order: number;
  enabled: boolean;
}

export const getServices = () => get<Service[]>('services');

export const getService = (id: string) => get<Service>(`services/${id}`);

export const createService = (service: Omit<Service, 'id'>) => post<Service>('services', service);

export const updateService = (id: string, service: Partial<Service>) => put<Service>(`services/${id}`, service);

export const patchService = (id: string, updates: Partial<Service>) => patch<Service>(`services/${id}`, updates);

export const deleteService = (id: string) => del<void>(`services/${id}`);
