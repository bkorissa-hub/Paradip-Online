const API_BASE_URL = "/api";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Helper to get auth headers
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('pol_admin_token');
  const headers: HeadersInit = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return {
      data: null,
      error: errorData.message || `Error: ${response.status} ${response.statusText}`
    };
  }
  const data = await response.json();
  return { data, error: null };
}

export async function get<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: "Network error. Please check if the server is running." };
  }
}

export async function post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: "Network error. Please check if the server is running." };
  }
}

export async function put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: "Network error. Please check if the server is running." };
  }
}

export async function patch<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: "Network error. Please check if the server is running." };
  }
}



export async function del<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: "Network error. Please check if the server is running." };
  }
}

// FormData POST for file uploads
export async function postFormData<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: "Network error. Please check if the server is running." };
  }
}

// FormData PUT for file uploads with updates
export async function putFormData<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: formData,
    });
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: "Network error. Please check if the server is running." };
  }
}

// Upload images to Cloudinary via backend
export async function uploadImages(files: File[]): Promise<ApiResponse<{ url: string; public_id: string }[]>> {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });
    return handleResponse<{ url: string; public_id: string }[]>(response);
  } catch (error) {
    return { data: null, error: "Failed to upload images." };
  }
}

// Upload single image
export async function uploadImage(file: File): Promise<ApiResponse<{ url: string; public_id: string }>> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });
    return handleResponse<{ url: string; public_id: string }>(response);
  } catch (error) {
    return { data: null, error: "Failed to upload image." };
  }
}
