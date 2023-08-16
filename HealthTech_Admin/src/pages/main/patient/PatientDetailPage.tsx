import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import { patientAPI } from '../../../api/patientApi'
import { useEffect, useState } from 'react'
import { LoadingState, PatientData } from '../../../utils/types/types'
import { useForm } from 'react-hook-form'

const PatientDetailPage = (id: any) => {
  console.log(id)
  //loading state
  const [isLoadingData, setIsLoadingData] = useState<LoadingState>('idle')

  //set toast msg
  const [presentToast] = useIonToast()

  //patient data hook form
  const {
    setValue,
    formState: { errors, isSubmitted, isSubmitSuccessful },
    reset,
    getValues,
  } = useForm<PatientData>({
    defaultValues: {
      ic_number: '',
      first_name: '',
      last_name: '',
      email: '',
      marital_status: 0, //0 - single, 1 - married
      address: '',
      gender: 0, //0 - male, 1 - female
      emergency_contact_name: '',
      emergency_contact_phone_number: '',
      phone_number: '',
      avatar_id: 1,
    },
  })

  //get all patient method
  const getPatientDetail = async () => {
    const { data: responseData } = await patientAPI.getPatientDetail(id.id)
    if (responseData.status === 1503) {
      const data = responseData.response.patient
      setValue('ic_number', data.ic_number)
      setValue('first_name', data.first_name)
      setValue('last_name', data.last_name)
      setValue('email', data.email)
      setValue('marital_status', data.marital_status) //0 - single, 1 - married
      setValue('gender', data.gender) //0 - male, 1 - female
      setValue('address', data.address)
      setValue('emergency_contact_name', data.emergency_contact_name)
      setValue(
        'emergency_contact_phone_number',
        data.emergency_contact_phone_number,
      )
      setValue('phone_number', data.phone_number)
      setIsLoadingData('success')
    } else {
      presentToast({
        message: responseData.message,
        duration: 1500,
        position: 'bottom',
        color: 'danger',
      })
    }
  }

  //run when load page
  useEffect(() => {
    getPatientDetail()
  }, [])

  return (
    <IonContent>
      <IonHeader class="center">
        <IonToolbar>
          <IonTitle class="ion-text-center">
            {getValues('first_name')} {getValues('last_name')}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      {isLoadingData === 'loading' && (
        <>
          <IonGrid>
            <IonRow>
              <IonCol class="ion-text-center">
                <IonSpinner />
              </IonCol>
            </IonRow>
          </IonGrid>
        </>
      )}
      {isLoadingData === 'success' && (
        <>
          <IonGrid class="ion-padding">
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">IC no.</IonLabel>
                  <IonInput type="number" value={getValues('ic_number')} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">First Name</IonLabel>
                  <IonInput type="text" value={getValues('first_name')} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Last Name</IonLabel>
                  <IonInput type="text" value={getValues('last_name')} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput type="email" value={getValues('email')} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Phone Number</IonLabel>
                  <IonInput value={getValues('phone_number')} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Marital Status</IonLabel>
                  <IonToggle
                    checked={getValues('marital_status') === 1 ? true : false}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Gender</IonLabel>
                  <IonSelect
                    value={getValues('gender') === 0 ? 'male' : 'female'}
                  >
                    <IonSelectOption defaultChecked={true} value="male">
                      Male
                    </IonSelectOption>
                    <IonSelectOption value="female">Female</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Adress</IonLabel>
                  <IonInput type="text" value={getValues('address')} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Emergency Contact Name</IonLabel>
                  <IonInput
                    type="text"
                    value={getValues('emergency_contact_name')}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">
                    Emergency Contact Phone Number
                  </IonLabel>
                  <IonInput
                    value={getValues('emergency_contact_phone_number')}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
        </>
      )}
    </IonContent>
  )
}
export default PatientDetailPage
