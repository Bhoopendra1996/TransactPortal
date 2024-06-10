import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('clientId');
        navigate("/login", { replace: true });
    }, [navigate]);

    return null;
}

export default Logout;
