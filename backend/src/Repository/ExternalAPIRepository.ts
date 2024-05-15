import axios from "axios";

class ExternalAPIRepository {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    fetchData = async (endpoint: string): Promise<any> =>  {
        try {
            const response = await axios.get(`${this.baseUrl}${endpoint}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data from external API:', error);
            throw error;
        }
    }
}

export default ExternalAPIRepository;