import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useUserData } from '../../service/userService';
import { partenaireLink } from '../../service/apiService';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Static/SearchBar';

const QrcodeScanner = () => {
    const [data, setData] = useState('No result');
    const { userId, accessToken } = useUserData();
    const navigate = useNavigate();

    useEffect(() => {
        if (userId && accessToken) {
            linkPartenaire(data);
        }
    }, [userId, accessToken, data]);

    const handleScan = (result, error) => {
        if (!!result) {
            setData(result.text);
        }

        if (!!error) {
            console.info(error);
        }
    };

    const linkPartenaire = async (resultText) => {
        try {
            console.log(userId);
            const response = await partenaireLink(resultText, userId, accessToken);
            toast.success('Partenaire lié avec succès');
            console.log(response);
            navigate('/profil');
        } catch (error) {
            console.error('Erreur lors de la liaison du partenaire :', error);
        }
    };

    return (
        <>
        <SearchBar />
            <Toaster position="top-center" reverseOrder={false} />
            <QrReader
               onResult={handleScan}
               style={{ width: '50%' }}
               facingMode="environment"
            />
        </>
    );
};

export default QrcodeScanner;
