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
import { useAppDispatch, useAppSelector } from './src/app/hooks'

const ExamplePage = () => {
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
      <IonHeader>
        <IonTitle></IonTitle>
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
export default ExamplePage;
