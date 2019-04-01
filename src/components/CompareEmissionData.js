import React from 'react';
import './style.css'

class CompareEmissionData extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            list: [],
            displayMenu: false,
            selectedCountry: null,
            selectedGPCountry: null,
            selectedYear: null,
            gpEmissionData: null,
            countryEmissionData: null,
            input: '',
            GPlist: ["China", "European Union", "France", "Germany", "Japan","Russian Federation", "United Kingdom", "United States"],



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



    searchCountry(e) {
        e.preventDefault();

        let query = [];

        if (e.target.value !== '') {

            Object.keys(this.props.data).map(key => {
                if (key.toLowerCase().indexOf(e.target.value) !== -1) {
                    if (query.length < 10) {
                        query.push(key);
                        //console.log("key", key);
                    }
                }
            });
        }

        this.setState({
            selectedCountry: null,
            list: query,
            input: e.target.value
        })
    }

    clickHandler = (selectedCountry) => {
        console.log("clicked country is " + selectedCountry);

        this.setState({
            selectedCountry: selectedCountry,
            input: ''});

    }

    setGPCountry = (e) => {
        const value = e.target.value;
       // console.log(value);

        this.setState({
            selectedGPCountry: value
        })
    }

    setYear = (e) => {
        const year = e.target.value;

        console.log(year);

        this.setState({
            selectedYear: year,

        })
    }



    getYearsFromData(){
        if(this.props.data.Aruba) {
            return this.props.data.Aruba.map(yearData => {
                return yearData.year
            });
        } else {
            return [];
        }
    }


    compareCountries = (e) => {
        e.preventDefault();
        if(!this.state.selectedCountry || !this.state.selectedGPCountry || !this.state.selectedYear) {
            return "Missing selections";
        }


        const gpPopulationData = this.props.data[this.state.selectedGPCountry].filter(yearlyData => {
            return yearlyData.year === this.state.selectedYear;
        });
        const countryPopulationData = this.props.data[this.state.selectedCountry].filter(yearlyData =>{
            return yearlyData.year === this.state.selectedYear;
        });

        const gpEmissionData = this.props.emissionData[this.state.selectedGPCountry].filter(yearlyData  =>{
            return yearlyData.year === this.state.selectedYear;
        });

        const countryEmissionData = this.props.emissionData[this.state.selectedCountry].filter(yearlyData  =>{
            return yearlyData.year === this.state.selectedYear;
        });


        const errorMessage = "No emission data available";

        if(!gpEmissionData.length || !countryEmissionData.length || !countryEmissionData[0].emission || !gpEmissionData[0].emission){
            console.log("No emission data avalable.");

            this.setState({
                errorMessage: errorMessage,
                compareResult: '',


            })
            return errorMessage;
        }



        const compareResult = ((((gpEmissionData[0].emission-countryEmissionData[0].emission)/countryEmissionData[0].emission)*100).toFixed(0) + "% emissions in comparison.");



        this.setState({
            gpPopulationData: gpPopulationData,
            countryPopulationData: countryPopulationData,
            gpEmissionData: " " +gpEmissionData[0].emission + " tons per capita",
            countryEmissionData: " " +countryEmissionData[0].emission + " tons per capita",
            compareResult: compareResult,
            errorMessage: ''
        });


    }



    render() {

        const clickHandler = this.clickHandler.bind(this);
        const setGPCountry = this.setGPCountry.bind(this);
        const setYear = this.setYear.bind(this);
        const compareCountries = this.compareCountries.bind(this);
        const dataLoaded = !!this.props.data.Aruba;
        return (
            <div>
                <div className="container-compare-emission">
                    <form>
                        <select disabled={!dataLoaded} className="select-gp-country" onChange={(e) => setGPCountry(e)}>
                            <option  selected={true} disabled={true}>Select country</option>
                            {
                                this.state.GPlist.map(GPCountry => {
                                    return <option value={GPCountry}>{GPCountry}</option>
                                })
                            }
                        </select>


                        <input className="input-compare-emission"
                               onChange= {this.searchCountry.bind(this)}
                               placeholder="Search"
                               value = {this.state.input}

                        />

                        { this.state.selectedCountry ? <div></div> :
                            <div>
                                {this.state.list.map(function (value) {
                                    return <li className="list-of-countries-emission" onClick={() => clickHandler(value)} key={value}>{value}</li>
                                })}
                            </div>

                        }

                        <select className="GP-year" disabled={!dataLoaded} onChange={(e) => setYear(e)}>
                            <option selected={true} disabled={true}>Select year</option>
                            {
                                this.getYearsFromData().map(year => {
                                    return <option>{year}</option>
                                })
                            }
                        </select>
                        <button className="button-compare-countries" onClick={(e) => compareCountries(e)}>Compare</button>
                    </form>
                    <ul className="result">
                        <li className="result-text">{this.state.compareResult}</li>
                        <li className="result-text">{this.state.selectedGPCountry} {this.state.gpEmissionData}</li>
                        <li className="result-text">{this.state.selectedCountry} {this.state.countryEmissionData}</li>
                        <li className="result-text">{this.state.errorMessage}</li>
                    </ul>

                </div>
            </div>
        );
    };
}

export default CompareEmissionData;