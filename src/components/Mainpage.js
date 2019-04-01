import React from 'react';
import './style.css';
import cow from './cow.png';
import car from '../car.png';
import airplane from '../airplane.png';

class Mainpage extends React.Component{

    constructor(){
        super();
        this.state = {
            showCow: false,
            showCar: false,
            showAirplane: false

        }

    }

    hideImageAndShowAnswer(symbol){

        this.setState({
            showCow: symbol === "cow",
            showCar: symbol === "car",
            showAirplane: symbol === "airplane"
        })

    }
    render(){

    const hideImageAndShowAnswer = this.hideImageAndShowAnswer.bind(this);

        return (
            <div>
                <h2 className="headline">Welcome to Raising Awareness page </h2>
                <div className="main-text">Here you can find countries CO2 emissions and compare them to the Great Powers.</div>
                <div className="question">But first a million dollar question: What are you willing to give up to reduce CO2 emissions? </div>

                <ul className="image-container">
                    {
                        !this.state.showCow ? <li><img onClick={() => hideImageAndShowAnswer("cow")} src={cow} alt="cow" className="cow"/></li> :
                      <div className="cow-answer">
                          By halving the consumption of beef, you
                          reduce emissions by the lion's weight,
                          ie an average of 200 kg CO2 eq. per year.
                      </div>
                    }
                    {
                        !this.state.showCar ? <li><img  onClick={() => hideImageAndShowAnswer("car")} src={car} alt="car" className="car"/></li> :
                            <div className="car-answer">
                                By replacing hundred kilometers of
                                driving in a week with cycling for half a year
                                you'll reduce your emissions by the weight of a polar bear
                                or about 470kg C02eq. per year.
                            </div>

                    }
                    {
                        !this.state.showAirplane ? <li><img onClick={() => hideImageAndShowAnswer("airplane")} src={airplane}
                                 alt="airplane" className="airplane"/></li>:
                        <div className="airplane-answer">
                            Replacing a South European flight by train to St. Petersburg
                            reduces emissions by the weight of a seahorse,
                            or about 1140 kg CO2eq. per year.
                        </div>
                    }

                </ul>

            </div>
        );
    }
    ;
}

export default Mainpage;