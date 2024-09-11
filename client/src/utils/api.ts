import axios from 'axios';

const accessToken = "ahhasjbf23r98ge9c";

const apiClient = axios.create({
    baseURL: 'http://localhost:7000/api/v1/',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'UserId': 272004
    }
});

export default apiClient;
