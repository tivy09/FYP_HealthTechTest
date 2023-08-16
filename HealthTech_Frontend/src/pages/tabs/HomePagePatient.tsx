import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonSlide,
  IonSlides,
  IonText,
  IonThumbnail,
} from '@ionic/react'
import { useAppSelector } from '../../app/hooks'
import { useHistory } from 'react-router'
import {
  addCircleOutline,
  addOutline,
  chevronBack,
  chevronForward,
  happy,
  happyOutline,
  home,
  homeOutline,
  sad,
  shuffleOutline,
  star,
  thermometer,
} from 'ionicons/icons'
import addIcon from '../../assets/addIcon.svg'
import { relative } from 'path'
import { doctorApi } from '../../api/doctorApi'
import { useEffect, useState } from 'react'

//card inline css
const cardStyle: React.CSSProperties = {
  // width: '50px',
  height: '150px',
}

//card inline css
const slider: React.CSSProperties = {
  position: 'relative',
}

//symptoms list
const symptoms = [
  {
    id: 1,
    name: 'Temperature',
    svg: thermometer,
  },
  {
    id: 2,
    name: 'Snuffle',
    svg: shuffleOutline,
  },
  {
    id: 3,
    name: 'Pain',
    svg: sad,
  },
  {
    id: 4,
    name: 'Fatigue',
    svg: '',
  },
  {
    id: 5,
    name: 'Depression',
    svg: 'sad',
  },
]

const HomePagePatient = () => {
  const userInfo = useAppSelector((state) => state.auth)
  const history = useHistory()

  const [doctorList, setDoctorList] = useState<
    {
      id: number
      doctorName: string
      departmentName: string
      rating: number
      image: string
    }[]
  >([])

  useEffect(() => {
    getDoctorList()
    return
  }, [])

  //get doctor list 5-7
  const getDoctorList = async () => {
    const { data } = await doctorApi.getAllDoctor()
    const doctorData = data.response.doctors
    const sliceDoctorData = doctorData.slice(0, 7)
    if (data.status === 1301) {
      const extractedData: {
        id: number
        doctorName: string
        departmentName: string
        rating: number
        image: string
      }[] = sliceDoctorData.map((doctor: any) => ({
        key: doctor.id,
        id: doctor.id,
        doctorName: doctor.users.name,
        departmentName: doctor.departments.name,
        rating: 5.0,
        image: doctor.avatar_url === null ? '' : doctor.avatar_url,
      }))
      if (extractedData) {
        setDoctorList(extractedData)
      }
    }
  }

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-padding">
            <IonCol size="9" style={{ paddingTop: '8%' }}>
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
          <IonRow>
            <IonCol>
              <IonCard
                style={{
                  backgroundColor: '#257cff',
                  height: '150px',
                }}
              >
                <IonCardContent>
                  <IonRow>
                    <IonCol>
                      <IonIcon src={addIcon} size="large" color="light" />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonLabel>
                      <IonText color={'light'}>
                        <h2>Clinic Visit</h2>
                      </IonText>
                    </IonLabel>
                  </IonRow>
                  <IonRow>
                    <IonLabel>
                      <IonText color={'light'} style={{ fontSize: '12px' }}>
                        Call the doctor home
                      </IonText>
                    </IonLabel>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
            {/* right */}
            <IonCol>
              <IonCard style={cardStyle}>
                <IonCardContent>
                  <IonRow>
                    <IonCol>
                      <IonIcon src={home} size="large" color="primary" />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonLabel>
                      <IonText>
                        <h2>Home Visit</h2>
                      </IonText>
                    </IonLabel>
                  </IonRow>
                  <IonRow>
                    <IonLabel>
                      <IonText color={'medium'} style={{ fontSize: '12px' }}>
                        Call the doctor home
                      </IonText>
                    </IonLabel>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          {/* symptoms */}
          <IonRow>
            <IonCol className="ion-padding">
              <IonLabel>
                <IonText style={{ fontWeight: 'bold' }}>
                  What are your symptoms?
                </IonText>
                <IonRow>
                  <IonSlides>
                    {symptoms.map((symptoms: any) => (
                      <IonSlide key={symptoms.id}>
                        <IonCard
                          key={symptoms.id}
                          style={{ width: '200px', height: '150' }}
                        >
                          <IonCardContent>
                            <IonCol size="2" className="ion-padding-top">
                              <IonIcon src={symptoms.svg} />
                            </IonCol>
                            <IonCol size="10">
                              <IonText>{symptoms.name}</IonText>
                            </IonCol>
                          </IonCardContent>
                        </IonCard>
                      </IonSlide>
                    ))}
                  </IonSlides>
                </IonRow>
              </IonLabel>
            </IonCol>
          </IonRow>
          {/* popular doctor */}
          <IonRow>
            <IonCol className="ion-padding">
              <IonLabel>
                <IonText style={{ fontWeight: 'bold' }}>
                  Popular Doctors
                </IonText>
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            {doctorList.map((doctor: any) => (
              <IonCol key={doctor.id}>
                <IonCard>
                  <IonCardContent>
                    <IonRow>
                      <IonCol className="ion-text-center">
                        {doctor.image === '' ? (
                          <img
                            src="https://st2.depositphotos.com/45049140/44509/v/600/depositphotos_445090736-stock-illustration-flat-male-doctor-avatar-in.jpg"
                            style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <img
                            src={doctor.image}
                            style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                            }}
                          />
                        )}
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol className="ion-text-center ion-no-padding">
                        <IonLabel>
                          <IonText style={{ fontWeight: 'bold' }}>
                            {doctor.doctorName}
                          </IonText>
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol className="ion-text-center ion-no-padding">
                        <h2
                          className="ion-no-padding"
                          color={'medium'}
                          style={{
                            fontSize: '12px',
                            padding: 'none',
                            color: 'lightgray',
                          }}
                        >
                          {doctor.departmentName}
                        </h2>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol className="ion-text-center ion-no-padding">
                        <IonBadge color={'warning'}>
                          <IonIcon color="light" src={star} />
                          <IonText color={'light'}> 5.0</IonText>
                        </IonBadge>
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default HomePagePatient
