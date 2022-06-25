import HealthIndicator from '../HealthIndicator'

import './HealthIndicators.css'

const HealthIndicators = ({
  selectedFighters,
  healthLeftIndicatorWidth,
  healthRightIndicatorWidth,
}) => {
  const [leftFighter, rightFighter] = selectedFighters

  return (
    <div className="arena___fight-status">
      <HealthIndicator
        fighter={leftFighter}
        position="left"
        healthIndicatorWidth={healthLeftIndicatorWidth}
      />
      <div className="arena___versus-sign"></div>
      <HealthIndicator
        fighter={rightFighter}
        position="right"
        healthIndicatorWidth={healthRightIndicatorWidth}
      />
    </div>
  )
}

export default HealthIndicators
