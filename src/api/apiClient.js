// src/api/apiClient.js
import axios from 'axios';

const baseURL = 'https://www.el-tiempo.net/api/json/v2/provincias/';

export const getWeatherByProvince = async (provinceCode) => {
    try {
        const response = await axios.get(`${baseURL}${provinceCode}`, {
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el clima:', error);
        throw error;
    }
};
