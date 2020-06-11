import React, { Component } from 'react';
import styles from './Mycities.module.css';
import cityStyles from './../../Components/City/City.module.css';
import Axios from 'axios';

class Mycities extends Component {
    state = {
        citiesData: {},
        tempTypes: ['°C', 'K', '°F'],
        selectedTempType: 'K'
    }

    componentDidMount = () => {
        let values = {},
            promises = [];
        for(let city of this.props.savedCities) {
            let url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=60dfad51347e098c9a6b000ced44c353';
            promises.push(Axios.get(url));
        }
        Axios.all(promises).then(results => {
            results.forEach(result => {
                values[result.data.name] = result.data.main.temp;
            })
            this.setState({
                citiesData: values
            })
        })
    }    

    getTemp = (temp) => {
        let temperature = temp;
        let tempType = this.state.selectedTempType;
        if(tempType === '°C') { temperature = temp - 273.15; } 
        else if(tempType === 'K') { temperature = temp; }
        else if(tempType === '°F') { temperature = ((temp-273.15)*1.8)+32; }
        return temperature.toFixed(1);
    }

    tempTypeChangeHandler = (event) => {
        this.setState({
            selectedTempType: event.target.innerHTML
        })
    }

    render() {
        let classNames = [styles.WeatherCard];
        if(new Date().getHours() > 19 || new Date().getHours() < 7) { classNames.push(cityStyles.Dark); }
        else { classNames.push(cityStyles.Sunny); }
        let cityCards = "You haven't selected any cities";
        if(Object.keys(this.state.citiesData).length > 0) {
            cityCards = Object.keys(this.state.citiesData).map(city => {
                let temp = this.getTemp(this.state.citiesData[city]);
                return (
                    <div className={styles.WeatherCardContainer} key={city}>
                        <div className={classNames.join(' ')}>
                            <p>{city}</p>
                            <p>{temp} {this.state.selectedTempType}</p>
                        </div>
                        <button id={city} className={styles.RemoveButton} onClick={() => this.props.removeCity(city)}>Remove</button>
                    </div>
                )
            })
        }
        let buttonClasses = [cityStyles.Button];
        let tempButtons = this.state.tempTypes.map(type => {
            if(type === this.state.selectedTempType) {
                buttonClasses.push(cityStyles.Active);
            } else {
                buttonClasses = [cityStyles.Button];
            }
            return <button key={type} className={buttonClasses.join(' ')} onClick={this.tempTypeChangeHandler}>{type}</button>;
        })
        return (
            <div className={styles.MyCities}>
                <div className={styles.TitleContainer}>
                    <p className={styles.Title}>My Cities</p>
                    <span>Selected Temperature Type: </span>{tempButtons}
                </div>
                {cityCards}
            </div>
        )
    }
}

export default Mycities