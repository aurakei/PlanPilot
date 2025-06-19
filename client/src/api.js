import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/api', // Adjust if your backend runs on a different port or URL
  withCredentials: true, // Needed if using cookies for auth, not needed for token auth
  headers: {
    'Accept': 'application/json',
  },
});

export default api; 