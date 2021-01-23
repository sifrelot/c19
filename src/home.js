import React, {Component} from 'react'
import { Container } from 'react-bootstrap'
import CaseDaily from './caseDaily'
import CaseDistribution from './caseDistribution'
import CaseSummary from './caseSummary'
import CaseTotal from './caseTotal'
import CaseCountry from './caseCountry'
import './home.css'
import ReturnBanner from './returnBanner'
//import {firebase} from './firebase'

class Home extends Component {
  state = {
    country: "Worldwide",
    summary: {
      Worldwide: {
        NewConfirmed:"",
        NewDeaths:"",
        NewRecovered:"",
        TotalConfirmed:"",
        TotalDeaths:"",
        TotalRecovered:"",
        ActiveConfirmed:"",
        RecoveryRate:0,
        MortalityRate:0,
      }},
    historical: {
      Worldwide: {
        cases:[],
        deaths:[],
        recovered:[],
      }}
  }
  

  /*async getData() {
    const db = firebase.firestore()
    const dataFirebase = await db.collection("summary").get()
    console.log(dataFirebase)
    const date = new Date(dataFirebase["Countries"][0]["Date"])
  }*/

  async getCovidSummary() {
    var summary = await fetch("https://api.covid19api.com/summary")
    if (summary.ok){
      const data = await summary.json()
      const global = data["Global"]
      if (global !== undefined) {
        const summary = {
          Worldwide: {
            NewConfirmed:global["NewConfirmed"],
            NewDeaths:global["NewDeaths"],
            NewRecovered:global["NewRecovered"],
            TotalConfirmed:global["TotalConfirmed"],
            TotalDeaths:global["TotalDeaths"],
            TotalRecovered:global["TotalRecovered"],
            ActiveConfirmed:global["TotalConfirmed"] - global["TotalDeaths"] - global["TotalRecovered"],
            RecoveryRate:global["TotalConfirmed"] / global["TotalRecovered"],
            MortalityRate:global["TotalConfirmed"] / global["TotalDeaths"],},
        }
        const countries = data["Countries"]
        if (countries !== undefined) {
          let country
          for (country in countries) {
            summary[countries[country]["Country"]] = {
              NewConfirmed:countries[country]["NewConfirmed"],
              NewDeaths:countries[country]["NewDeaths"],
              NewRecovered:countries[country]["NewRecovered"],
              TotalConfirmed:countries[country]["TotalConfirmed"],
              TotalDeaths:countries[country]["TotalDeaths"],
              TotalRecovered:countries[country]["TotalRecovered"],
              ActiveConfirmed:countries[country]["TotalConfirmed"] - countries[country]["TotalDeaths"] - countries[country]["TotalRecovered"],
              RecoveryRate:countries[country]["TotalConfirmed"] / countries[country]["TotalRecovered"],
              MortalityRate:countries[country]["TotalConfirmed"] / countries[country]["TotalDeaths"],
              //CountryCode:countries[country][] TODO remplir
            }
          }
        }
        /*const db = firebase.database()
        let element
        for (element in countries)
          db.ref("summary/" + countries["ID"]).set(element)*/
        
        this.setState({summary: summary})
      }
    }
  }

  async getCovidHistorical() {
    console.log("entering the historical get method")
    const {country, summary, historical} = this.state
    let url = "https://corona.lmao.ninja/v2/historical/"
    if (country==="Worldwide")
      url = url + "all"
    else
      url = `${url}${summary[country]["CountryCode"]}`
    console.log(url)
    const historical_raw = await fetch(url)

    if (historical_raw.ok){
      const data = await historical_raw.json()
      let historical_data = {...historical}
      if (country==="Worldwide") {
        if (data !== undefined) {
          historical_data["Worldwide"] = {
            cases:data["cases"],
              deaths:data["deaths"],
              recovered:data["recovered"]}
        }
      } else {
        const timeline = data["timeline"]
        if (timeline !== undefined) {
          historical_data[country] = {
              cases:timeline["cases"],
              deaths:timeline["deaths"],
              recovered:timeline["recovered"]}
        }
      }
      this.setState({historical: historical_data})
    }
  }

  componentDidMount(){
    //this.getCovidSummary()
    this.getCovidHistorical()
  }

  scrollTop() {
    window.scrollTo(0,0);
  }

  handleCountryChange = (country) => {
    this.setState({country: country})
  }
  
  render() {
    const {country, summary, historical} = this.state
    let date
    let historical_data = []
    for (date in historical[country]["cases"])
      historical_data = [...historical_data,
        {name: date,
        cases: historical[country]["cases"][date],
        deaths: historical[country]["deaths"][date],
        recovered: historical[country]["recovered"][date],}]
    const daily_data = historical_data.slice(-8)
    
    return (
      <Container>
          {country!=="Worldwide" && <ReturnBanner country={country} onClick={this.handleCountryChange}/>}
          <CaseSummary country={country} data={summary[country]}/>
          <CaseDistribution country={country} data={summary[country]}/>
          <CaseDaily country={country} data={daily_data}/>
          <CaseTotal country={country} data={historical_data}/>
          <CaseCountry handleCountryClick={this.handleCountryChange} country={country} data={summary}/>
      </Container>
    )
  }
}
  
export default Home;