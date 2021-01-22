import React from 'react'

const ReturnBanner = ({country, onClick}) => (
    <div className="coutryBanner">
        <span className="worldWide" onClick={()=>(onClick("Worldwide"))}>WorldWide</span>
        <span className="currentCountry">{` > ${country}`}</span>
    </div>
)

export default ReturnBanner