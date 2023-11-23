import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useUserData } from '../../service/userService';
import { getUserById, partenaireLink } from '../../service/apiService';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const QrcodeScanner = () => {
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

    const handleScan = async (data) => {
        if (data) {
            try {
                // Appeler la fonction partenaireLink avec les informations nécessaires
                await partenaireLink(data, userId, accessToken);
                toast.success('Partenaire lié avec succès !');
            } catch (error) {
                console.error(error);
                toast.error('Erreur lors de la liaison avec le partenaire.');
            }
        }
    };

    const handleError = (error) => {
        console.error(error);
        toast.error('Erreur lors de la lecture du code QR.');
    };

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            {userCode && (
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                />
            )}
        </div>
    );
};

export default QrcodeScanner;
