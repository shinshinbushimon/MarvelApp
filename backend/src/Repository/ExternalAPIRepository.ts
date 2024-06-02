import axios from "axios";
import { DeepLResponse } from "../type";
import { logger } from "../util/Logger";

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

    textTranslate = async (text: string, targetLang: string): Promise<string> => {
        const apiKey = process.env.DEEPL_API_KEY;
        const params = new URLSearchParams();
        params.append('auth_key', apiKey);
        params.append('text', text);
        params.append('target_lang', targetLang);

        try {
            const response = await axios.post(this.baseUrl,params.toString(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
    
            const data: DeepLResponse = response.data;
            console.log('apikデータはこちらです', data);
            logger.info('apikデータはこちらです', data.translations[0].text);
            return data.translations[0].text;
        } catch (error) {
            logger.error(error.message);
        }
    }
}

export default ExternalAPIRepository;