import React, {PureComponent} from 'react'
import './caseCountry.css'

class CaseCountry extends PureComponent {
  static staticData = []

  state = {
    ascending: false,
    sortData: "name",
    selectCoutry: this.props.handleCountryClick,
    data: []
  }

  getSortOrder(prop) {
    const {ascending, sortData} = this.state
    if ((ascending && sortData!=="name") || (!ascending && sortData==="name")) {
      return function(a, b) {
        if (a[prop] > b[prop]) {
          return 1;
        } else if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      }
    } else {
      return function(a, b) {
        if (a[prop] < b[prop]) {
          return 1;
        } else if (a[prop] > b[prop]) {
          return -1;
        }
        return 0;
      }
    }
  }  

  // fix this
  handleClickHead = (column) => {
    const {ascending, sortData} = this.state
    if (!ascending && sortData===column)
      this.setState({ascending: true})
    else
      this.setState({ascending: false, sortData: column})
  }

  handleClickCountry(country) {
    const {selectCoutry} = this.state
    selectCoutry(country)
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.data
    if (data!==undefined && data["Worldwide"]["TotalConfirmed"]!=="") {
      let l = []
      let element
      for (element in data)
        if (element !== "Worldwide")
          l = [...l, {name:element,
                      NewConfirmed:data[element]["NewConfirmed"],
                      TotalConfirmed:data[element]["TotalConfirmed"],
                      NewRecovered:data[element]["NewRecovered"],
                      TotalRecovered:data[element]["TotalRecovered"],
                      NewDeaths:data[element]["NewDeaths"],
                      TotalDeaths:data[element]["TotalDeaths"]}]
      this.setState({data: l, country: nextProps.country})
      this.staticData = l
    }
  }

  componentWillUnmount(){
    window.scrollTo(0,0)
  }

  render() {
    const {sortData, data, country} = this.state
    return (
      <div>
        {country==="Worldwide" && 
        <div>
          <div className="alert alert-primary" role="alert">
            Corona Virus Cases By Country
          </div>
          <table className="table table-bordered border-white">
            <thead>
              <tr>
                <td className="table-light border-white hand" onClick={() => this.handleClickHead("name")}>Country</td>
                <td className="table-warning border-white hand" onClick={() => this.handleClickHead("NewConfirmed")}>New Cases</td>
                <td className="table-warning border-white hand" onClick={() => this.handleClickHead("TotalConfirmed")}>Total Cases</td>
                <td className="table-primary border-white hand" onClick={() => this.handleClickHead("NewRecovered")}>New Recoveries</td>
                <td className="table-primary border-white hand" onClick={() => this.handleClickHead("TotalRecovered")}>Total Recoveries</td>
                <td className="table-danger border-white hand" onClick={() => this.handleClickHead("NewDeaths")}>New Deaths</td>
                <td className="table-danger border-white hand" onClick={() => this.handleClickHead("TotalDeaths")}>Total Deaths</td>
              </tr>
            </thead>
            <tbody>
              {data.sort(this.getSortOrder(sortData)).map((element, index)=>(
                <tr key={index}>
                  <td className="table-light border-white hand" onClick={() => this.handleClickCountry(element["name"])}>{element["name"]}</td>
                  <td className="table-warning border-white" style={{textAlign: 'right'}}>{element["NewConfirmed"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                  <td className="table-warning border-white" style={{textAlign: 'right'}}>{element["TotalConfirmed"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                  <td className="table-primary border-white" style={{textAlign: 'right'}}>{element["NewRecovered"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                  <td className="table-primary border-white" style={{textAlign: 'right'}}>{element["TotalRecovered"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                  <td className="table-danger border-white" style={{textAlign: 'right'}}>{element["NewDeaths"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                  <td className="table-danger border-white" style={{textAlign: 'right'}}>{element["TotalDeaths"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p/>
        </div>}
      </div>
    )
  }
}

export default CaseCountry