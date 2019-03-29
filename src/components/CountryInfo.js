import React from "react";
import "./Input.css";


class CountryInfo extends React.Component {

    constructor(){
        super();
        this.state = {
            population: null,
            emission: null,
            emissionDatabyName: false,
            yearOne: null
        }
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
            return <div onClick={() => showPopulation(oneYear)}>{oneYear.year}</div>

        });



    return(
        <div>
            {this.props.emissionData[this.props.countryName]  ?
             <div className="dropdown">
                <button className="dropbtn">Years</button>
                    <div className="dropdown-content">
                        <div class="dropdown-list" >{years}</div>
                    </div>
             </div> : <div></div>}



            {this.props.emissionData[this.props.countryName] && this.state.emissionDatabyName ?
                <div>
                    <div className="year"> ({this.state.yearOne}) </div>

                    <div class="boxPopulation">
                        { this.state.population ? <li className = "population" >Population: {this.state.population}</li> : "" }
                    </div>
                    <div className="boxEmission">
                        { this.state.emission ? <li className = "emission"> Emission: {this.state.emission}</li> : "" }
                    </div>
                    <div className="boxEmissionPerCapita">
                        { this.emissionPerCapita()}
                    </div>
                </div> : <div></div>
            }



        </div>
    )
}


}

export default CountryInfo;