import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
} from '@ionic/react'
import { useHistory } from 'react-router'
// import './index.scss'
import { useState } from 'react'

const IndexPage = () => {
  //history - go to other page
  const history = useHistory()

  //patient button modal
  const [alert, setAlert] = useState<boolean>(false)

  //patient button modal list
  const patientButtonArray: any = [
    {
      id: 1,
      name: 'Login',
      path: '/login',
    },
    {
      id: 2,
      name: 'Make Appointment',
      path: '/bookAppointment',
    },
  ]

  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          style={{
            display: 'flex',
            margin: 'auto',
            padding: '0px 20px',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <div>
            <div className="login-content">
              <IonRow>
                <IonCol>
                  <IonButton
                    shape="round"
                    expand="full"
                    onClick={() => {
                      history.push('/login')
                    }}
                  >
                    I'm a Doctor/Nurse
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton
                    shape="round"
                    expand="full"
                    fill="outline"
                    onClick={() => {
                      setAlert(true)
                    }}
                  >
                    I'm a Patient
                  </IonButton>
                </IonCol>
              </IonRow>
            </div>
          </div>
        </div>
      </IonContent>
      {/* patient button */}
      <IonAlert
        isOpen={alert}
        header="Please select an option"
        buttons={[
          {
            text: 'Login',
            handler: () => {
              history.push('/login')
            },
          },
          {
            text: 'Make Appointment',
            handler: () => {
              history.push('/bookAppointment')
            },
          },
        ]}
      ></IonAlert>
    </IonPage>
  )
}
export default IndexPage
