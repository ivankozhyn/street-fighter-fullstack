import { fightersImgs, defaultFightersImg } from '../../config/fightersImgs'

import './FighterPreview.css'

const FighterPreview = ({ fighter, position }) => {
  const { name } = fighter

  return (
    <div className={`fighter-preview___root fighter-preview___${position}`}>
      <img
        className="fighter-preview___img"
        src={fightersImgs[name] ?? defaultFightersImg}
        alt={name}
      />
    </div>
  )
}

export default FighterPreview
