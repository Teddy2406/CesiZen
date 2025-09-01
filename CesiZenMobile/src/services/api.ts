// src/services/api.ts

const API_BASE_URL: string = __DEV__
    ? 'http://172.20.10.2:8081/api' // Mets ton IP locale ici
    : 'https://your-production-api.com';

type HeadersInit = Record<string, string>;

class ApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_BASE_URL;
        console.log(`🌐 API connectée à : ${this.baseUrl}`);
    }

    private async request<T = any>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(options.headers as HeadersInit),
        };

        const config: RequestInit = {
            ...options,
            headers,
        };

        try {
            console.log(`🔍 Appel API: ${url}`);
            const response = await fetch(url, config);

            const contentType = response.headers.get('Content-Type') || '';
            const isJson = contentType.includes('application/json');

            if (!response.ok) {
                const errorData = isJson ? await response.json() : null;
                throw new Error(
                    errorData?.message || `Erreur ${response.status} ${response.statusText}`
                );
            }

            return isJson ? await response.json() : ({} as T);
        } catch (error) {
            console.error('❌ API Error:', error);
            throw error;
        }
    }

    // 🔐 POST login avec username/password
    async login(credentials: { username: string; password: string }): Promise<any> {
        return this.request('/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    // 🧪 Méthode POST générique
    async post<T = any>(endpoint: string, data: object): Promise<T> {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}

export default new ApiService();
