import { useState } from 'react'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'

import { createFighter } from '../../services/domainRequest/fightersRequest'

import './NewFighter.css'

export default function NewFighter({ onCreated }) {
  const [name, setName] = useState()
  const [power, setPower] = useState()
  const [defense, setDefense] = useState()

  const onNameChange = event => {
    setName(event.target.value)
  }

  const onPowerChange = event => {
    const value =
      event.target.value || event.target.value === 0
        ? Number(event.target.value)
        : null
    setPower(value)
  }

  const onDefenseChange = event => {
    const value =
      event.target.value || event.target.value === 0
        ? Number(event.target.value)
        : null
    setDefense(value)
  }

  const resetInputs = () => {
    setName('')
    setPower('')
    setDefense('')
  }

  const onSubmit = async () => {
    const data = await createFighter({ name, power, defense })
    if (data && !data.error) {
      onCreated(data)
      resetInputs()
    }
  }

  return (
    <div id="new-fighter">
      <div>Create new Fighter</div>
      <TextField
        onChange={onNameChange}
        id="name"
        label="Name"
        placeholder="Name"
        value={name}
      />
      <TextField
        onChange={onPowerChange}
        id="power"
        label="Power"
        placeholder="Power"
        type="number"
        value={power}
      />
      <TextField
        onChange={onDefenseChange}
        id="defense"
        label="Defense"
        placeholder="Defense"
        type="number"
        value={defense}
      />
      <Button onClick={onSubmit} variant="contained" color="primary">
        Create
      </Button>
    </div>
  )
}
