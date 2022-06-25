import FighterPreview from '../FighterPreview'
import versus from '../../assets/versus.png'

import './FightersPreview.css'

const FightersPreview = ({ selectedFighters }) => {
  const [leftFighter, rightFighter] = selectedFighters

  return (
    <div className="arena___battlefield">
      <div className="arena___fighter arena___left-fighter">
        <FighterPreview fighter={leftFighter} position="left" />
      </div>
      <img className="arena___versus-sign" src={versus} alt="versus" />
      <div className="arena___fighter arena___right-fighter">
        <FighterPreview fighter={rightFighter} position="right" />
      </div>
    </div>
  )
}

export default FightersPreview
