import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import { useHistory } from 'react-router'
import { person, settings } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { NoticeBoardData } from '../../utils/types/types'
import NoticeList from '../main/noticeBoard/NoticeList'
import { useAppDispatch } from '../../app/hooks'
import { showNavBar } from '../../app/auth/navBarSlice'

const HomePage = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(showNavBar())
  }, [])
  //set toast msg
  const [presentToast] = useIonToast()

  //history - go to other page
  const history = useHistory()

  //notice list
  const [noticeList, setNoticeList] = useState<NoticeBoardData[]>()

  //button array
  const cardArray: any = [
    {
      id: 1,
      name: 'Patient',
      path: '/patient',
    },
    {
      id: 2,
      name: 'Doctor',
      path: '/doctor',
    },
    {
      id: 3,
      name: 'Department',
      path: '/department',
    },
    {
      id: 4,
      name: 'Nurse',
      path: '/nurse',
    },
    {
      id: 5,
      name: 'Medicine',
      path: '/medicine',
    },
    {
      id: 6,
      name: 'Medicine Category',
      path: '/medicineCategory',
    },
    {
      id: 7,
      name: 'Appointment',
      path: '/appointment',
    },
  ]

  return (
    <IonPage>
      <IonHeader class="ion-text-center">
        <IonToolbar>
          <IonButtons
            slot="start"
            onClick={() => history.push('/setting')}
            style={{ paddingLeft: '2%' }}
          >
            <IonIcon src={settings} />
          </IonButtons>
          <IonTitle>Home Page</IonTitle>
          <IonButtons
            slot="end"
            onClick={() => history.push('/setting')}
            style={{ paddingRight: '2%' }}
          >
            <IonIcon src={person} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        {/* button array */}
        {/* <IonGrid>
          {cardArray.map((card: any) => (
            <IonRow key={card.id}>
              <IonCol class="ion-text-center ion-no-padding">
                <IonCard>
                  <IonCardContent onClick={() => history.push(card.path)}>
                    <IonText color={'primary'} class="ion-text-center">
                      {card.name}
                    </IonText>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
          <IonRow>
            <IonCol>
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
        </IonGrid> */}
        <NoticeList />

        {/* fab button */}
        {/* <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton color="secondary">
            <IonIcon icon={menu}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton color="primary" size="small">
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFabList>
          <IonFabList side="start">
            <IonFabButton color="danger">
              <IonIcon icon={chevronBack}></IonIcon>
            </IonFabButton>
            <IonFabButton color="dark">
              <IonIcon icon={chevronBack}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab> */}
      </IonContent>
    </IonPage>
  )
}
export default HomePage
