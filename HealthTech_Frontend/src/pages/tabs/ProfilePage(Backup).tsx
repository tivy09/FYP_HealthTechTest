import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { showNavBar } from '../../app/auth/navBarSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  chevronForward,
  home,
  notificationsOutline,
  person,
  reader,
  settings,
} from 'ionicons/icons'
import './style.css'
import { logout } from '../../app/auth/authSlice'

const ProfilePage = () => {
  //logout alert
  const [logoutAlert, setLogoutAlert] = useState<boolean>(false)

  //card inline css
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#257cff', // Set your desired background color here
  }

  //useAppDispatch - call slice method
  const dispatch = useAppDispatch()

  //useeffect
  useEffect(() => {
    dispatch(showNavBar())
  }, [])

  //list button
  const listButton = [
    {
      id: 1,
      name: 'My Account Information',
      description: 'Change your account information',
      icon: person,
      path: '/',
    },
    {
      id: 2,
      name: 'My Medical Records',
      description: 'History of your medical records',
      icon: reader,
      path: '/',
    },
    {
      id: 3,
      name: 'Hospital Information',
      description: 'Information of our hospital',
      icon: home,
      path: '/',
    },
    {
      id: 4,
      name: 'Other Settings',
      description: 'Information of our hospital',
      icon: settings,
      path: '/',
    },
  ]

  //get user info from redux
  const userInfo = useAppSelector((state) => state.auth)

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid>
          {/* top row : icon */}
          <IonRow>
            <IonCol size="10" className="name-label">
              <IonLabel style={{ fontSize: '25px' }}>Profile</IonLabel>
            </IonCol>
            <IonCol size="2">
              <IonIcon size="large" src={notificationsOutline} />
            </IonCol>
          </IonRow>
          {/* profile card */}
          <IonCard style={cardStyle}>
            <IonCardContent>
              <IonRow>
                <IonCol size="4">
                  <img
                    className="round-image"
                    src="https://wallpaperaccess.com/full/6295120.jpg"
                  />
                </IonCol>
                <IonCol size="8" className="ion-padding-top">
                  <IonRow>
                    <IonText color={'light'}>{userInfo.username}</IonText>
                  </IonRow>
                  <IonRow>
                    <IonText color={'light'}>{userInfo.email}</IonText>
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
          {/* list button*/}
          {listButton.map((button: any) => (
            <IonList className="ion-padding">
              <IonItem className="ion-no-padding">
                <IonCol size="2">
                  <IonIcon src={button.icon} />
                </IonCol>
                <IonCol size="9">
                  <IonLabel>
                    <IonText>{button.name}</IonText>
                  </IonLabel>
                  <IonLabel>
                    <IonText style={{ fontSize: '12px' }} color={'medium'}>
                      {button.description}
                    </IonText>
                  </IonLabel>
                </IonCol>
                <IonCol size="1">
                  <IonIcon src={chevronForward} />
                </IonCol>
              </IonItem>
            </IonList>
          ))}
          <IonRow className="ion-no-padding">
            <IonCol>
              <IonButton
                shape="round"
                expand="full"
                type="submit"
                size="default"
                fill="outline"
                onClick={() => setLogoutAlert(true)}
              >
                Logout
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAlert
          isOpen={logoutAlert}
          header="Are you sure you want to logout?"
          subHeader="You might need to sign in again for detail"
          // message="This is an alert!"
          buttons={[
            {
              text: 'Cancel',
              handler: () => {
                setLogoutAlert(false)
              },
            },
            {
              text: 'Logout',
              handler: () => {
                dispatch(logout())
              },
            },
          ]}
        ></IonAlert>
      </IonContent>
    </IonPage>
  )
}
export default ProfilePage
