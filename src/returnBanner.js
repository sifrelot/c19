import React from 'react'
import './caseCountry.css'

const ReturnBanner = ({country, onClick}) => (
    <div className="coutryBanner">
        <span className="worldWide hand" onClick={()=>(onClick("Worldwide"))}>WorldWide</span>
        <span className="currentCountry">{` > ${country}`}</span>
    </div>
)

export default ReturnBanner