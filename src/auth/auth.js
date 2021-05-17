import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import FadeLoader from 'react-spinners/FadeLoader'
import app from './config'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    })
  }, [])

  if (pending) {
    return (
      <Grid className={'centered'}>
        <FadeLoader
          color={'#FF0000'}
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
      </Grid>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
