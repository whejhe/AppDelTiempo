// src/api/apiClient.js
import axios from 'axios';

// const apiKey = 'c4JkbTQyZAhyMfqQldTpPtFNoMdk8wyzWfwM4F0825ikQYSM4TKOlIwY';
const baseURL = 'https://www.el-tiempo.net/api/json/v2/provincias/';

const apiClient = async () => {
    const response = await axios.get(baseURL,{
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${apiKey}`,
        }
    });
    
    return response.data;
};

export default apiClient;
