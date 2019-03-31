import React from 'react';
import CountryInfo from './CountryInfo';
import './style.css';


class SearchCountry extends React.Component {
    constructor() {
        super();

        this.state = {
            countryName: null,
            countryData: [],
            list: [],
            input: null
        };

    }

    clickHandler = (countryName) => {
        console.log("clicked country is " + countryName);

        const countryData = this.props.data[countryName];


        this.setState({
        countryName: countryName,
        countryData: countryData,
        input: ''});

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

    render() {

       const clickHandler = this.clickHandler.bind(this);


        return (
            <div>
                <input className="search-bar"
                    onChange={this.searchCountry.bind(this)}
                    placeholder="Select country..."
                    value = {this.state.input}
                />

                { this.state.countryName ?
                    <div className="container-countryName">
                        <div className="capital-name">{this.state.countryName}</div>
                    </div> :

                    <div className="container-search-bar">
                        {this.state.list.map(function (value) {
                            return <li className="search-list" onClick={() => clickHandler(value)} key={value}>{value}</li>
                        })}
                    </div>
                }


                <CountryInfo countryInfo={this.state.countryData} emissionData = {this.props.emissionData} countryName = {this.state.countryName} />

            </div>
        );
    }
}

export default SearchCountry;