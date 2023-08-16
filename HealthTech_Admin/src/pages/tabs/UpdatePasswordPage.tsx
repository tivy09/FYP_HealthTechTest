import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  useIonToast,
} from '@ionic/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import BackHeader from '../../components/BackHeader'

const UpdatePasswordPage = () => {
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
      <IonHeader>
        <BackHeader />
        <IonTitle>Update Password Page</IonTitle>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default UpdatePasswordPage
