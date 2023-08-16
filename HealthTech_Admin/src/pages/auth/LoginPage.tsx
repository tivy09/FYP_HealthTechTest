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
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { authAPI } from '../../api/authApi'
import { saveUserData } from '../../app/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { LoadingState, LoginData } from '../../utils/types/types'
import { Storage } from '@capacitor/storage'
import { getToken, setToken } from '../../utils/capacitor/CapacitorStore'

const LoginPage = () => {
  //loading state
  const [isLoadingData, setIsLoadingData] = useState<LoadingState>('success')

  //const set state
  const [bookModal, setBookModal] = useState<boolean>(false)

  //useAppDispatch - save data to local storage
  const dispatch = useAppDispatch()

  //set toast msg
  const [presentToast] = useIonToast()

  //history - go to other page
  const history = useHistory()

  //hook form init
  const { register, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      input: 'admin',
      password: 'password',
    },
  })

  //submtit form
  const onSubmit = async (data: LoginData) => {
    setIsLoadingData('loading')
    const { data: responseData } = await authAPI.loginUser(data)
    if (responseData.status === 702) {
      presentToast({
        message: responseData.message,
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
      // const token: any = atob(responseData.response)
      const token: any = responseData.response
      // setToken(await JSON.parse(token).token)
      setToken(token.token)
      dispatch(saveUserData(token))
      history.push('/home')
      setIsLoadingData('success')
    } else if (responseData.status !== 702) {
      setIsLoadingData('failed')
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
      <IonHeader class="center">
        <IonToolbar>
          <IonTitle class="ion-text-center">Admin Panel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="center">
        <IonGrid class="ion-padding">
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonRow>
              <IonCol size="12">
                <IonItem
                  className="ion-border"
                  style={{ borderRadius: '20px' }}
                >
                  <IonInput
                    type="text"
                    required
                    placeholder="Username"
                    {...register('input', { required: true })}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonItem style={{ borderRadius: '20px' }}>
                  <IonInput
                    type="password"
                    required
                    placeholder="Password"
                    {...register('password', { required: true })}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                {isLoadingData === 'success' ? (
                  <IonButton
                    shape="round"
                    expand="full"
                    type="submit"
                    size="large"
                  >
                    Login
                  </IonButton>
                ) : (
                  <IonButton
                    shape="round"
                    expand="full"
                    size="large"
                    disabled={true}
                  >
                    <IonSpinner />
                  </IonButton>
                )}
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default LoginPage
