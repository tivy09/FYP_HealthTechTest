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
import {
  DepartmentData,
  LoadingState,
  PatientData,
} from '../../../utils/types/types'
import { useForm } from 'react-hook-form'
import { departmentAPI } from '../../../api/departmentApi'

const DepartmentDetailPage = (id: any, mode: any) => {
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
  } = useForm<DepartmentData>({
    defaultValues: {
      id: 0,
      name: '',
      status: 0,
      image: '',
    },
  })

  //get all patient method
  const getPatientDetail = async () => {
    const { data: responseData } = await departmentAPI.getDepartmentDetail(
      id.id,
    )
    if (responseData.status === 1203) {
      const data = responseData.response.departments
      console.log(data)
      setValue('id', data.id)
      setValue('name', data.name)
      setValue('status', data.status)
      setValue('image', data.image_preview)
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
          <IonTitle class="ion-text-center">{getValues('name')}</IonTitle>
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
          <form>
            <IonGrid class="ion-padding">
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="stacked" color={'primary'}>
                      Department Name
                    </IonLabel>
                    <IonInput type="text" value={getValues('name')} />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="fixed" color={'primary'}>
                      Is Active
                    </IonLabel>
                    <IonToggle
                      slot="end"
                      // aria-disabled
                      disabled={true}
                      checked={getValues('status') === 1 ? true : false}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </form>
        </>
      )}
    </IonContent>
  )
}
export default DepartmentDetailPage
