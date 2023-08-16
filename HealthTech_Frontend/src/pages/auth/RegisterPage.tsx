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
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { authAPI } from '../../api/authApi'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RegisterData } from '../../utils/types/types'

const RegisterPage = () => {
  //useAppDispatch - save data to local storage

  //set toast msg
  const [presentToast] = useIonToast()

  //history - go to other page
  const history = useHistory()

  //hook form init
  const {
    register,
    handleSubmit,
  } = useForm<RegisterData>({
    defaultValues: {
      username: '',
      phone_number: '',
      email: '',
      password: '',
      is_active: '',
    },
  })

  //submtit form
  const onSubmit = async (data: RegisterData) => {
    const payload = {
      username: data.username,
      phone_number: data.phone_number,
      email: data.email,
      password: data.password,
      is_active: '1',
    }
    const encryptPayload = btoa(
      unescape(encodeURIComponent(JSON.stringify(payload))),
    )
    const { data: responseData } = await authAPI.registerUser(encryptPayload)
    if (responseData.status === 700) {
      presentToast({
        message: responseData.message,
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
    } else if (responseData.status !== 700) {
      presentToast({
        message: responseData.message,
        duration: 1500,
        position: 'bottom',
        color: 'danger',
      })
    }
  }

  return (
    <IonPage>
      <IonHeader class="ion-text-center">
        <IonToolbar>
          <IonTitle>Register Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonGrid class="ion-padding">
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonRow>
              <IonCol>
                <IonItem
                  className="ion-border"
                  style={{ borderRadius: '20px' }}
                >
                  <IonInput
                    inputMode="text"
                    required
                    type="text"
                    placeholder="username"
                    {...register('username', { required: true })}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem
                  className="ion-border"
                  style={{ borderRadius: '20px' }}
                >
                  <IonInput
                    inputMode="text"
                    required
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: true })}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem
                  className="ion-border"
                  style={{ borderRadius: '20px' }}
                >
                  <IonInput
                    inputMode="tel"
                    required
                    type="number"
                    placeholder="Phone Number"
                    {...register('phone_number', { required: true })}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem
                  className="ion-border"
                  style={{ borderRadius: '20px' }}
                >
                  <IonInput
                    inputMode="text"
                    required
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonButton
                  shape="round"
                  expand="full"
                  type="submit"
                  size="large"
                >
                  Register
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow
              className="ion-text-center"
              onClick={() => {
                history.push('/login')
              }}
            >
              <IonCol size="12">
                <IonText color="primary">Login Here</IonText>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default RegisterPage
