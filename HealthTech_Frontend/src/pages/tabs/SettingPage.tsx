import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  useIonToast,
} from '@ionic/react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { logout } from '../../app/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

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
      <IonHeader className="ion-padding">
        <IonTitle>Setting Page</IonTitle>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonList>
          <IonItem
            onClick={() => {
              dispatch(logout())
              history.push('/login')
            }}
          >
            <IonLabel>Logout</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Mega Man X</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>The Legend of Zelda</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Pac-Man</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Super Mario World</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}
export default SettingPage
