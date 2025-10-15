import type { AxiosInstance } from "axios"
import { RequestConfig } from "./requestConfig"
import axios from "axios"


export class Client {
    private instance: AxiosInstance

    constructor() {
        this.instance = axios.create({})

        this.instance.interceptors.response.use(
        (res) => {
            return res;
        },
        (error) => {
            if (error?.response?.status === 404) {
                // Handle not found error
            }
            if (error?.response?.status === 403) {
            // Handle forbidden error
            }
            if (error?.response?.status === 401) {
            // Handle unauthorized error (e.g., log out the user)
            }
            console.error("API Error:", error?.message || "Unknown Error");
            throw error; // Propagate the error
        }
        );
    }

    async sendRequest(requestConfig: RequestConfig): Promise<void| any> {
        try {
            let modifiedRequestConfig = {
                ...requestConfig
            }
            const response = await this.instance.request(modifiedRequestConfig)
            return response.data
        } catch (error: unknown) {
            throw error
        }
    }
}