import React, { Component } from "react";
import Dropdown from './components/Dropdown';
import EmissionData from './components/EmissionData';

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

        fetch("https://raisingawareness-end.herokuapp.com/api/data")
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
        fetch("https://raisingawareness-end.herokuapp.com/api/co2")
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

        <div>
            <EmissionData data={this.state.data} emissionData={this.state.co2} />
            <Dropdown data={this.state.data} emissionData={this.state.co2}/>
        </div>
    );

  }
}



export default App;
