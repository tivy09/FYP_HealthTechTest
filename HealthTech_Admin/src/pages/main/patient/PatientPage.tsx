import {
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
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react'
import { patientAPI } from '../../../api/patientApi'
import { useRef, useState } from 'react'
import { add, createOutline, person } from 'ionicons/icons'
import { LoadingState } from '../../../utils/types/types'
import { useForm } from 'react-hook-form'
import './PatientPage.css'
import { useHistory } from 'react-router'
import PatientDetailPage from './PatientDetailPage'
import { home } from 'ionicons/icons'

const PatientPage = () => {
  const {
    setValue,
    formState: { errors, isSubmitted, isSubmitSuccessful },
    getValues,
  } = useForm<any>({
    defaultValues: {
      selectedPatientId: 0,
      selectedPatientName: '',
      selectedPatientImage: '',
    },
  })
  // patient detail modal
  const [addPatientModal, setAddPatientModal] = useState(false)

  //history - go to other page
  const history = useHistory()

  //loading state
  const [isLoadingData, setIsLoadingData] = useState<LoadingState>('idle')

  //set patient data array
  const [patientData, setPatientData] = useState<
    { id: number; name: string; image?: string }[]
  >([])

  //image ref
  const imageRef = useRef<HTMLInputElement>(null)

  //run mthod when enter page
  useIonViewDidEnter(() => {
    getAllPatient()
  }, [])

  const onImageUploaderClicked = () => {
    // takePhoto();
    if (imageRef.current) {
      imageRef.current.click()
    }
  }

  //get all patient method
  const getAllPatient = async () => {
    setIsLoadingData('loading')
    try {
      const { data } = await patientAPI.getAllPatient()
      const patients = data.response.patients
      const extractedData: {
        id: number
        name: string
        image: any
      }[] = patients.map((patient: any) => ({
        id: patient.id,
        name: `${patient.first_name} ${patient.last_name}`,
        image: patient.avatar_preview,
      }))
      if (extractedData) {
        setIsLoadingData('success')
        setPatientData([...extractedData])
      }
    } catch (error) {
      console.error('Error fetching patients:', error)
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
          <IonTitle class="ion-text-center">Patient</IonTitle>

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
              <IonCol class="ion-text-center">
                <IonSpinner />
              </IonCol>
            </IonRow>
          )}
          {isLoadingData === 'success' &&
            patientData.map((patient) => (
              <IonCard key={patient.id}>
                <IonCardContent>
                  <IonList>
                    <IonItem lines="none">
                      <IonThumbnail slot="start">
                        <img
                          alt={patient.name}
                          src={
                            patient.image === null
                              ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5mojA4Q00CdqRgvGbJVYXqhRbHiZdgtFNIQ&usqp=CAU'
                              : patient.image
                          }
                          onClick={() => {
                            setAddPatientModal(true)
                            setValue('selectedPatientId', patient.id)
                          }}
                        />
                      </IonThumbnail>

                      <IonLabel
                        onClick={() => {
                          setAddPatientModal(true)
                          setValue('selectedPatientId', patient.id)
                        }}
                      >
                        {''}
                        {patient.name}
                      </IonLabel>
                      <IonIcon
                        src={createOutline}
                        size="large"
                        // style={{ fontSize: '20px' }}
                        onClick={() => {
                          history.push(`/patient/edit/${patient.id}`)
                        }}
                      />
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
                history.push('/patient/add')
              }}
            ></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonModal
        id="detail-modal"
        isOpen={addPatientModal}
        showBackdrop={true}
        onDidDismiss={() => setAddPatientModal(false)}
        backdropDismiss={true}
      >
        <PatientDetailPage id={`${getValues('selectedPatientId')}`} />
      </IonModal>
    </IonPage>
  )
}
export default PatientPage
