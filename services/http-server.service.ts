import HttpClientService from "./http-client.service";

class AdminHttpService extends HttpClientService {
    public static getServer = async (url: string, token : string) => {
        const api = this.api(token)
        return await api.get(url)
    }

    public static postServer = async (url: string, token: string, data: any) => {
        const api = this.api(token)
        return await api.post(url, data)
    }

    public static deleteServer = async (url: string, token:string) => {
        const api = this.api(token)
        return await api.delete(url)
    }
}

export default AdminHttpService