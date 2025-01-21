type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

interface RequestConfig {
    method: RequestMethod
    headers?: HeadersInit
    body?: BodyInit | null
}

type RequestInterceptor = (config: RequestConfig) => RequestConfig

type ResponseInterceptor = <T>(data: T) => T

class HttpError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
        this.name = "HttpError"
    }
}

class HttpClient {
    private baseURL: string
    private defaultHeaders: HeadersInit
    private requestInterceptors: RequestInterceptor[] = []
    private responseInterceptors: ResponseInterceptor[] = []

    constructor(baseURL: string = "") {
        this.baseURL = baseURL
        this.defaultHeaders = {}
    }

    public setHeader(key: string, value: string): void {
        this.defaultHeaders[key] = value
    }

    public addRequestInterceptor(interceptor: RequestInterceptor): void {
        this.requestInterceptors.push(interceptor)
    }

    public addResponseInterceptor(interceptor: ResponseInterceptor): void {
        this.responseInterceptors.push(interceptor)
    }

    public async request<T = any>(
        url: string,
        method: RequestMethod = "GET",
        data?: Record<string, any>
    ): Promise<T> {
        try {
            const fullURL: string = `${this.baseURL}${url}`
            let config: RequestConfig = {
                method,
                headers: { ...this.defaultHeaders }
            }
            if (method === "POST" || method === "PATCH" || method === "PUT") {
                if (config.headers) {
                    config.headers["Content-Type"] = "application/json"
                }
                config.body = JSON.stringify(data)
            }
            config = this.requestInterceptors.reduce((cnf, interceptor) => interceptor(cnf), config)

            const response = await fetch(fullURL, config)

            if (!response.ok) {
                throw new HttpError(response.statusText, response.status)
            }
            let responseData: T = await response.json()
            responseData = this.responseInterceptors.reduce((currentData, interceptor) => interceptor(currentData), responseData)
            return responseData
        }
        catch (error) {
            if (error instanceof HttpError) {
                console.error(`HTTP Error: ${error.message} (Status: ${error.status})`)
            } else {
                console.error("Request failed:", error);
            }
            throw error
        }
    }

    public get<T = any>(url: string): Promise<T> {
        return this.request<T>(url, "GET")
    }

    public post<T = any>(url: string, data?: Record<string, any>): Promise<T> {
        return this.request<T>(url, "POST", data)
    }

    public put<T = any>(url: string, data?: Record<string, any>): Promise<T> {
        return this.request<T>(url, "PUT", data)
    }

    public delete<T = any>(url: string): Promise<T> {
        return this.request<T>(url, "DELETE")
    }
}
