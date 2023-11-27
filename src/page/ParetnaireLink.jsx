import React from 'react';
import Qrcode from '../components/Users/Qrcode';
import Partenaire from '../components/Users/Partenaire';
import SearchBar from '../components/Static/SearchBar';

const ParetnaireLink = () => {
    return (
        <>
            <SearchBar />
            <div className='ContainerQr'>
                <Qrcode />
                <Partenaire />
            </div>
        </>
    );
};

export default ParetnaireLink;