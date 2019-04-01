import React from 'react';

class TopTen extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            summedEmissions: null

        }
    }


    calcaluteTopEmissionsForCountries() {
        const data = this.props.emissionData;

        console.log(data)

        const summedEmissions = Object.keys(data).map(countryName => {

            const countryData = data[countryName];


            const summedEmissionsForCountry = countryData.reduce((currentSum, nextYear) => {
                return currentSum + (nextYear.emission ? parseInt(nextYear.emission, 10) : 0);
            }, 0);

            return({
                name: countryName,
                summedEmissions: summedEmissionsForCountry

            })

        })

        const sortedEmissions = summedEmissions.sort((country1, country2) => {
            return country2.summedEmissions - country1.summedEmissions;
        });

        const sliced = Object.entries(sortedEmissions).slice(0,2).map(entry => entry[1]);


        return sortedEmissions;


    }


    render(){

        const calcaluteTopEmissionsForCountries = this.calcaluteTopEmissionsForCountries.bind(this);

        return (
            <select className="sorted-list">
                {calcaluteTopEmissionsForCountries().map(m => {
                    return <option>{m.name} : {m.summedEmissions + " tons"}</option>
                })}

            </select>
        );
    }
};

export default TopTen;