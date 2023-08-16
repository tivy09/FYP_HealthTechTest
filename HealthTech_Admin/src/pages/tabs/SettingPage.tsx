import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { logout } from '../../app/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import BackHeader from '../../components/BackHeader'
import { settings, person } from 'ionicons/icons'

const SettingPage = () => {
  //useAppDispatch - save data to local storage
  const dispatch = useAppDispatch()

  //set toast msg
  const [presentToast] = useIonToast()

  //history - go to other page
  const history = useHistory()

  //hook form init
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {},
  })

  return (
    <IonPage>
      <IonHeader class="ion-text-center">
        <IonToolbar>
          <BackHeader />
          <IonTitle>Setting Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                shape="round"
                expand="full"
                type="submit"
                size="large"
                onClick={() => history.push('/updatePassword')}
              >
                Update Password
              </IonButton>
              <IonButton
                shape="round"
                expand="full"
                type="submit"
                size="large"
                onClick={() => dispatch(logout())}
              >
                Logout
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default SettingPage
