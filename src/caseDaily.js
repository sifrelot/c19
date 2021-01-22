import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

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


export default class CaseDaily extends PureComponent {
    state = {
      country: this.props.country
    }

    componentWillReceiveProps(nextProps) {
      this.setState({country: nextProps.country})
    }

    render() {
        const {country} = this.state
        const countryPrint = country==="Worldwide" ? country : "in " + country
        return (
            <div>
                <div className="alert alert-primary" role="alert">
                    {`Daily Corona Virus Cases ${countryPrint}`}
                </div>
                <div class="d-flex justify-content-center">
                  <BarChart
                      width={700}
                      height={500}
                      data={data}
                      margin={{top: 10, right: 0, left: 0, bottom: 15,}}
                  >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="dd" fill="#F98E97" />
                      <Bar dataKey="dr" fill="#82B4FF" />
                      <Bar dataKey="dnc" fill="#FFE180" />
                  </BarChart>
                </div>
                <p/>
            </div>
        )
    }
}