import React from 'react';
import Header from "../../Header/Header";
import Banner from "../../Banner/Banner";
import Progress from "../../Progress/Progress";
import ReportStart from "../../ReportStart/ReportStart";
import Form from "../../Form/Form";
import "./Started.scss";
const Started = () => {
    return (
        <div className="Started">
            <Header/>
            <Banner/>
            <div className="container-fluid">
            <div className="Started__form col-md-6 mx-auto p-3 mb-3 shadow-lg bg-body rounded">
                <Progress/>
                <div className="Started__reportStart">
                    <ReportStart/>
                </div>
                <Form/>
            </div>
            </div>
        </div>
    );
};

export default Started;
