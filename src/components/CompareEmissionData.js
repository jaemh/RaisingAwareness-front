import React from 'react';
import './style.css'

class CompareEmissionData extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            list: [],
            displayMenu: false,
            countryName: null,
            input: null


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
            countryName: null,
            list: query,
            input: null
        })
    }

    clickHandler = (countryName) => {
        console.log("clicked country is " + countryName);

        const countryData = this.props.data[countryName];


        this.setState({
            countryName: countryName,
            countryData: countryData,
            input: ''});

    }


    //dropdown missä on Venäjä, Pohjois-Amerikka, Kiina, Japani, Eurooppa
    // vieressä input jossa kaikki maat
    // mollemmista tulee tieto vierekkäin
    // alla kuinka monta prosentti enemmän päästöjä


    render() {

        const clickHandler = this.clickHandler.bind(this);


        return (
            <div>
                <div className="container-compare-emission">
                    <button className="button-compare-emission" onClick={this.showDropdownMenu}>Select country</button>

                    {this.state.displayMenu ?
                        <ul className="ul-great">
                            <li>List</li>
                        </ul>: null
                    }

                {this.state.countryName ?
                    <div>
                        <button className="selected-year">Year</button>
                    </div> : null
                }



                <div>
                    <input className="input-compare-emission"
                           onChange= {this.searchCountry.bind(this)}
                           placeholder="Search"
                           value = {this.state.input}
                    />
                </div>

                { this.state.countryName ? <div className="selected-name">{this.state.countryName}</div> :
                    <div>

                        {this.state.list.map(function (value) {
                            return <li className="list-of-countries-emission" onClick={() => clickHandler(value)} key={value}>{value}</li>
                        })}
                    </div>

                }
                </div>

            </div>
        );
    };
}

export default CompareEmissionData;