import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:3000/api/auth",
    baseURL:"http://localhost:3000",
    withCredentials: true, 
})

export async function register({email, username, password}) {
    try {
        const response = await api.post("/api/auth/register", {
            email,
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Registration failed");
    }
}
    

export async function login({email, password}) {
    try {
        const response = await api.post("/api/auth/login", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Login failed");
    }
}

export async function logout() {
    try {
        const response = await api.post("/api/auth/logout");
        return response.data;
    } catch (error) {
        console.error("Logout error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Logout failed");
    }
}

export async function getCurrentUser() {
    try {
        const response = await api.get("/api/auth/me");
        return response.data;
    } catch (error) {
        console.error("Get current user error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to get current user");
    }
}