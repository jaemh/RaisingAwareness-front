import React, { Component } from "react";
import SearchCountry from './components/SearchCountry';
import CompareEmissionData from './components/CompareEmissionData';
import Mainpage from './components/Mainpage'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        co2: [],
        name: [],

    };

  }

   getData = () => {

        fetch("http://localhost:3000/api/data")
         .then(res => res.json())
         .then(result => {


             const name = Object.entries(result).map(([name, info]) => {
                 return <div value={name}>{name}</div>
             })


             this.setState({
                 data: result,
                 name: name


             })
         })

   };


   getCO2 = () => {
        fetch("http://localhost:3000/api/co2")
          .then(response => response.json())
          .then(response =>

              this.setState(
                  {
                      co2: response,
                  }
              )
          )

    }


  componentDidMount() {
    this.getData();
    this.getCO2();

  }


    render() {

    return (
            <Router>
                <div>
                    <nav>
                        <ul className="navbar">
                            <li><Link to={'/'} className="nav-text"> Home </Link></li>
                            <li><Link to={'/country'} className="nav-text">Compare emission</Link></li>
                            <li><Link to={'/emission'} className="nav-text">Search</Link></li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={Mainpage} />
                        <Route path='/country' render={() => <CompareEmissionData data={this.state.data} emissionData={this.state.co2}/>} />
                        <Route path='/emission' render={() => <SearchCountry data={this.state.data} emissionData={this.state.co2} /> }/>
                    </Switch>
                </div>
            </Router>
    );

  }
}



export default App;
