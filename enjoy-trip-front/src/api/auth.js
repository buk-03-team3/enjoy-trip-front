import http from '@/common/axios-config.js'

const auth = async () => {
    try {
        await http.get('/auth/check', { withCredentials: true });
        return true;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return false;
        }
        throw error;
    }
};

export default auth;