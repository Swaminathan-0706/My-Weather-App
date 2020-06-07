import React, { Component } from 'react'
import './Main.css';
import Axios from 'axios';
import City from '../../Components/City/City';
class Main extends Component {
    constructor(props) {
        super(props);
        this.cityOptions = React.createRef();
    
        this.state = {
            cities: [
                'Mumbai',
                'Delhi',
                'Chennai',
                'Kolkata',
                'Bangalore',
                'Pune',
                'Hyderabad',
                'Puducherry'
            ],
            selectedCity:null,
            selectedCityData:{}
        }
    }
    citySelectionHandler=(e)=>{
        
        let currentCity=e.target.value;
        console.log(currentCity);
        Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${currentCity},IN&APPID=44137690601619565ed926ba4c0103db`)
        .then(response=>{
            this.setState({
                selectedCity:currentCity,
                selectedCityData: response.data

            })

        })
        .catch(error=>console.log(error));
    }
    
    render() {
        let options=this.state.cities.map(city=>{
            return <option value={city}key={city}>{city}</option>
        })
        return (
            <>
             <div className='Navbar'>My Weather Application</div>  
             <div>
                <label htmlFor='cities'>Select a city:  </label> 
                <select id='cities' ref={this.cityOptions} onChange={(e)=>this.citySelectionHandler(e)} >
                    <option>Nothing is selected</option> 
                    {options}
                    </select>
            </div> 
            {
                this.state.selectedCity!==null?
                <City data={this.state.selectedCityData}/>:null
            }
            </>
        )
    }
}

export default Main
