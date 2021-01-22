import React, {Component} from 'react'
import { Container } from 'react-bootstrap'
import CaseDaily from './caseDaily'
import CaseDistribution from './caseDistribution'
import CaseSummary from './caseSummary'
import CaseTotal from './caseTotal'
import CaseCountry from './caseCountry'
import './home.css'
import ReturnBanner from './returnBanner'

class Home extends Component {
  state = {
    country: "Worldwide",
    error: false,
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
      }}
  }

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
              }
            }
          }
          this.setState({summary: summary})
        }
      } else {
        this.setState({error: true})
      }
  }

  componentDidMount(){
    this.getCovidSummary();
  }

  scrollTop() {
    window.scrollTo(0,0);
  }

  handleCountryChange = (country) => {
    this.setState({country: country})
  }
  
  render() {
    const {country, summary} = this.state
    console.log(summary)
    return (
      <Container>
          {country!=="Worldwide" && <ReturnBanner country={country} onClick={this.handleCountryChange}/>}
          <CaseSummary country={country} data={summary[country]}/>
          <CaseDistribution country={country} data={summary[country]}/>
          <CaseDaily country={country}/>
          <CaseTotal country={country}/>
          <CaseCountry handleCountryClick={this.handleCountryChange} country={country} data={summary}/>
      </Container>
    )
  }
}
  
export default Home;