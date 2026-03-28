import { get, put, patch, ApiResponse } from './apiClient';

export interface PageSection {
    id: string;
    name: string;
    content: any;
    enabled: boolean;
}

export interface Page {
    name: string;
    title: string;
    sections: PageSection[];
    updatedAt?: string;
}

export const pagesApi = {
    getAllPages: async (): Promise<ApiResponse<Page[]>> => {
        return get<Page[]>('pages');
    },

    getPage: async (name: string): Promise<ApiResponse<Page>> => {
        return get<Page>(`pages/${name}`);
    },

    updatePage: async (name: string, data: Partial<Page>): Promise<ApiResponse<Page>> => {
        return put<Page>(`pages/${name}`, data);
    },

    updateSection: async (
        pageName: string,
        sectionId: string,
        data: { content?: any; enabled?: boolean }
    ): Promise<ApiResponse<PageSection>> => {
        return patch<PageSection>(`pages/${pageName}/sections/${sectionId}`, data);
    }
};
