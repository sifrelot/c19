import React, {Component} from 'react'
import { Container } from 'react-bootstrap'
import CaseDaily from './caseDaily'
import CaseDistribution from './caseDistribution'
import CaseSummary from './caseSummary'
import CaseTotal from './caseTotal'
import CaseCountry from './caseCountry'
import './home.css'
import ReturnBanner from './returnBanner'
import {HISTORICAL, SUMMARY} from './firebase'

function getPreviousDay() {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()-2000}`
}

function sortHistoricalData(data) {
  let ret_data = {}
  let prov_data
  let order_list =[]
  for (let date in data["cases"]) {
    order_list = [...order_list, date]
  }
  order_list.sort(compareHistoricalTime)
  for (let situation in data) {
    prov_data = {}
    for (let date in order_list) {
      prov_data[order_list[date]] = data[situation][order_list[date]]
    }
    ret_data[situation] = prov_data
  }
  return ret_data
}

function compareHistoricalTime(a,b) {
  let tab_a = a.split("/")
  let tab_b = b.split("/")
  if (parseInt(tab_a[2],10)<parseInt(tab_b[2],10)) 
    return -1
  else if (parseInt(tab_a[2],10)===parseInt(tab_b[2],10)) {
    if (parseInt(tab_a[0],10)<parseInt(tab_b[0],10))
      return -1
    else if (parseInt(tab_a[0],10)===parseInt(tab_b[0],10)){
      if (parseInt(tab_a[1],10)<parseInt(tab_b[1],10))
        return -1
      else if (parseInt(tab_a[1],10)===parseInt(tab_b[1],10))
        return 0
    }
  }
  return 1
}

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

  async getCovidSummary() {
    let firestore_date = await SUMMARY.doc("Date").get() // get data from firebase
    if (firestore_date.exists) {
      firestore_date = new Date(firestore_date.data()["Date"])

      if (true) { // condition sur la date
        let firestore_data = await SUMMARY.doc("summary").get()  // get data from firebase
        if (firestore_data.exists) { // if data exist: use this data. Otherwise ask the covid19 api
          console.log("summary from firestore")
          firestore_data = firestore_data.data()
          if (firestore_data!==undefined) {
            this.setState({summary: firestore_data})
            return
          }
        }
      }
    }
    // get data from the covid api
    var summary_api = await fetch("https://api.covid19api.com/summary")
    if (summary_api.ok){
      const data = await summary_api.json()
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
              CountryCode:countries[country]["CountryCode"],
            }
          }
        }
        await SUMMARY.doc("summary").set(summary) // add recovered data to the firestore database
        await SUMMARY.doc("Date").set({Date: countries[0]["Date"]}) // set the date of the last data
        this.setState({summary: summary})
      }
    }
  }

  async getCovidHistorical(opt_country) {
    const {summary, historical} = this.state
    let {country} = this.state
    if (opt_country!==undefined)
      country = opt_country
    let historical_data = {...historical}

    let firestore_data = await HISTORICAL.doc(country).get() // get data from firebase

    if (firestore_data.exists) { // if data exist and is up to date: use this data. Otherwise ask the corona api
      console.log("historical from firestore")
      firestore_data = firestore_data.data()
      if (firestore_data["cases"][getPreviousDay()]!==undefined) {
        historical_data[country] = sortHistoricalData(firestore_data)
        this.setState({historical: historical_data})
        return
      }
    }
    let url = "https://corona.lmao.ninja/v2/historical/"
    if (country==="Worldwide")
      url = url + "all"
    else
      url = `${url}${summary[country]["CountryCode"]}`
    const historical_raw = await fetch(url)

    if (historical_raw.ok){
      const data = await historical_raw.json()
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
      await HISTORICAL.doc(country).set(historical_data[country]) // add recovered data to the firestore database
      this.setState({historical: historical_data})
    }
  }

  componentDidMount(){
    this.getCovidSummary()
    this.getCovidHistorical()
  }

  scrollTop() {
    window.scrollTo(0,0);
  }

  handleCountryChange = (country) => {
    const {historical} = this.state
    this.setState({country: country})
    if (historical[country]===undefined)
      this.getCovidHistorical(country)
  }
  
  render() {
    const {country, summary, historical} = this.state
    let date
    let historical_data = []
    if (historical[country]!==undefined) {
      for (date in historical[country]["cases"])
        historical_data = [...historical_data,
          {name: date,
          cases: historical[country]["cases"][date],
          deaths: historical[country]["deaths"][date],
          recovered: historical[country]["recovered"][date],}]
    }
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