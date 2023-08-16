import { IonRouterOutlet } from '@ionic/react'
import { Route, Redirect } from 'react-router'
import LoginPage from '../../pages/auth/LoginPage'

const PublicRoutes = () => {
  return (
    <>
      <IonRouterOutlet>
        <Route path="/login">
          <LoginPage />
        </Route>

        <Route>
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </>
  )
}

export default PublicRoutes
