import React, { Component } from 'react'
import styles from './Main.module.css';
import Axios from 'axios';
import Home from '../Home/Home';
import { Switch, Route, NavLink } from 'react-router-dom';
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
             <Route path="/" component={()=><Home cities={this.state.cities} selectedCity={this.state.selectedCity} selectedCityData={this.state.selectedCityData} citySelection={this.citySelectionHandler} />} />
             </Switch>
            </>
        )
    }
}

export default Main
