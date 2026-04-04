import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth);

    if (loading) return (
        <div className="flex min-h-screen items-center justify-center bg-[#0f1424]">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
                <h1>Loading...</h1>
        </div>
    );  // ← yeh hona chahiye

    if (!user) return <Navigate to="/login" />;

    return children;
};

export default Protected;

