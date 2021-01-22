import React, {PureComponent} from 'react'

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
    console.log(nextProps)
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

  render() {
    const {sortData, data, country} = this.state
    return (
      <div>
        {country==="Worldwide" && 
        <div>
          <div class="alert alert-primary" role="alert">
            Corona Virus Cases By Country
          </div>
          <table class="table table-bordered border-white">
            <thead>
              <tr>
                <td class="table-light border-white" onClick={() => this.handleClickHead("name")}>Country</td>
                <td class="table-warning border-white" onClick={() => this.handleClickHead("NewConfirmed")}>New Cases</td>
                <td class="table-warning border-white" onClick={() => this.handleClickHead("TotalConfirmed")}>Total Cases</td>
                <td class="table-primary border-white" onClick={() => this.handleClickHead("NewRecovered")}>New Recoveries</td>
                <td class="table-primary border-white" onClick={() => this.handleClickHead("TotalRecovered")}>Total Recoveries</td>
                <td class="table-danger border-white" onClick={() => this.handleClickHead("NewDeaths")}>New Deaths</td>
                <td class="table-danger border-white" onClick={() => this.handleClickHead("TotalDeaths")}>Total Deaths</td>
              </tr>
            </thead>
            <tbody>
              {data.sort(this.getSortOrder(sortData)).map((element, index)=>(
                <tr key={index}>
                  <td className="table-light border-white" onClick={() => this.handleClickCountry(element["name"])}>{element["name"]}</td>
                  <td class="table-warning border-white" style={{textAlign: 'right'}}>{element["NewConfirmed"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                  <td class="table-warning border-white" style={{textAlign: 'right'}}>{element["TotalConfirmed"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                  <td class="table-primary border-white" style={{textAlign: 'right'}}>{element["NewRecovered"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                  <td class="table-primary border-white" style={{textAlign: 'right'}}>{element["TotalRecovered"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                  <td class="table-danger border-white" style={{textAlign: 'right'}}>{element["NewDeaths"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                  <td class="table-danger border-white" style={{textAlign: 'right'}}>{element["TotalDeaths"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
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