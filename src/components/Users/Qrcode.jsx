import React, { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { useUserData } from '../../service/userService';
import { getUserById } from '../../service/apiService';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Qrcode = () => {
    const { userId, accessToken } = useUserData();
    const [userCode, setUserCode] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) {
                    const response = await getUserById(userId, accessToken);
                    setUserCode(response.shareCode);
                } else {
                    navigate('/login');
                }
            } catch (e) {
                console.error(e);
                throw e;
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId, accessToken, navigate]);

    return (
        <div style={{textAlign:'center'}}>
            <Toaster position="top-center" reverseOrder={false} />
            {userCode && <QRCode value={userCode} />}
            <h4>{userCode}</h4>
        </div>
    );
};

export default Qrcode;
