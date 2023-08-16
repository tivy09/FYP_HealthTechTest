import {
  IonAlert,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
  useIonViewDidEnter,
} from '@ionic/react'
import { useRef, useState } from 'react'
import { add, createOutline, person, toggle } from 'ionicons/icons'
import { LoadingState } from '../../../utils/types/types'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { home } from 'ionicons/icons'
import { doctorAPI } from '../../../api/doctorApi'

const DoctorPage = () => {
  const [toggleOpen, setToggleOpen] = useState(false)

  const [toggleId, setToggleId] = useState<number>(0)

  //set toast msg
  const [presentToast] = useIonToast()

  //history - go to other page
  const history = useHistory()

  //loading state
  const [isLoadingData, setIsLoadingData] = useState<LoadingState>('idle')

  //set patient data array
  const [doctorData, setDoctorData] = useState<
    { id: number; name: string; image?: string; status: number }[]
  >([])

  //image ref
  const imageRef = useRef<HTMLInputElement>(null)

  //run mthod when enter page
  useIonViewDidEnter(() => {
    getAllPatient()
  }, [])

  //get all patient method
  const getAllPatient = async () => {
    setIsLoadingData('loading')
    const { data } = await doctorAPI.getAllDoctor()
    const doctors = data.response.doctors
    if (data.status === 1301 && doctors.length > 0) {
      const extractedData: {
        id: number
        name: string
        image: any
        status: number
      }[] = doctors.map((doctor: any) => ({
        id: doctor.id,
        name: `${doctor.first_name} ${doctor.last_name}`,
        image: doctor.avatar_thumbnail,
        status: doctor.status,
      }))
      if (extractedData) {
        setIsLoadingData('success')
        setDoctorData([...extractedData])
      }
    } else if (data.status === 1301 && doctors.length === 0) {
      setIsLoadingData('success')
      setDoctorData([])
    }
    if (doctorData) setIsLoadingData('success')
  }

  //handle doctor status
  const handleDoctorStatus = async (id: number) => {
    setToggleOpen(true)
    const { data } = await doctorAPI.changeDoctorStatus(id)
    if (data.status === 1306) {
      presentToast({
        message: data.message,
        duration: 2000,
        position: 'bottom',
        color: 'success',
      })
      setToggleOpen(false)
      getAllPatient()
    }
  }

  return (
    <IonPage>
      <IonHeader class="center">
        <IonToolbar>
          <IonButtons
            slot="start"
            onClick={() => history.push('/')}
            style={{ paddingLeft: '2%' }}
          >
            <IonIcon src={home} />
          </IonButtons>
          <IonTitle class="ion-text-center">Doctor</IonTitle>
          <IonButtons
            slot="end"
            onClick={() => history.goBack()}
            style={{ padding: '2%' }}
          >
            <IonIcon src={person} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="center">
        <IonGrid class="ion-no-padding">
          {isLoadingData === 'loading' && (
            <IonRow>
              <IonCol class="ion-text-center ion-padding">
                <IonSpinner />
              </IonCol>
            </IonRow>
          )}
          {isLoadingData === 'success' &&
            doctorData &&
            doctorData.length === 0 && (
              <IonRow>
                <IonCol class="ion-text-center ion-padding">
                  <IonText>There's no any doctor here</IonText>
                </IonCol>
              </IonRow>
            )}
          {isLoadingData === 'success' &&
            doctorData.length > 0 &&
            doctorData.map((doctor) => (
              <IonCard key={doctor.id}>
                <IonCardContent>
                  <IonList>
                    <IonItem lines="none">
                      <IonThumbnail slot="start">
                        <img
                          alt={doctor.name}
                          src={
                            doctor.image === null
                              ? 'https://img.freepik.com/free-icon/doctor_318-201539.jpg'
                              : doctor.image
                          }
                          onClick={() => {
                            history.push(`/doctor/detail/${doctor.id}`)
                          }}
                        />
                      </IonThumbnail>

                      <IonLabel
                        onClick={() => {
                          history.push(`/doctor/detail/${doctor.id}`)
                        }}
                      >
                        {''}
                        {doctor.name}
                      </IonLabel>
                      <IonIcon
                        src={createOutline}
                        size="large"
                        onClick={() => {
                          history.push(`/doctor/edit/${doctor.id}`)
                        }}
                      />
                      <IonToggle
                        mode="md"
                        checked={doctor.status === 1 ? true : false}
                        onIonChange={() => {
                          setToggleId(doctor.id)
                          if (toggleId) setToggleOpen(true)
                        }}
                      ></IonToggle>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            ))}
        </IonGrid>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon
              icon={add}
              onClick={() => {
                history.push('/doctor/add')
              }}
            ></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonAlert
          isOpen={toggleOpen}
          header="Change doctor status?"
          buttons={[
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                setToggleOpen(false)
              },
            },
            {
              text: 'Yes',
              handler: () => {
                if (toggleId) handleDoctorStatus(toggleId)
              },
            },
          ]}
        ></IonAlert>
      </IonContent>
    </IonPage>
  )
}
export default DoctorPage
