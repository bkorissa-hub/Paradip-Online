import { get, post, put, del } from './apiClient';

export interface Category {
    id: string;
    name: string;
    slug: string;
    section: 'Sales' | 'Service' | 'Blog';
    description?: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export const getCategories = async (section?: string, isActive?: boolean) => {
    let url = 'categories';
    const params = new URLSearchParams();
    if (section) params.append('section', section);
    if (isActive !== undefined) params.append('isActive', isActive.toString());

    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    return get<Category[]>(url);
};

export const createCategory = async (categoryData: Partial<Category>) => {
    return post<Category>('categories', categoryData);
};

export const updateCategory = async (id: string, categoryData: Partial<Category>) => {
    return put<Category>(`categories/${id}`, categoryData);
};

export const deleteCategory = async (id: string) => {
    return del<{ message: string }>(`categories/${id}`);
};
