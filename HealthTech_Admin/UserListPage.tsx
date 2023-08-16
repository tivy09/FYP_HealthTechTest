import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import React from 'react'

const LoginPage = () => {
  return (
    <IonPage>
      <IonHeader class="center">
        <IonToolbar>
          <IonTitle class="ion-text-center">Admin Panel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="center">
        <IonGrid class="ion-padding"></IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default LoginPage
