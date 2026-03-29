import { useDispatch } from "react-redux";
import { register, login, logout as logoutApi, getCurrentUser } from "../services/auth.api";
import { setUser, setLoading, setError, logoutUser } from "../auth.slice";

export function useAuth() {
    const dispatch = useDispatch();

    async function handleRegister({email, username, password}) {
        try {
            dispatch(setLoading(true));
            const data = await register({email, username, password});
            dispatch(setUser(data.user));
        } catch (error) {
            dispatch(setError(error.message || "Registration failed"));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({email, password}) {
        try {
            dispatch(setLoading(true));
            const data = await login({email, password});
            dispatch(setUser(data.user));
        } catch (error) {
            dispatch(setError(error.message || "Login failed"));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogout() {
        try {
            dispatch(setLoading(true));
            await logoutApi();
            dispatch(logoutUser());
        } catch (error) {
            dispatch(setError(error.message || "Logout failed"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function fetchCurrentUser() {
        try {
            dispatch(setLoading(true));
            const data = await getCurrentUser();
            dispatch(setUser(data.user));
        } catch (error) {
            dispatch(setError(error.message || "Failed to fetch current user"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleLogout,   // ← naam bhi badla
        fetchCurrentUser,
    }
}