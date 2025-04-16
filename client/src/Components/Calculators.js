import React from 'react'
import "../Styles/Calculators.css"
import BmiTest from './BmiTest'
import BodyFat from './BodyFat'
function Calculators() {
  return (
    <div className='col-name-cal' id='calCulatos' style={{gap:"none"}}>
   
       <h3 className="about-title" style={{display:"flex",justifyContent:"center"}}>
          <span>Calculator</span>
        </h3>
  
    <div className='div-cal'>
      
    <BmiTest/>
    <BodyFat/>
    </div>
    </div>
  )
}

export default Calculators