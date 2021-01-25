import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, } from 'recharts';

const COLORS = ['#FFE180', '#82B4FF', '#F98E97'];

const RADIAN = Math.PI / 180;


export default class CaseDistribution extends PureComponent {
    state = {
        country: this.props.country,
        data: [{name: "Active Cases", value: ""}]
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data!==undefined) {
            const data = [
                {name: "Active Cases", value: nextProps.data["ActiveConfirmed"]},
                {name: "Recovered Cases", value: nextProps.data["TotalRecovered"]},
                {name: "Dead Cases", value: nextProps.data["TotalDeaths"]},
            ]
            this.setState({country: nextProps.country, data: data})
        }
    }

    render() {
        const {country, data} = this.state
        const countryPrint = country==="Worldwide" ? country : "in " + country
        const renderCustomizedLabel = ({
            cx, cy, midAngle, innerRadius, outerRadius, percent, index,
        }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
            return (
                <text x={x} y={y} fill="black" textAnchor="middle">
                {`${data[index]["name"]}: ${(percent * 100).toFixed(0)}%`}
                </text>
            )
        }
        return (
            <div>
                <div className="alert alert-primary" role="alert">
                    {`Corona Virus Cases Distribution ${countryPrint}`}
                </div>
                {(data===undefined || data[0]["value"]==="") ? 
                    <div className="d-flex align-items-center">
                        <strong>Loading...</strong>
                        <div className="spinner-border ms-auto" role="status" aria-hidden="true"/>
                    </div> :
                    <div className="d-flex justify-content-center">
                        <PieChart width={520} height={520}>
                            <Pie
                                data={data}
                                cx={250}
                                cy={250}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={250}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                        </PieChart>
                    </div>
                }
                <br/>
            </div>
        )
    }
}
