import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSlide,
  IonSlides,
  IonText,
  IonToggle,
} from '@ionic/react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import './style.css'
import AppointmentCard from '../../components/AppointmentCard'
import { useEffect, useState } from 'react'
import PatientCard from '../../components/PatientCard'
import { useHistory } from 'react-router'
import { showNavBar } from '../../app/auth/navBarSlice'
import { noticeBoardAPI } from '../../api/noticeBoardApi'
import { LoadingState, NoticeBoardData } from '../../utils/types/types'

const HomePageDoctor = () => {
  //dispatch redux method
  const dispatch = useAppDispatch()

  //change route
  const history = useHistory()

  //get user info from store
  const userInfo = useAppSelector((state) => state.auth)

  //notice list
  const [noticeList, setNoticeList] = useState<NoticeBoardData[]>()

  //loadingNotice state
  const [loadingNotice, setLoadingNotice] = useState<LoadingState>('idle')

  //notice board list
  const getNoticeList = async () => {
    setLoadingNotice('success')
    const { data } = await noticeBoardAPI.getAllNotice()
    if (data.status === 1001) {
      setLoadingNotice('success')
      const responseArray = data.response.noticeBoards
      const filteredData = responseArray.filter(
        (item: any) => item.status === 1,
      )
      setNoticeList([...filteredData])
    }
  }

  //useeffect
  useEffect(() => {
    getNoticeList()
    dispatch(showNavBar())
    return
  }, [])

  //test data
  const appointments = [
    {
      id: 1,
      patient: 'Abu',
      doctor: 'Doctor Beckham',
      date: '2023-1-15',
      time: '1505',
    },
    {
      id: 2,
      patient: 'Abu',
      doctor: 'Doctor Beckham',
      date: '2023-1-15',
      time: '1505',
    },
    {
      id: 3,
      patient: 'Abu',
      doctor: 'Doctor Beckham',
      date: '2023-1-15',
      time: '1505',
    },
    {
      id: 4,
      patient: 'Abu',
      doctor: 'Doctor Beckham',
      date: '2023-1-15',
      time: '1505',
    },
    {
      id: 5,
      patient: 'Abu',
      doctor: 'Doctor Beckham',
      date: '2023-1-15',
      time: '1505',
    },
    // Add more dynamic appointment data here
  ]

  const slideOpts = {
    initialSlide: 1,
    speed: 400,
  }

  //search bar function start
  const [searchQuery, setSearchQuery] = useState<string>('')

  function handleSearchInput(event: CustomEvent) {
    setSearchQuery(event.detail.value)
  }

  const handleSearch = async () => {
    alert('search api called')
  }
  //search bar function end

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="9" className="ion-padding-top">
              <IonLabel className="name-label">
                Hi, {userInfo.username}
              </IonLabel>
            </IonCol>
            <IonCol size="3">
              <img
                onClick={() => history.push('/profile')}
                className="round-image"
                src="https://wallpaperaccess.com/full/6295120.jpg"
              />
            </IonCol>
          </IonRow>
          {/* <IonRow>
            <IonCol className="ion-text-center ion-padding-top">
              <IonLabel className="segment-label">
                <IonText>Upcoming Appointments</IonText>
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <AppointmentCard appointmentData={appointments} />
            </IonCol>
          </IonRow> */}

          <IonSlides options={slideOpts} pager={true}>
            {loadingNotice === 'success' &&
              noticeList &&
              noticeList.length > 0 &&
              noticeList.map((notice: NoticeBoardData) => (
                <IonSlide key={notice.id}>
                  <IonCard style={{ width: '90%' }}>
                    {notice.image_id === null ? (
                      <IonImg
                        alt={notice.title}
                        src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR880drDA1inLyW7DSfu48Q-ju9eW7vTb5GiA&usqp=CAU`}
                      />
                    ) : (
                      <IonImg alt={notice.title} src={notice.image_url} />
                    )}
                    <IonCardHeader>
                      <IonCardTitle>{notice.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonRow>
                        <IonCol size="10">{notice.description}</IonCol>
                      </IonRow>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
              ))}
          </IonSlides>

          <IonRow class="ion-no-padding">
            <IonCol size="9">
              <IonSearchbar
                placeholder="Search"
                onIonInput={handleSearchInput}
                showClearButton="focus"
              />
            </IonCol>
            <IonCol size="3" style={{ paddingTop: '5%' }}>
              <IonButton onClick={handleSearch} size="small">
                <IonText>Search</IonText>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonList>
            <IonRow>
              <PatientCard patientData={appointments} />
            </IonRow>
          </IonList>
        </IonGrid>
      </IonContent>
      {/* if user type === 3 (doctor) */}
      {/* if user type === 4 (patient) */}
      {/* if user type === 3 (user) */}
    </IonPage>
  )
}
export default HomePageDoctor
