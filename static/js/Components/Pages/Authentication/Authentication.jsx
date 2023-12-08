import React from 'react';
import "./Authentication.scss";
import Header from "../../Header/Header";
import AuthenticationContent from "../../AuthenticationContent/AuthenticationContent";
const Authentication = () => {
    return (
        <div className="auth">
            <Header/>
            <AuthenticationContent/>
        </div>
    );
};

export default Authentication;
