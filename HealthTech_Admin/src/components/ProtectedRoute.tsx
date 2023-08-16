import { Redirect, Route, useLocation } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { useEffect, useState } from 'react'
import { Capacitor } from '@capacitor/core'

//@ts-ignore
function ProtectedRoute({ component: Component, ...restOfProps }) {
  const [loadingRoute, setLoadingRoute] = useState<boolean>(true)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isRegistered, setIsRegistered] = useState<boolean>(false)

  const authInfo = useAppSelector((state) => state.auth)
  const location = useLocation()

  useEffect(() => {
    if (authInfo.is_auth) {
      setIsAuthenticated(true)
      setLoadingRoute(false)
    }
  }, [authInfo.is_auth])

  return (
    <>
      {!loadingRoute && (
        <Route
          {...restOfProps}
          render={(props) =>
            isAuthenticated ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{ pathname: '/login', state: { from: location } }}
              />
            )
          }
        />
      )}
    </>
  )
}

export default ProtectedRoute
