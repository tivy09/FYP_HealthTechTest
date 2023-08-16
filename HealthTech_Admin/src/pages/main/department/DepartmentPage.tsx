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
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from '@ionic/react'
import { useEffect, useRef, useState } from 'react'
import { add, createOutline, person } from 'ionicons/icons'
import { LoadingState } from '../../../utils/types/types'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { home } from 'ionicons/icons'
import { departmentAPI } from '../../../api/departmentApi'
import DepartmentDetailPage from './DepartmentDetailPage'
import './DepartmentPage.css'

const DepartmentPage = () => {
  const {
    setValue,
    formState: { errors, isSubmitted, isSubmitSuccessful },
    getValues,
  } = useForm<any>({
    defaultValues: {
      selectedDepartmentId: 0,
      selectedPatientName: '',
      selectedPatientImage: '',
    },
  })
  // view department detail modal
  const [departmentDetailModal, setDepartmentDetailModal] = useState(false)

  //history - go to other page
  const history = useHistory()

  //loading state
  const [isLoadingData, setIsLoadingData] = useState<LoadingState>('idle')

  //set patient data array
  const [departmentData, setDepartmentData] = useState<
    { id: number; name: string; image?: string }[]
  >([])

  //image ref
  const imageRef = useRef<HTMLInputElement>(null)

  //run mthod when enter page
  useIonViewWillEnter(() => {
    getAllDepartment()
  }, [])

  //get all patient method
  const getAllDepartment = async () => {
    try {
      setIsLoadingData('loading')
      const { data } = await departmentAPI.getAllDepartment()
      const departments = data.response.departments
      if (data.status === 1201) {
        const extractedData: {
          id: number
          name: string
          image: string
        }[] = departments.map((department: any) => ({
          id: department.id,
          name: department.name,
          image: department.images_preview,
        }))
        if (extractedData) {
          setIsLoadingData('success')
          setDepartmentData([...extractedData])
        }
      }
    } catch {
      console.log('error')
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
          <IonTitle class="ion-text-center">Department</IonTitle>
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
            departmentData.map((department) => (
              <IonCard key={department.id}>
                <IonCardContent>
                  <IonList>
                    <IonItem lines="none">
                      <IonThumbnail slot="start">
                        {department.image === null ? (
                          <img
                            alt={department.name}
                            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR880drDA1inLyW7DSfu48Q-ju9eW7vTb5GiA&usqp=CAU`}
                          />
                        ) : (
                          <img alt={department.name} src={department.image} />
                        )}
                      </IonThumbnail>

                      <IonLabel
                        onClick={() => {
                          setValue('selectedDepartmentId', department.id)
                          if (getValues('selectedDepartmentId'))
                            setDepartmentDetailModal(true)
                        }}
                      >
                        {''}
                        {department.name}
                      </IonLabel>
                      <IonIcon
                        src={createOutline}
                        size="large"
                        onClick={() =>
                          history.push(`/department/edit/${department.id}`)
                        }
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
                history.push('/department/add')
              }}
            ></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>

      {/* detail modal */}
      <IonModal
        id="detail-modal"
        isOpen={departmentDetailModal}
        showBackdrop={true}
        onDidDismiss={() => setDepartmentDetailModal(false)}
        backdropDismiss={true}
      >
        <DepartmentDetailPage
          id={getValues('selectedDepartmentId')}
          mode={'view'}
        />
      </IonModal>
    </IonPage>
  )
}
export default DepartmentPage
