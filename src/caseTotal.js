import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, } from 'recharts';

const data = [
    {
      name: '11 Jan', dd: 13, dr: 600, dnc: 626,
    },
    {
      name: '12 Jan', dd: 26, dr: 381, dnc: 452,
    },
    {
      name: '13 Jan', dd: 45, dr: 1236, dnc: 341,
    },
    {
      name: '14 Jan', dd: 12, dr: 1262, dnc: 671,
    },
    {
      name: '15 Jan', dd: 21, dr: 960, dnc: 362,
    },
    {
      name: '16 Jan', dd: 36, dr: 1306, dnc: 456,
    },
    {
      name: '17 Jan', dd: 29, dr: 862, dnc: 1200,
    },
  ]

export default class CaseTotal extends PureComponent {
  state = {
    country: this.props.country
  }

  constructor(props){
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    const {country} = this.state
    this.setState({country: nextProps.country})
  }

  render() {
    const {country} = this.state
    const countryPrint = country==="Worldwide" ? country : "in " + country
    return (
      <div>
        <div className="alert alert-primary" role="alert">
          {`Total Corona Virus Cases ${countryPrint}`}
        </div>
        <div class="d-flex justify-content-center">
          <AreaChart
            width={700}
            height={500}
            data={data}
            margin={{top: 10, right: 0, left: 0, bottom: 15,}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="dd" stackId="1" stroke="#F98E97" fill="#F98E97" />
            <Area type="monotone" dataKey="dr" stackId="1" stroke="#82B4FF" fill="#82B4FF" />
            <Area type="monotone" dataKey="dnc" stackId="1" stroke="#FFE180" fill="#FFE180" />
          </AreaChart>
        </div>
        <p/>
      </div>
    )
  }
}