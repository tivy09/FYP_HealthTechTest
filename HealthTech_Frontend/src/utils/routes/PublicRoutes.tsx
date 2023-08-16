import { IonRouterOutlet } from '@ionic/react'
import { Route, Redirect } from 'react-router'
import LoginPage from '../../pages/auth/LoginPage'
import RegisterPage from '../../pages/auth/RegisterPage'
import MakeAppointmentPage from '../../pages/main/appointmentPatient/MakeAppointmentPage'
import IndexPage from '../../pages/auth/IndexPage'

const PublicRoutes = () => {
  return (
    <>
      <IonRouterOutlet>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/bookAppointment">
          <MakeAppointmentPage />
        </Route>
        <Route path="/index">
          <IndexPage />
        </Route>
        <Route>
          <Redirect to="/index" />
        </Route>
      </IonRouterOutlet>
    </>
  )
}

export default PublicRoutes
