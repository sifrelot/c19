import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, } from 'recharts';

export default class CaseTotal extends PureComponent {
  state = {
    country: this.props.country,
    data: this.props.data
  }

  componentWillReceiveProps(nextProps) {
    this.setState({country: nextProps.country, data: nextProps.data})
  }

  render() {
    const {country, data} = this.state
    const countryPrint = country==="Worldwide" ? country : "in " + country
    return (
      <div>
        <div className="alert alert-primary" role="alert">
          {`Total Corona Virus Cases ${countryPrint}`}
        </div>
        {(data===undefined || data[0]===undefined) ?
          <div class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div class="spinner-border ms-auto" role="status" aria-hidden="true"/>
          </div> :
          <div class="d-flex justify-content-center">
            <AreaChart
              width={800}
              height={500}
              data={data}
              margin={{top: 10, right: 0, left: 30, bottom: 15,}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="deaths" stackId="1" stroke="#F98E97" fill="#F98E97" />
              <Area type="monotone" dataKey="recovered" stackId="1" stroke="#82B4FF" fill="#82B4FF" />
              <Area type="monotone" dataKey="cases" stackId="1" stroke="#FFE180" fill="#FFE180" />
            </AreaChart>
          </div>
        }
        <br/>
      </div>
    )
  }
}