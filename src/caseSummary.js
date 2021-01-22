import React, { PureComponent } from 'react'

const TEST = {
    "Total Cases": 47398111,
    "New Cases": 445996,
    "Active Cases": 213654,
    "Total Recovered": 445996,
    "New Recovered": 445996,
}

export default class CaseSummary extends PureComponent {
    state = {
        country: this.props.country,
        data: this.props.data
    }

    formatNumbers(value) {
        value = value.replace()
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
                    {`Corona Virus Summary ${countryPrint}`}
                </div>
                {(data===undefined || data["TotalConfirmed"]==="") ? 
                    <div class="d-flex align-items-center">
                        <strong>Loading...</strong>
                        <div class="spinner-border ms-auto" role="status" aria-hidden="true"/>
                    </div> :
                    <table className="table table-bordered border-white">
                        <tbody>
                            <tr>
                                <td className="table-warning border-white">Total Cases</td>
                                <td className="table-warning border-white" style={{textAlign: 'right'}}>{data["TotalConfirmed"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                            </tr>
                            <tr>
                                <td className="table-warning border-white">New Cases</td>
                                <td className="table-warning border-white" style={{textAlign: 'right'}}>{data["NewConfirmed"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                            </tr>
                            <tr>
                                <td className="table-warning border-white">Active Cases</td>
                                <td className="table-warning border-white" style={{textAlign: 'right'}}>{data["ActiveConfirmed"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                            </tr>
                            <tr>
                                <td className="table-primary border-white">Total Recovered</td>
                                <td className="table-primary border-white" style={{textAlign: 'right'}}>{data["TotalRecovered"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                            </tr>
                            <tr>
                                <td className="table-primary border-white">New Recovered</td>
                                <td className="table-primary border-white" style={{textAlign: 'right'}}>{data["NewRecovered"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                            </tr>
                            <tr>
                                <td className="table-primary border-white">Recovery Rate</td>
                                <td className="table-primary border-white" style={{textAlign: 'right'}}>{`${data["RecoveryRate"].toFixed(2)} %`}</td>
                            </tr>
                            <tr>
                                <td className="table-danger border-white">Total Deaths</td>
                                <td className="table-danger border-white" style={{textAlign: 'right'}}>{data["TotalDeaths"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                            </tr>
                            <tr>
                                <td className="table-danger border-white">New Deaths</td>
                                <td className="table-danger border-white" style={{textAlign: 'right'}}>{data["NewDeaths"].toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')}</td>
                            </tr>
                            <tr>
                                <td className="table-danger border-white">Mortality Rate</td>
                                <td className="table-danger border-white" style={{textAlign: 'right'}}>{`${data["MortalityRate"].toFixed(2)} %`}</td>
                            </tr>
                        </tbody>
                    </table>
                }
                <br/>
            </div>
        )
    }
}
