import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FileText,
    ChevronRight,
    Clock,
    Edit,
    Layout
} from "lucide-react";
import { pagesApi, Page } from "@/api/pagesApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

const Pages = () => {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const { data } = await pagesApi.getAllPages();
                if (data) setPages(data);
            } catch (error) {
                console.error("Error fetching pages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPages();
    }, []);

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-48" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2].map((i) => (
                        <Skeleton key={i} className="h-40 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Website Pages</h2>
                    <p className="text-muted-foreground">
                        Manage the content and sections of your website's pages.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map((page) => (
                    <Card key={page.name} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Layout className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {page.updatedAt ? formatDistanceToNow(new Date(page.updatedAt), { addSuffix: true }) : 'Never'}
                                </div>
                            </div>
                            <CardTitle className="mt-4">{page.title}</CardTitle>
                            <CardDescription>
                                Slug: <code className="bg-muted px-1 rounded">{page.name}</code>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full mt-4" variant="outline">
                                <Link to={`/admin/pages/${page.name}`}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Content
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Pages;
