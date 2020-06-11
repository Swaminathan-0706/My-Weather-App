import React, { Component } from 'react'
import styles from './Main.module.css';
import Axios from 'axios';
import Home from '../Home/Home';
import MyCities from './../Mycities/Mycities';
import { Switch, Route, NavLink } from 'react-router-dom';
class Main extends Component {
    constructor(props) {
        super(props);
        this.cityOptions = React.createRef();
    
        this.state = {
            cities: [],
            selectedCity:null,
            selectedCityData:{},
            savedCities: []
        }
    }
    componentDidMount(){
        Axios.get('https://my-weather-app-f384d.firebaseio.com/Cities.json')
        .then((response)=>{
            this.setState({
                cities:response.data
            })

        });
    }
    citySelectionHandler=(e)=>{
        let currentCity=e.target.value;
        Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${currentCity},IN&APPID=44137690601619565ed926ba4c0103db`)
        .then(response=>{
            console.log(response);
            this.setState({
                selectedCity:currentCity,
                selectedCityData: response.data

            })

        })
        .catch(error=>console.log(error));
    }
    addCityHandler=(city)=>{
        console.log("clicked add handler");
        let savedCities = [...this.state.savedCities];
        savedCities.push(city);
        console.log(savedCities);
        Axios.put('https://my-weather-app-f384d.firebaseio.com/Mycities.json',savedCities)
        .then(response=>{
            this.setState({
                savedCities:savedCities
            })
        })
        .catch(error=>console.log(error))
    }
    removeCityHandler = (removed_city) => {
        let savedCities = [...this.state.savedCities];
        savedCities = savedCities.filter(city => {
            return city.split(',')[0] !== removed_city;
        })
        Axios.put('https://my-weather-app-f384d.firebaseio.com/Mycities.json', savedCities)
            .then(response => {
                this.setState({
                    savedCities: savedCities
                })
            })
            .catch(error => {console.log(error);})
    }
    
    render() {
        
        return (
            <>
             <div className={styles.Navbar}>
                    <p className={styles.Title}>My Weather Application</p>
                    <div className={styles.NavItemContainer}>
                        <NavLink exact to="/" activeClassName={styles.Active}>
                            <div className={styles.NavItem}>Home</div>
                        </NavLink>
                        <NavLink to="/mycities" activeClassName={styles.Active}>
                            <div className={styles.NavItem}>My Cities</div>
                        </NavLink>
                    </div>
                </div>
             <Switch>
             <Route path="/mycities" component={() => <MyCities savedCities={this.state.savedCities} removeCity={this.removeCityHandler} /> } />
             <Route path="/" component={()=><Home cities={this.state.cities} selectedCity={this.state.selectedCity} addCity={this.addCityHandler} selectedCityData={this.state.selectedCityData} citySelection={this.citySelectionHandler} />} />
             </Switch>
            </>
        )
    }
}

export default Main
