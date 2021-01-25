import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

function formatData(data) {
  if (data===undefined || data[7]===undefined)
    return []
  let cases, deaths, recovered
  let ret_data = []
  for (let i=0; i<7; i++) {
    cases = data[i+1]["cases"] - data[i]["cases"]
    deaths = data[i+1]["deaths"] - data[i]["deaths"]
    recovered = data[i+1]["recovered"] - data[i]["recovered"]
    ret_data = [...ret_data, {name: data[i+1], cases: cases, deaths: deaths, recovered: recovered}]
  }
  return ret_data
}

export default class CaseDaily extends PureComponent {
  state = {
    country: this.props.country,
    data: formatData(this.props.data),
  }

  componentWillReceiveProps(nextProps) {
    this.setState({country: nextProps.country, data: formatData(nextProps.data)})
  }

  render() {
    const {country, data} = this.state
    const countryPrint = country==="Worldwide" ? country : "in " + country
    return (
      <div>
        <div className="alert alert-primary" role="alert">
          {`Daily Corona Virus Cases ${countryPrint}`}
        </div>
        {(data===undefined || data[0]===undefined) ?
          <div className="d-flex align-items-center">
            <strong>Loading...</strong>
            <div className="spinner-border ms-auto" role="status" aria-hidden="true"/>
          </div> :
          <div className="d-flex justify-content-center">
            <BarChart
              width={800}
              height={500}
              data={data}
              margin={{top: 10, right: 0, left: 30, bottom: 15,}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="deaths" fill="#F98E97" />
              <Bar dataKey="recovered" fill="#82B4FF" />
              <Bar dataKey="cases" fill="#FFE180" />
            </BarChart>
          </div>
        }
        <br/>
      </div>
    )
  }
}