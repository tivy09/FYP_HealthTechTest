import {
  IonButton,
  IonCard,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { authAPI } from '../../../api/authApi'
import { saveUserData } from '../../../app/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import BackHeader from '../../../components/BackHeader'
import { LoginData } from '../../../utils/types/types'

const MedicineDetailPage = () => {
  //useAppDispatch - save data to local storage
  const dispatch = useAppDispatch()

  //set toast msg
  const [presentToast] = useIonToast()

  //history - go to other page
  const history = useHistory()

  return (
    <IonPage>
      <IonHeader class="ion-text-center">
        <IonToolbar>
          <BackHeader />
          <IonTitle class="ion-text-center">Medicine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid fixed>
          <IonCol>
            <IonItem style={{ borderRadius: '25px' }}>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput />
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem style={{ borderRadius: '25px' }}>
              <IonLabel position="floating">Amount</IonLabel>
              <IonInput />
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem style={{ borderRadius: '25px' }}>
              <IonLabel position="floating">Price</IonLabel>
              <IonInput type="number" />
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem style={{ borderRadius: '25px' }}>
              <IonLabel position="floating">Medicine Category</IonLabel>
              <IonInput />
            </IonItem>
          </IonCol>
          <IonItem style={{ borderRadius: '25px' }}>
            <IonCol size="10">
              <IonLabel>Status</IonLabel>
            </IonCol>
            <IonCol size="2">
              <IonToggle
                checked={true}
                // slot="end"
                // onIonChange={(e) => setValue('isVeg', e.detail.checked)}
              />
            </IonCol>
          </IonItem>
          <br />
          <IonButton
            type="submit"
            expand="block"
            fill="solid"
            shape="round"
            size="default"
          >
            Submit
          </IonButton>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default MedicineDetailPage
