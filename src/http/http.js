import { fetch } from "@tauri-apps/plugin-http";
import { TokenInterceptor } from './interceptor'
import { CONSTANTS } from "../constants";
import { SendNotification } from "../utils";

class HttpClient {
    constructor(baseURL, options) {
        this.baseURL = baseURL
        this.options = options
        this.requestInterceptors = []
        this.responseInterceptors = []
        this.defaultHeaders = {}
    }
    addRequestInterceptor(interceptor) {
        this.requestInterceptors.push(interceptor)
        return this
    }
    addResponseInterceptor(interceptor) {
        this.responseInterceptors.push(interceptor)
        return this
    }
    setHeader(key, value) {
        this.defaultHeaders[key] = value
        return this
    }
    async request(endpoint, data = {}, method = "GET") {
        try {
            const url = `${this.baseURL}${endpoint}`
            if (method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE") {
                this.setHeader("Content-Type", "application/json")
            }
            let config = {
                url,
                method,
                data,
                headers: this.defaultHeaders
            }
            this.requestInterceptors.forEach(interceptor => {
                config = interceptor(config)
            })
            let response = await fetch(config.url, {
                connectTimeout: this.options.connectTimeout,
                maxRedirections: this.options.maxRedirections,
                method: config.method,
                headers: config.headers,
                body: config.method.toUpperCase() === "GET" ? null : JSON.stringify(config.data)
            })
            if (!response.ok) {
                throw new HttpError(response.statusText, response.status)
            }
            this.responseInterceptors.forEach(interceptor => {
                response = interceptor(response)
            })
            return await response.json()
        }
        catch (error) {
            if (error instanceof HttpError) {
                await SendNotification('Error', error.message, 'error')
            }
            throw error
        }
    }
}

class HttpError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = statusCode
    }
}

const GlobalHttp = new HttpClient(CONSTANTS.API_INTERFACE, {
    connectTimeout: 3000,
    maxRedirections: 0,
}).addRequestInterceptor(TokenInterceptor)

export { GlobalHttp, HttpError }
