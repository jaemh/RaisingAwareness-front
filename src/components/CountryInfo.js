import React from "react";
import "./style.css";


class CountryInfo extends React.Component {

    constructor(){
        super();
        this.state = {
            population: null,
            emission: null,
            emissionDatabyName: false,
            yearOne: "Select year",
            displayMenu: false,

        }

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    }

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }

    showPopulation = (oneYear) => {

        const emissionDatabyYear = this.props.emissionData[this.props.countryName].filter(yearOne => {

            if(yearOne.year === oneYear.year){
                return true;
            }else{
                return false;
            }
        });

        const emission = emissionDatabyYear[0].emission || 'No data available';


        console.log(oneYear.population);
        console.log(emission);

        this.setState({
            population: oneYear.population,
            emission: emission,
            emissionDatabyName: emissionDatabyYear,
            yearOne: oneYear.year

        });



    };

    emissionPerCapita = () => {
       const { emission, population } = this.state;

       let perCapita = (((emission/population) * 1000).toFixed(2) + " tons per capita");

           return perCapita;
    }




render(){

    const showPopulation = this.showPopulation.bind(this);

        let years = this.props.countryInfo.map(oneYear => {
            return <li onClick={() => showPopulation(oneYear)}>{oneYear.year}</li>


        });


    return(
        <div>
            <div className="container-countryInfo">
                {this.props.emissionData[this.props.countryName]  ?
                    <button className="select-year" onClick={this.showDropdownMenu}>{this.state.yearOne}</button> :
                    null
                }

                {this.state.displayMenu ?
                    <ul className="ul-years">
                        <li>{years}</li>
                    </ul> : null
                }



                {this.props.emissionData[this.props.countryName] && this.state.emissionDatabyName ?
                    <ul className="container-info">
                        {this.state.population ? <li className="population" >Population: {this.state.population}</li> : "" }
                        {this.state.emission ? <li className="emission">  CO2 emission: {this.state.emission}</li> : "" }
                        <li className="emission-per-capita">{ this.emissionPerCapita()} </li>

                    </ul> : null
                }

            </div>
        </div>
    )
}


}

export default CountryInfo;