import React, { Component } from 'react';
import styles from './Home.module.css';
import City from '../../Components/City/City';

class Home extends Component {
    render() {
        let options=this.props.cities.map(city=>{
            return <option value={city}key={city}>{city}</option>
        })
        return (
            <div className={styles.Home}>
                <div className={styles.SelectContainer}>
                <label htmlFor='cities'>Select a city:  </label> 
                <select className={styles.CitySelector} id='cities' ref={this.cityOptions}value={this.props.selectedCity || ''} onChange={this.props.citySelection} >
                    <option>Nothing is selected</option> 
                    {options}
                    </select>
                </div>
            {
                this.props.selectedCity !==null?
                <City data={this.props.selectedCityData} selectedCity={this.props.selectedCity}/>:null
            }
            </div>
        )
    }
}

export default Home;
