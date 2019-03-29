import React from 'react';
import CountryInfo from './CountryInfo';
import './Input.css'


class Dropdown extends React.Component {
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
                <input className="SearchInput"
                       onChange={this.searchCountry.bind(this)}
                       placeholder="Search"
                       value = {this.state.input}
                />
                    <ul>
                        {this.state.countryName ? <div className = "capitalName">{this.state.countryName}</div> :

                            <div>

                                {this.state.list.map(function (value) {
                                    return <li className="capitalList" onClick={() => clickHandler(value)} key={value}>{value}</li>
                                })}
                            </div>
                        }

                    </ul>
                    <CountryInfo countryInfo={this.state.countryData} emissionData = {this.props.emissionData} countryName = {this.state.countryName} />

            </div>
        );
    }
}

export default Dropdown;