import React, { Component } from "react";
import SearchCountry from './components/SearchCountry';
import CompareEmissionData from './components/CompareEmissionData';
import Mainpage from './components/Mainpage';
import TopTen from './components/TopTen';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: {},
        co2: {},
        name: null,

    };

    this.getData();
    this.getCO2();

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



    render() {

    return (
            <Router>
                <div>
                    <nav>
                        <Link className="navbar">
                            <li><Link to={'/'} className="nav-text"> Home </Link></li>
                            <li><Link to={'/country'} className="nav-text">Compare emission</Link></li>
                            <li><Link to={'/top'} className={"nav-text"}>Countries by emission size</Link></li>
                            <li><Link to={'/emission'} className="nav-text">Search</Link></li>
                        </Link>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={Mainpage} />
                        <Route path='/top' render={() => <TopTen emissionData={this.state.co2} />}/>
                        <Route path='/country' render={() => <CompareEmissionData data={this.state.data} emissionData={this.state.co2}/>} />
                        <Route path='/emission' render={() => <SearchCountry data={this.state.data} emissionData={this.state.co2} /> }/>
                    </Switch>
                </div>
            </Router>
    );

  }
}



export default App;
