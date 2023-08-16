import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonFab,
  IonFabButton,
  IonFabList,
  IonBadge,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import {
  triangle,
  ellipse,
  square,
  add,
  person,
  settings,
  home,
  personAdd,
  appsOutline,
  cubeOutline,
  notificationsOutline,
  readerOutline,
  calendar,
  informationCircle,
  map,
  personCircle,
  settingsOutline,
} from 'ionicons/icons'
import { Redirect, Route, Switch } from 'react-router'
import { useAppSelector } from '../app/hooks'

//Page
import LoginPage from '../pages/auth/LoginPage'
import HomePage from '../pages/tabs/HomePage'
import SettingPage from '../pages/tabs/SettingPage'
import PrivateRoutes from '../utils/routes/PrivateRoutes'
import PublicRoutes from '../utils/routes/PublicRoutes'
import ProtectedRoute from './ProtectedRoute'

const RouteComponent = () => {
  return (
    <IonReactRouter>
      <RenderRoute />
    </IonReactRouter>
  )
}

const RenderRoute: React.FC = (props) => {
  const authInfo = useAppSelector((state) => state.auth)
  return (
    <IonReactRouter>
      {/* <ErrorBoundary onReset={() => redirectToLogin()} FallbackComponent={ErrorFallback}> */}
      {authInfo.is_auth === true && authInfo.token !== '' ? (
        <PrivateRoutes />
      ) : (
        <PublicRoutes />
      )}
      {/* </ErrorBoundary> */}
    </IonReactRouter>
  )
}
export default RouteComponent
