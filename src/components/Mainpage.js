import React from 'react';
import './style.css';

class Mainpage extends React.Component
{
    render()
    {
        return (
            <div>
                <h2 className="headline">Welcom to Rasing Awarness page </h2>
                <div className="main-text">Here you can find countries' CO2 emissions and compare them to the Great Power countries.</div>
                <div className="question">But first million dollar question: What Are You Willing to Give Up to reduce CO2 emission? </div>
            </div>
        );
    }
    ;
}

export default Mainpage;