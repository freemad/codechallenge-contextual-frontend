import axios from 'axios';
import {WEB_KEYS} from "../common/StringValues";

const API_BASE_URL = 'http://localhost:8000';
const postContentTypeJson = {'Content-Type': 'application/json',};

const ApiService = {

    apiGetLogon: async (instanceId) => {
        const apiLogon = `${API_BASE_URL}/dashboard/logon/`;
        try {
            const logonUrl = instanceId != null
                ? apiLogon + `?` + WEB_KEYS.instanceId + `=${instanceId}`
                : apiLogon;
            return await axios.get(logonUrl);
        } catch (error) {
            console.error('Error getting logon:', error);
            throw error;
        }
    },

    apiGetLogoff: async (instanceId) => {
        const apiLogoff = `${API_BASE_URL}/dashboard/${instanceId}/logoff/`;
        try {
            return await axios.get(apiLogoff);
        } catch (error) {
            console.error('Error getting logon:', error);
            throw error;
        }
    },

    apiGetStatuses: async (instanceId, chartGranularity) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/dashboard/${instanceId}/statuses/?timedelta=${chartGranularity}`);
            return response.data.statuses; // Assuming statuses is the relevant data
        } catch (error) {
            console.error('Error getting statuses:', error);
            throw error;
        }
    },

    apiPostEvents: async (instanceId, data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/analytics/${instanceId}/events/`, data, {
                headers: postContentTypeJson,
            });
            return response.data;
        } catch (error) {
            console.error('Error posting events:', error);
            throw error;
        }
    }

};

export default ApiService;
