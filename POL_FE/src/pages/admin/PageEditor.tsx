import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Save,
    Plus,
    Trash2,
    Eye,
    Image as ImageIcon,
    Layout,
    Upload,
    Globe,
    ExternalLink,
    ArrowUp,
    ArrowDown,
    GripVertical
} from "lucide-react";
import { pagesApi, Page } from "@/api/pagesApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const PageEditor = () => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingId, setUploadingId] = useState<string | number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchPage = async () => {
            if (!name) return;
            try {
                const { data } = await pagesApi.getPage(name);
                if (data) setPage(data);
            } catch (error) {
                console.error("Error fetching page:", error);
                toast.error("Failed to load page content");
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [name]);

    const handleSave = async () => {
        if (!page || !name) return;
        setSaving(true);
        try {
            const { error } = await pagesApi.updatePage(name, page);
            if (error) throw new Error(error);
            toast.success("Page content updated successfully");
        } catch (error: any) {
            toast.error(error.message || "Failed to update page");
        } finally {
            setSaving(false);
        }
    };

    const updateSectionContent = (sectionId: string, newContent: any) => {
        if (!page) return;
        const newSections = page.sections.map(s =>
            s.id === sectionId ? { ...s, content: newContent } : s
        );
        setPage({ ...page, sections: newSections });
    };

    const toggleSection = (sectionId: string) => {
        if (!page) return;
        const newSections = page.sections.map(s =>
            s.id === sectionId ? { ...s, enabled: !s.enabled } : s
        );
        setPage({ ...page, sections: newSections });
    };

    const handleMoveSlide = (direction: 'up' | 'down', index: number) => {
        if (!page) return;
        const heroSection = page.sections.find(s => s.id === 'hero');
        if (!heroSection) return;

        const slides = [...heroSection.content.slides];
        if (direction === 'up' && index > 0) {
            [slides[index], slides[index - 1]] = [slides[index - 1], slides[index]];
        } else if (direction === 'down' && index < slides.length - 1) {
            [slides[index], slides[index + 1]] = [slides[index + 1], slides[index]];
        } else {
            return;
        }

        updateSectionContent('hero', { ...heroSection.content, slides });
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, slideId?: number | string) => {
        const file = event.target.files?.[0];
        if (!file || !page) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploadingId(slideId || 'global');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            const data = await response.json();
            if (data.url) {
                if (slideId) {
                    // Update specific slide image
                    const heroSection = page.sections.find(s => s.id === 'hero');
                    if (heroSection) {
                        const newSlides = heroSection.content.slides.map((s: any) =>
                            s.id === slideId ? { ...s, image: data.url } : s
                        );
                        updateSectionContent('hero', { ...heroSection.content, slides: newSlides });
                    }
                }
                toast.success("Image uploaded and optimized to WebP successfully");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload image");
        } finally {
            setUploadingId(null);
        }
    };

    if (loading) return (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-muted-foreground font-medium">Loading Page Content...</p>
            </div>
        </div>
    );

    if (!page) return <div className="p-8 text-center text-destructive">Page not found</div>;

    const heroSection = page.sections.find(s => s.id === 'hero');

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-background/95 backdrop-blur sticky top-0 z-30 py-4 border-b">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => navigate("/admin/pages")} className="rounded-full">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">{page.title}</h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Globe className="h-3.5 w-3.5" />
                            <span>SEO-Ready: {page.name === 'home' ? 'Paradip Online' : 'General'}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" asChild className="rounded-xl border-slate-200 shadow-sm">
                        <a href="/" target="_blank"><ExternalLink className="h-4 w-4 mr-2" /> Live Preview</a>
                    </Button>
                    <Button onClick={handleSave} disabled={saving} className="flex-1 md:flex-none rounded-xl shadow-lg shadow-primary/20">
                        {saving ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                        ) : <Save className="h-4 w-4 mr-2" />}
                        {saving ? "Saving..." : "Save Content"}
                    </Button>
                </div>
            </div>

            <Accordion type="multiple" defaultValue={["infobar", "hero", "products", "services", "cta"]} className="space-y-6">
                {page.sections.map((section) => (
                    <AccordionItem key={section.id} value={section.id} className="border rounded-2xl bg-card shadow-sm overflow-hidden border-slate-200">
                        <div className="flex items-center justify-between px-6 bg-slate-50/50">
                            <AccordionTrigger className="hover:no-underline py-4 flex-1">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "p-2 rounded-xl transition-colors",
                                        section.enabled ? "bg-primary/10 text-primary" : "bg-slate-200 text-slate-500"
                                    )}>
                                        <Layout className="h-5 w-5" />
                                    </div>
                                    <div className="text-left">
                                        <span className="font-bold text-slate-900 block">{section.name}</span>
                                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                                            {section.id.toUpperCase()} SECTION
                                        </span>
                                    </div>
                                    {!section.enabled && <span className="ml-2 text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Hidden</span>}
                                </div>
                            </AccordionTrigger>
                            <div className="flex items-center gap-4 pr-4">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor={`enabled-${section.id}`} className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Visibility</Label>
                                    <Switch
                                        id={`enabled-${section.id}`}
                                        checked={section.enabled}
                                        onCheckedChange={() => toggleSection(section.id)}
                                        className="data-[state=checked]:bg-emerald-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <AccordionContent className="p-0 border-t border-slate-100">
                            <div className="p-6">
                                {section.id === 'infobar' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 md:col-span-2">
                                            <Label className="text-sm font-bold text-slate-700">Headline Announcement (SEO optimized)</Label>
                                            <Input
                                                className="h-12 text-base rounded-xl border-slate-200 focus:ring-primary"
                                                placeholder="e.g., Best Laptop Repair in Paradip..."
                                                value={section.content.text || ''}
                                                onChange={(e) => updateSectionContent(section.id, { ...section.content, text: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-slate-700">Badge/Link Text</Label>
                                            <Input
                                                className="rounded-xl border-slate-200"
                                                value={section.content.linkText || ''}
                                                onChange={(e) => updateSectionContent(section.id, { ...section.content, linkText: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-slate-700">Link Destination</Label>
                                            <Input
                                                className="rounded-xl border-slate-200"
                                                value={section.content.link || ''}
                                                onChange={(e) => updateSectionContent(section.id, { ...section.content, link: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}

                                {section.id === 'hero' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <div>
                                                <h4 className="text-lg font-bold text-slate-900">Hero Slider Slides</h4>
                                                <p className="text-sm text-slate-500">Manage and reorder your homepage banners. Click a tab to edit, use arrows to change order.</p>
                                            </div>
                                            <Button variant="default" size="sm" onClick={() => {
                                                const newSlides = [...(section.content.slides || []), {
                                                    id: Date.now(),
                                                    title: 'New Service Banner',
                                                    subtitle: 'Paradip Online',
                                                    description: 'Describe your service or product here for SEO.',
                                                    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1920&auto=format&fit=crop',
                                                    cta: { text: 'Learn More', href: '/services' },
                                                    accent: 'bg-primary'
                                                }];
                                                updateSectionContent(section.id, { ...section.content, slides: newSlides });
                                            }} className="rounded-xl shadow-sm">
                                                <Plus className="h-4 w-4 mr-2" /> Add New Slide
                                            </Button>
                                        </div>

                                        {section.content?.slides && section.content.slides.length > 0 ? (
                                            <Tabs defaultValue={(section.content.slides[0]?.id || 0).toString()} className="w-full">
                                                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
                                                    <TabsList className="bg-slate-100 p-1 rounded-xl h-auto flex-nowrap min-w-max">
                                                        {section.content.slides.map((slide: any, idx: number) => (
                                                            <TabsTrigger
                                                                key={slide.id || idx}
                                                                value={(slide.id || idx).toString()}
                                                                className="rounded-lg py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                                                            >
                                                                Slide {idx + 1}
                                                            </TabsTrigger>
                                                        ))}
                                                    </TabsList>
                                                </div>

                                                {section.content.slides.map((slide: any, idx: number) => (
                                                    <TabsContent key={slide.id || idx} value={(slide.id || idx).toString()} className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                                        <div className="group relative border rounded-2xl bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">
                                                            <div className="flex items-stretch">
                                                                {/* Order Controls */}
                                                                <div className="w-12 border-r bg-slate-50/50 flex flex-col items-center justify-center gap-2 p-2">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 rounded-full hover:bg-white"
                                                                        onClick={() => handleMoveSlide('up', idx)}
                                                                        disabled={idx === 0}
                                                                    >
                                                                        <ArrowUp className="h-4 w-4" />
                                                                    </Button>
                                                                    <div className="text-xs font-bold text-slate-400">
                                                                        {idx + 1}
                                                                    </div>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 rounded-full hover:bg-white"
                                                                        onClick={() => handleMoveSlide('down', idx)}
                                                                        disabled={idx === section.content.slides.length - 1}
                                                                    >
                                                                        <ArrowDown className="h-4 w-4" />
                                                                    </Button>
                                                                </div>

                                                                {/* Slide Content */}
                                                                <div className="flex-1 p-6">
                                                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                                        {/* Image Preview & Upload */}
                                                                        <div className="space-y-4">
                                                                            <div className="flex items-center justify-between">
                                                                                <Label className="text-sm font-bold text-slate-700 uppercase tracking-tighter">Slide Image</Label>
                                                                            </div>
                                                                            <div className="relative group/img aspect-video rounded-xl overflow-hidden border bg-slate-50">
                                                                                {slide.image ? (
                                                                                    <img src={slide.image} alt="Preview" className="w-full h-full object-cover" />
                                                                                ) : (
                                                                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                                                                        <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
                                                                                        <span className="text-[10px] font-bold uppercase tracking-widest">No Image</span>
                                                                                    </div>
                                                                                )}
                                                                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                                                    <Button
                                                                                        size="sm"
                                                                                        variant="secondary"
                                                                                        className="rounded-full shadow-lg h-9"
                                                                                        onClick={() => {
                                                                                            setUploadingId(slide.id);
                                                                                            fileInputRef.current?.click();
                                                                                        }}
                                                                                        disabled={uploadingId === slide.id}
                                                                                    >
                                                                                        {uploadingId === slide.id ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" /> : <Upload className="h-4 w-4 mr-2" />}
                                                                                        Upload Photo
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                            <div className="space-y-1.5 pt-2">
                                                                                <Label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Image URL</Label>
                                                                                <Input
                                                                                    className="h-9 text-xs rounded-lg font-mono"
                                                                                    value={slide.image}
                                                                                    onChange={(e) => {
                                                                                        const slides = [...section.content.slides];
                                                                                        slides[idx].image = e.target.value;
                                                                                        updateSectionContent(section.id, { ...section.content, slides });
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        {/* Copy Management */}
                                                                        <div className="lg:col-span-2 space-y-4">
                                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                <div className="space-y-1.5">
                                                                                    <Label className="text-[10px] uppercase font-bold text-slate-500">Main Heading</Label>
                                                                                    <Input
                                                                                        className="rounded-xl h-10 ring-offset-background"
                                                                                        value={slide.title}
                                                                                        onChange={(e) => {
                                                                                            const slides = [...section.content.slides];
                                                                                            slides[idx].title = e.target.value;
                                                                                            updateSectionContent(section.id, { ...section.content, slides });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-1.5">
                                                                                    <Label className="text-[10px] uppercase font-bold text-slate-500">Subtitle/Badge</Label>
                                                                                    <Input
                                                                                        className="rounded-xl h-10 border-slate-200"
                                                                                        value={slide.subtitle}
                                                                                        onChange={(e) => {
                                                                                            const slides = [...section.content.slides];
                                                                                            slides[idx].subtitle = e.target.value;
                                                                                            updateSectionContent(section.id, { ...section.content, slides });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="space-y-1.5">
                                                                                <Label className="text-[10px] uppercase font-bold text-slate-500">Description</Label>
                                                                                <Textarea
                                                                                    className="rounded-xl resize-none min-h-[80px]"
                                                                                    value={slide.description}
                                                                                    onChange={(e) => {
                                                                                        const slides = [...section.content.slides];
                                                                                        slides[idx].description = e.target.value;
                                                                                        updateSectionContent(section.id, { ...section.content, slides });
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                                                <div className="space-y-1.5">
                                                                                    <Label className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">CTA Text</Label>
                                                                                    <Input
                                                                                        className="rounded-xl h-10"
                                                                                        value={slide.cta?.text || ''}
                                                                                        onChange={(e) => {
                                                                                            const slides = [...section.content.slides];
                                                                                            slides[idx].cta = { ...(slides[idx].cta || {}), text: e.target.value };
                                                                                            updateSectionContent(section.id, { ...section.content, slides });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className="md:col-span-2 space-y-1.5">
                                                                                    <Label className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">CTA Link</Label>
                                                                                    <Input
                                                                                        className="rounded-xl h-10"
                                                                                        value={slide.cta?.href || ''}
                                                                                        onChange={(e) => {
                                                                                            const slides = [...section.content.slides];
                                                                                            slides[idx].cta = { ...(slides[idx].cta || {}), href: e.target.value };
                                                                                            updateSectionContent(section.id, { ...section.content, slides });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                                                                <div className="flex items-center gap-2">
                                                                                    <Label className="text-[10px] uppercase font-black text-slate-400">Accent Color</Label>
                                                                                    <div className="flex gap-1.5">
                                                                                        {['bg-blue-600', 'bg-emerald-600', 'bg-rose-600', 'bg-indigo-600', 'bg-violet-600', 'bg-amber-600', 'bg-cyan-600'].map(c => (
                                                                                            <button
                                                                                                key={c}
                                                                                                onClick={() => {
                                                                                                    const slides = [...section.content.slides];
                                                                                                    slides[idx].accent = c;
                                                                                                    updateSectionContent(section.id, { ...section.content, slides });
                                                                                                }}
                                                                                                className={cn(
                                                                                                    "h-5 w-5 rounded-full border-2",
                                                                                                    c,
                                                                                                    slide.accent === c ? "border-slate-900 ring-2 ring-slate-200" : "border-transparent"
                                                                                                )}
                                                                                            />
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    className="h-8 text-[10px] font-black uppercase text-destructive hover:bg-destructive/5"
                                                                                    onClick={() => {
                                                                                        const newSlides = section.content.slides.filter((_: any, i: number) => i !== idx);
                                                                                        updateSectionContent(section.id, { ...section.content, slides: newSlides });
                                                                                    }}
                                                                                >
                                                                                    <Trash2 className="h-3.5 w-3.5 mr-1" /> Remove Slide
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabsContent>
                                                ))}
                                            </Tabs>
                                        ) : (
                                            <div className="text-center py-12 border-2 border-dashed rounded-2xl bg-slate-50">
                                                <p className="text-slate-500 mb-4">No slides configured for this section yet.</p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        const newSlides = [{
                                                            id: Date.now(),
                                                            title: 'New Service Banner',
                                                            subtitle: 'Paradip Online',
                                                            description: 'Describe your service or product here for SEO.',
                                                            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1920&auto=format&fit=crop',
                                                            cta: { text: 'Learn More', href: '/services' },
                                                            accent: 'bg-primary'
                                                        }];
                                                        updateSectionContent(section.id, { ...section.content, slides: newSlides });
                                                    }}
                                                >
                                                    <Plus className="h-4 w-4 mr-2" /> Add First Slide
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {section.id === 'products' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-slate-700">Badge / Subtitle</Label>
                                                <Input
                                                    className="h-12 rounded-xl"
                                                    value={section.content.badge || ''}
                                                    onChange={(e) => updateSectionContent(section.id, { ...section.content, badge: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-slate-700">Main Section Title</Label>
                                                <Input
                                                    className="h-12 text-lg font-semibold rounded-xl"
                                                    value={section.content.title || ''}
                                                    onChange={(e) => updateSectionContent(section.id, { ...section.content, title: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-slate-700">Description</Label>
                                            <Textarea
                                                className="rounded-xl resize-none h-20"
                                                value={section.content.description || ''}
                                                onChange={(e) => updateSectionContent(section.id, { ...section.content, description: e.target.value })}
                                            />
                                        </div>
                                        <div className="pt-4 border-t border-slate-100 italic text-xs text-slate-500">
                                            Note: Products are automatically pulled from the Products Management section.
                                        </div>
                                    </div>
                                )}

                                {section.id === 'services' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-slate-700">Badge / Subtitle</Label>
                                                <Input
                                                    className="h-12 rounded-xl"
                                                    value={section.content.badge || ''}
                                                    onChange={(e) => updateSectionContent(section.id, { ...section.content, badge: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-slate-700">Main Section Title</Label>
                                                <Input
                                                    className="h-12 text-lg font-semibold rounded-xl"
                                                    value={section.content.title || ''}
                                                    onChange={(e) => updateSectionContent(section.id, { ...section.content, title: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-slate-700">Description</Label>
                                            <Textarea
                                                className="rounded-xl resize-none h-20"
                                                value={section.content.description || ''}
                                                onChange={(e) => updateSectionContent(section.id, { ...section.content, description: e.target.value })}
                                            />
                                        </div>
                                        <div className="pt-4 border-t border-slate-100 italic text-xs text-slate-500">
                                            Note: Top 6 enabled services are automatically pulled from the Services Management section.
                                        </div>
                                    </div>
                                )}

                                {section.id === 'cta' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-slate-700">Main Section Title</Label>
                                                <Input
                                                    className="h-12 text-lg font-semibold rounded-xl"
                                                    value={section.content.title || ''}
                                                    onChange={(e) => updateSectionContent(section.id, { ...section.content, title: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-slate-700">Short Description</Label>
                                                <Textarea
                                                    className="rounded-xl resize-none h-12"
                                                    value={section.content.description || ''}
                                                    onChange={(e) => updateSectionContent(section.id, { ...section.content, description: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                                <Label className="text-xs font-black text-primary uppercase tracking-widest mb-4 block">Primary Button (Phone/Booking)</Label>
                                                <div className="flex flex-col gap-3">
                                                    <Input placeholder="Button Text" className="rounded-xl" value={section.content.primaryCta?.text || ''} onChange={(e) => updateSectionContent(section.id, { ...section.content, primaryCta: { ...section.content.primaryCta, text: e.target.value } })} />
                                                    <Input placeholder="Link (tel:+91...)" className="rounded-xl" value={section.content.primaryCta?.href || ''} onChange={(e) => updateSectionContent(section.id, { ...section.content, primaryCta: { ...section.content.primaryCta, href: e.target.value } })} />
                                                </div>
                                            </div>
                                            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                                <Label className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4 block">Secondary Button (WhatsApp)</Label>
                                                <div className="flex flex-col gap-3">
                                                    <Input placeholder="Button Text" className="rounded-xl" value={section.content.secondaryCta?.text || ''} onChange={(e) => updateSectionContent(section.id, { ...section.content, secondaryCta: { ...section.content.secondaryCta, text: e.target.value } })} />
                                                    <Input placeholder="WhatsApp Link" className="rounded-xl" value={section.content.secondaryCta?.href || ''} onChange={(e) => updateSectionContent(section.id, { ...section.content, secondaryCta: { ...section.content.secondaryCta, href: e.target.value } })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div >
    );
};

export default PageEditor;
