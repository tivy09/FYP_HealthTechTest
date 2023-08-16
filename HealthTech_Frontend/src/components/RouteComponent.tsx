import { IonReactRouter } from '@ionic/react-router'
import { useAppSelector } from '../app/hooks'

//Page
import PrivateRoutes from '../utils/routes/PrivateRoutes'
import PublicRoutes from '../utils/routes/PublicRoutes'

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
