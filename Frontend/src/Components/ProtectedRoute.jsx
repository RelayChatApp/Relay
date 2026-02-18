import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/auth/me", {
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
