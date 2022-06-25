import { useState } from 'react'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'

import { login } from '../../services/domainRequest/auth'
import { setLoginSession } from '../../services/authService'

import './SignIn.css'

export default function SignIn({ setIsLoggedIn }) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const onEmailChange = event => {
    setEmail(event.target.value)
  }

  const onPasswordChange = event => {
    setPassword(event.target.value)
  }

  const onSubmit = async () => {
    const data = await login({ email, password })
    if (data && !data.error) {
      setLoginSession(data)
      setIsLoggedIn(true)
    }
  }

  return (
    <form noValidate autoComplete="off">
      <TextField
        sx={{ margin: '8px', width: 300 }}
        onChange={onEmailChange}
        id="email"
        label="Email"
        placeholder="Email"
      />
      <TextField
        sx={{ margin: '8px', width: 300 }}
        onChange={onPasswordChange}
        id="password"
        label="Password"
        placeholder="Password"
        type="password"
      />
      <Button
        sx={{ margin: '8px', width: 300 }}
        onClick={onSubmit}
        variant="contained"
        color="primary"
      >
        Sign In
      </Button>
    </form>
  )
}
