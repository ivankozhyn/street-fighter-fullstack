import './HealthIndicator.css'

const HealthIndicator = ({ fighter, position, healthIndicatorWidth }) => {
  return (
    <div className="arena___fighter-indicator">
      <span className="arena___fighter-name">{fighter.name}</span>
      <div className="arena___health-indicator">
        <div
          style={{ width: healthIndicatorWidth }}
          className="arena___health-bar"
          id={`${position}-fighter-indicator`}
        />
      </div>
    </div>
  )
}

export default HealthIndicator
