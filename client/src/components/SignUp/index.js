import { useState } from 'react'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'

import { createUser } from '../../services/domainRequest/userRequest'
import { setLoginSession } from '../../services/authService'

export default function SignUp({ setIsLoggedIn }) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [phoneNumber, setPhoneNumber] = useState()

  const onEmailChange = event => {
    setEmail(event.target.value)
  }

  const onPasswordChange = event => {
    setPassword(event.target.value)
  }

  const onFirstNameChange = event => {
    setFirstName(event.target.value)
  }

  const onLastNameChange = event => {
    setLastName(event.target.value)
  }

  const onPhoneNumberChange = event => {
    setPhoneNumber(event.target.value)
  }

  const onSubmit = async () => {
    const data = await createUser({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    })
    if (data && !data.error) {
      setLoginSession(data)
      setIsLoggedIn(true)
    }
  }

  return (
    <form noValidate autoComplete="off">
      <TextField
        sx={{ margin: '8px', width: 300 }}
        key="first-name"
        onChange={onFirstNameChange}
        id="first-name"
        label="First Name"
        placeholder="First Name"
      />
      <TextField
        sx={{ margin: '8px', width: 300 }}
        key="last-name"
        onChange={onLastNameChange}
        id="last-name"
        label="Last Name"
        placeholder="Last Name"
      />
      <TextField
        sx={{ margin: '8px', width: 300 }}
        key="email"
        onChange={onEmailChange}
        id="email"
        label="Email"
        placeholder="Email"
      />
      <TextField
        sx={{ margin: '8px', width: 300 }}
        key="phone"
        onChange={onPhoneNumberChange}
        id="phone"
        label="Phone Number"
        placeholder="Phone Number"
      />
      <TextField
        sx={{ margin: '8px', width: 300 }}
        key="password"
        onChange={onPasswordChange}
        id="password"
        label="Password"
        placeholder="Password"
        type="password"
      />
      <Button
        sx={{ margin: '8px' }}
        onClick={onSubmit}
        variant="contained"
        color="primary"
      >
        Sign Up
      </Button>
    </form>
  )
}
