import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [status, setStatus] = useState("loading");
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/me`, {
                    method: "GET",
                    credentials: "include",
                });

                if (res.ok) {
                    setStatus("authenticated");
                } else {
                    setStatus("unauthenticated");
                }
            } catch {
                setStatus("unauthenticated");
            }
        };

        verifyAuth();
    }, []);

    if (status === "loading") return null;

    if (status === "unauthenticated") {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
