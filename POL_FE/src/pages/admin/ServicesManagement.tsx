import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Wrench, Monitor, Cpu, Truck, HardDrive, Network, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getServices, createService, updateService, patchService, deleteService, type Service } from '@/api/servicesApi';
import { getCategories, type Category } from '@/api/categoryApi';

const iconOptions = [
  { value: 'Wrench', label: 'Wrench', icon: Wrench },
  { value: 'Monitor', label: 'Monitor', icon: Monitor },
  { value: 'Cpu', label: 'CPU', icon: Cpu },
  { value: 'Truck', label: 'Truck', icon: Truck },
  { value: 'HardDrive', label: 'Hard Drive', icon: HardDrive },
  { value: 'Network', label: 'Network', icon: Network },
];

const colorOptions = [
  { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
  { value: 'emerald', label: 'Emerald', class: 'bg-emerald-500' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
  { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
  { value: 'rose', label: 'Rose', class: 'bg-rose-500' },
  { value: 'cyan', label: 'Cyan', class: 'bg-cyan-500' },
];

type OmittedServiceFields = 'id' | 'createdAt' | 'updatedAt';

type ServiceFormData = {
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
};

const ServicesManagement = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingService, setDeletingService] = useState<Service | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    description: '',
    icon: 'Wrench',
    features: ['', '', '', ''],
    price: '',
    color: 'blue',
    image: '',
    detailedDescription: '',
    popular: false,
    order: 1,
    enabled: true,
    category: 'General',
  });

  const fetchData = async () => {
    setLoading(true);
    // Fetch Services
    const { data: serviceData, error: serviceError } = await getServices();
    if (serviceData && !serviceError) {
      setServices(serviceData.sort((a, b) => a.order - b.order));
    }
    // Fetch Categories
    const { data: catData } = await getCategories('Service', true);
    if (catData) {
      setCategories(catData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'Wrench',
      features: ['', '', '', ''],
      price: '',
      color: 'blue',
      image: '',
      detailedDescription: '',
      popular: false,
      order: services.length + 1,
      enabled: true,
      category: categories.length > 0 ? categories[0].name : 'General',
    });
    setEditingService(null);
  };

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        features: service.features,
        price: service.price,
        color: service.color,
        image: service.image || '',
        detailedDescription: service.detailedDescription || '',
        popular: service.popular,
        order: service.order,
        enabled: service.enabled,
        category: service.category || 'General',
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.price) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingService) {
        await updateService(editingService.id, formData);
        toast({
          title: 'Service Updated',
          description: 'Service has been updated successfully',
        });
      } else {
        await createService(formData);
        toast({
          title: 'Service Created',
          description: 'New service has been created successfully',
        });
      }
      await fetchData();
      handleCloseDialog();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save service',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!deletingService) return;

    try {
      await deleteService(deletingService.id);
      toast({
        title: 'Service Deleted',
        description: 'Service has been deleted successfully',
      });
      await fetchData();
      setIsDeleteDialogOpen(false);
      setDeletingService(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete service',
        variant: 'destructive',
      });
    }
  };

  const handleToggleEnabled = async (service: Service) => {
    try {
      await patchService(service.id, { enabled: !service.enabled });
      await fetchData();
      toast({
        title: 'Service Updated',
        description: `Service ${service.enabled ? 'disabled' : 'enabled'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update service',
        variant: 'destructive',
      });
    }
  };

  const handleMoveOrder = async (service: Service, direction: 'up' | 'down') => {
    const currentIndex = services.findIndex(s => s.id === service.id);
    if ((direction === 'up' && currentIndex === 0) || (direction === 'down' && currentIndex === services.length - 1)) {
      return;
    }

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const targetService = services[targetIndex];

    try {
      // Use patchService for partial updates to avoid data corruption
      await patchService(service.id, { order: targetService.order });
      await patchService(targetService.id, { order: service.order });
      await fetchData();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reorder services',
        variant: 'destructive',
      });
    }
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage service cards displayed on your website
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Service
        </Button>
      </div>

      {/* Services List */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>All Services</CardTitle>
          <CardDescription>
            {services.length} service{services.length !== 1 ? 's' : ''} configured · Use ↑↓ arrows to reorder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service, index) => {
              const IconComponent = iconOptions.find(opt => opt.value === service.icon)?.icon || Wrench;
              const colorClass = colorOptions.find(opt => opt.value === service.color)?.class || 'bg-blue-500';

              return (
                <div key={service.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 p-0"
                      onClick={() => handleMoveOrder(service, 'up')}
                      disabled={index === 0}
                      title="Move up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 p-0"
                      onClick={() => handleMoveOrder(service, 'down')}
                      disabled={index === services.length - 1}
                      title="Move down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className={`h-12 w-12 rounded-lg ${colorClass} flex items-center justify-center text-white flex-shrink-0`}>
                    <IconComponent className="h-6 w-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{service.title}</h3>
                      {service.popular && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                      {!service.enabled && (
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                          Disabled
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 items-center mt-1 text-sm text-slate-500">
                      <span className="font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs">
                        {service.category || 'General'}
                      </span>
                      <span className="truncate">{service.description}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{service.price}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`enabled-${service.id}`} className="text-sm">
                        Enabled
                      </Label>
                      <Switch
                        id={`enabled-${service.id}`}
                        checked={service.enabled}
                        onCheckedChange={() => handleToggleEnabled(service)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleOpenDialog(service)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setDeletingService(service);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
            <DialogDescription>
              {editingService ? 'Update service details' : 'Create a new service card'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Hardware Repair"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g., From ₹500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.length === 0 ? (
                    <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                  ) : (
                    categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the service..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Service Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
              <p className="text-[10px] text-muted-foreground">
                Provide a high-quality image URL for the service card.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="detailedDescription">Detailed Description (SEO Content) *</Label>
              <Textarea
                id="detailedDescription"
                value={formData.detailedDescription}
                onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                placeholder="Write a keyword-rich, detailed description for this service..."
                rows={8}
              />
              <p className="text-[10px] text-muted-foreground">
                This content will appear on the individual service page and is crucial for SEO.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color Theme</Label>
                <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div className={`h-4 w-4 rounded ${option.class}`}></div>
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Features (4 items)</Label>
              {formData.features.map((feature, index) => (
                <Input
                  key={index}
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="popular"
                  checked={formData.popular}
                  onCheckedChange={(checked) => setFormData({ ...formData, popular: checked })}
                />
                <Label htmlFor="popular">Mark as Popular</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enabled"
                  checked={formData.enabled}
                  onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
                />
                <Label htmlFor="enabled">Enabled</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingService ? 'Update Service' : 'Create Service'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingService?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingService(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServicesManagement;
