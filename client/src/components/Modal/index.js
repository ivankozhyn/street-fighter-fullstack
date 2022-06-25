import { useEffect, useState } from 'react'

import { getFight } from '../../services/domainRequest/fightRequest'
import { getFighter } from '../../services/domainRequest/fightersRequest'

import './Modal.css'

const Modal = ({ title, bodyElement, onClose, fightId }) => {
  const [fighter1, setFighter1] = useState(null)
  const [fighter2, setFighter2] = useState(null)
  const [fighterFirstShots, setFighterFirstShots] = useState(null)
  const [fighterSecondShots, setFighterSecondShots] = useState(null)

  useEffect(() => {
    const getStatistics = async () => {
      const fight = await getFight(fightId)
      const firstFighter = await getFighter(fight.fighter1)
      const secondFighter = await getFighter(fight.fighter2)
      const fighter1Shots = fight.log[fight.log.length - 1].fighter1Shot
      const fighter2Shots = fight.log[fight.log.length - 1].fighter2Shot

      setFighter2(secondFighter)
      setFighter1(firstFighter)
      setFighterFirstShots(fighter1Shots)
      setFighterSecondShots(fighter2Shots)
    }

    getStatistics()
  }, [fightId])

  return (
    <div className="modal-layer">
      <div className="modal-root">
        <div className="modal-header">
          <span>{title}</span>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          {bodyElement}
          <p>
            <span className="name">{fighter1?.name}</span> has struck{' '}
            <span className="count">{fighterFirstShots}</span> blows.
          </p>
          <p>
            <span className="name">{fighter2?.name}</span> has struck{' '}
            <span className="count">{fighterSecondShots}</span> blows.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Modal
