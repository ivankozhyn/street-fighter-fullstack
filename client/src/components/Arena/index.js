import { useEffect } from 'react'

import HealthIndicators from '../HealthIndicators'
import FightersPreview from '../FightersPreview'
import { useFight } from '../../hooks/useFight'
import { createFight } from '../../services/domainRequest/fightRequest'

import './Arena.css'

const Arena = ({ selectedFighters = [], showModal, fightId, setFightId }) => {
  const [fighterWinner, healthLeftIndicatorWidth, healthRightIndicatorWidth] =
    useFight(...selectedFighters, fightId)

  if (fighterWinner) {
    showModal(fighterWinner)
  }

  useEffect(() => {
    const reqCreateFight = async () => {
      const createdFight = await createFight({
        fighter1: selectedFighters[0].id,
        fighter2: selectedFighters[1].id,
        log: [
          {
            fighter1Shot: 0,
            fighter2Shot: 0,
            fighter1Health: selectedFighters[0].health,
            fighter2Health: selectedFighters[1].health,
          },
        ],
      })
      setFightId(createdFight.id)
    }
    reqCreateFight()
  }, [selectedFighters, setFightId])

  return (
    <div className="arena___root">
      <HealthIndicators
        selectedFighters={selectedFighters}
        healthLeftIndicatorWidth={healthLeftIndicatorWidth}
        healthRightIndicatorWidth={healthRightIndicatorWidth}
      />
      <FightersPreview selectedFighters={selectedFighters} />
    </div>
  )
}

export default Arena
