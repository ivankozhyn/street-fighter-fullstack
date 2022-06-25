import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

import { fightersImgs, defaultFightersImg } from '../../config/fightersImgs'

import './FighterSelector.css'

export default function FighterSelector({
  fightersList = [],
  onFighterSelect,
  selectedFighter,
}) {
  const [fighter, setFighter] = useState()

  const handleChange = event => {
    debugger
    setFighter(event.target.value)
    onFighterSelect(event.target.value)
  }

  return (
    <div>
      <FormControl
        sx={{
          margin: '1rem',
          minWidth: 120,
        }}
      >
        <InputLabel id="simple-select-label">Select Fighter</InputLabel>
        <Select
          sx={{ width: '300px' }}
          labelId="simple-select-label"
          id="simple-select"
          value={fighter ?? ''}
          onChange={handleChange}
          label="Select Fighter"
        >
          {fightersList.map(it => {
            return (
              <MenuItem key={`${it.name}`} value={it}>
                {it.name ?? ''}
              </MenuItem>
            )
          })}
        </Select>
        {selectedFighter ? (
          <div className="selectedFighter">
            <img
              className="selectedFighterImg"
              src={fightersImgs[selectedFighter.name] ?? defaultFightersImg}
              alt={selectedFighter.name}
            />
            <div className="selectedFighterDetails">
              <div>
                <span className="details">Name:</span> {selectedFighter.name}
              </div>
              <div>
                <span className="details"> Power:</span> {selectedFighter.power}
              </div>
              <div>
                <span className="details"> Defense:</span>
                {selectedFighter.defense}
              </div>
              <div>
                <span className="details">Health:</span>
                {selectedFighter.health}
              </div>
            </div>
          </div>
        ) : null}
      </FormControl>
    </div>
  )
}
