import axios from 'axios';

const accessToken = "ahhasjbf23r98ge9c";

const id = JSON.parse(localStorage.getItem('user') || '{}')?.id

const apiClient = axios.create({
    baseURL: 'http://localhost:7000/api/v1/',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'student-id': id
    }
});

export default apiClient;
