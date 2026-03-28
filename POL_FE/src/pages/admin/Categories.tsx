import { useState, useEffect } from "react";
import { Plus, Search, Tags, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
    Category,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "@/api/categoryApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterSection, setFilterSection] = useState<string>("all");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<Category>>({
        name: "",
        section: "Sales",
        description: "",
        isActive: true,
    });

    const { toast } = useToast();

    useEffect(() => {
        fetchCategories();
    }, [filterSection]);

    const fetchCategories = async () => {
        setIsLoading(true);
        const section = filterSection === "all" ? undefined : filterSection;
        const { data, error } = await getCategories(section);
        if (data) {
            setCategories(data);
        } else {
            toast({ title: "Error", description: error || "Failed to fetch categories", variant: "destructive" });
        }
        setIsLoading(false);
    };

    const handleInputChange = (field: keyof Category, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleCreateOrUpdate = async () => {
        if (!formData.name?.trim()) {
            toast({ title: "Validation Error", description: "Category name is required", variant: "destructive" });
            return;
        }

        try {
            if (editingCategory) {
                const { error } = await updateCategory(editingCategory.id, formData);
                if (error) throw new Error(error);
                toast({ title: "Success", description: "Category updated successfully" });
            } else {
                const { error } = await createCategory(formData);
                if (error) throw new Error(error);
                toast({ title: "Success", description: "Category created successfully" });
            }
            setIsDialogOpen(false);
            resetForm();
            fetchCategories();
        } catch (err: any) {
            toast({ title: "Error", description: err.message || "Failed to save category", variant: "destructive" });
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this category?")) {
            const { error } = await deleteCategory(id);
            if (error) {
                toast({ title: "Error", description: error, variant: "destructive" });
            } else {
                toast({ title: "Success", description: "Category deleted successfully" });
                fetchCategories();
            }
        }
    };

    const openEditDialog = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            section: category.section,
            description: category.description || "",
            isActive: category.isActive,
        });
        setIsDialogOpen(true);
    };

    const resetForm = () => {
        setEditingCategory(null);
        setFormData({
            name: "",
            section: filterSection !== "all" ? (filterSection as any) : "Sales",
            description: "",
            isActive: true,
        });
    };

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Categories</h1>
                    <p className="text-slate-500 mt-1">Manage categories across all sections.</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="mr-2 h-4 w-4" /> Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category Name</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    placeholder="e.g. Laptops"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Section Map</label>
                                <Select
                                    value={formData.section}
                                    onValueChange={(val) => handleInputChange("section", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Sales">Sales (Products)</SelectItem>
                                        <SelectItem value="Service">Service</SelectItem>
                                        <SelectItem value="Blog">Blog</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    placeholder="Short description..."
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleCreateOrUpdate} className="bg-blue-600">
                                {editingCategory ? "Save Changes" : "Create Category"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-slate-50"
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={filterSection} onValueChange={setFilterSection}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All Sections" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Sections</SelectItem>
                            <SelectItem value="Sales">Sales (Products)</SelectItem>
                            <SelectItem value="Service">Service</SelectItem>
                            <SelectItem value="Blog">Blog</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table section */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50 border-b border-slate-200">
                            <TableRow>
                                <TableHead className="w-[300px]">Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Section</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                                        Loading categories...
                                    </TableCell>
                                </TableRow>
                            ) : filteredCategories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                                                <Tags className="h-6 w-6 text-slate-400" />
                                            </div>
                                            <p>No categories found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCategories.map((category) => (
                                    <TableRow key={category.id} className="hover:bg-slate-50">
                                        <TableCell className="font-medium">
                                            {category.name}
                                            {category.description && (
                                                <p className="text-xs text-slate-500 font-normal truncate max-w-[250px] mt-0.5">
                                                    {category.description}
                                                </p>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-slate-500 font-mono text-sm">{category.slug}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.section === "Sales" ? "bg-blue-100 text-blue-700" :
                                                    category.section === "Service" ? "bg-emerald-100 text-emerald-700" :
                                                        "bg-purple-100 text-purple-700"
                                                }`}>
                                                {category.section}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"
                                                }`}>
                                                {category.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem onClick={() => openEditDialog(category)}>
                                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => handleDelete(category.id!)}>
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
