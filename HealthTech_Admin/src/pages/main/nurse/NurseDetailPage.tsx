import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { DoctorData, LoadingState } from '../../../utils/types/types'
import { useForm } from 'react-hook-form'
import { RouteComponentProps, useHistory } from 'react-router'
import { cloudUploadOutline } from 'ionicons/icons'
import { departmentAPI } from '../../../api/departmentApi'
import { nurseAPI } from '../../../api/nurseApi'

interface Props
  extends RouteComponentProps<{
    id: string
  }> {}
const NurseDetailPage: React.FC<Props> = ({ match }) => {
  //history - go to other page
  const history = useHistory()

  //loading department data state
  const [isLoadingData, setIsLoadingData] = useState<LoadingState>('idle')

  //set default department data state
  const [defaultDepartment, setDefaultDepartment] = useState<any>()

  //set default department name state
  const [departmentName, setDepartmentName] = useState<any>()

  //patient data hook form
  const { reset, setValue, getValues } = useForm<DoctorData>({
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
      home_phone_number: '',
      occupation: '',
      department_id: 1,
      avatar_id: 1,
    },
  })

  //get all patient method
  const getDoctorDetail = async () => {
    setIsLoadingData('loading')
    const { data } = await nurseAPI.getNurseDetail(match.params.id)
    const nurse = data.response.nurses
    if (data.status === 1403) {
      setValue('ic_number', nurse.ic_number)
      setValue('first_name', nurse.first_name)
      setValue('last_name', nurse.last_name)
      setValue('email', nurse.users.email)
      setValue('marital_status', nurse.marital_status) //0 - single, 1 - married
      setValue('address', nurse.address)
      setValue('gender', nurse.gender) //0 - male, 1 - female
      setValue('emergency_contact_name', nurse.emergency_contact_name)
      setValue(
        'emergency_contact_phone_number',
        nurse.emergency_contact_phone_number,
      )
      setValue('phone_number', nurse.users.phone_number)
      setValue('home_phone_number', nurse.home_phone_number)
      setValue('occupation', nurse.occupation)
      setValue('department_id', nurse.departments.id)
      setValue('avatar_id', nurse.avatar_id)
      setPreviewImg(nurse.avatar_url)
      setIsLoadingData('success')
      setDefaultDepartment(nurse.departments.id)
    }
  }

  //get all patient method
  const getAllDepartment = async () => {
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
      if (extractedData)
        extractedData.map((department) => {
          if (department.id === getValues('department_id')) {
            setDepartmentName(department.name)
          }
        })
      setIsLoadingData('success')
    }
  }

  //call method when enter the page
  useEffect(() => {
    setIsLoadingData('loading')
    reset()
    getDoctorDetail()
    getAllDepartment()
    return
  }, [])

  //image preview
  const [previewImg, setPreviewImg] = useState<any>()

  return (
    <IonPage>
      <IonHeader class="center">
        <IonToolbar>
          <IonTitle class="ion-text-center">Doctor Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid class="ion-padding">
          <form>
            {isLoadingData === 'loading' && (
              <IonRow>
                <IonCol class="ion-text-center">
                  <IonSpinner />
                </IonCol>
              </IonRow>
            )}
            {isLoadingData === 'success' && (
              <>
                <IonRow>
                  <IonCol>
                    {previewImg ? (
                      <img
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          content: 'center',
                        }}
                        src={previewImg}
                      />
                    ) : (
                      <div
                        style={{
                          paddingTop: '15%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          content: 'center',
                        }}
                      >
                        <IonIcon
                          color="medium"
                          icon={cloudUploadOutline}
                          size="large"
                        />
                      </div>
                    )}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">IC no.</IonLabel>
                      <IonText>{getValues('ic_number')}</IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">First Name</IonLabel>
                      <IonText>{getValues('first_name')}</IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Last Name</IonLabel>
                      <IonText>{getValues('last_name')}</IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Email</IonLabel>
                      <IonText>{getValues('email')}</IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Phone Number</IonLabel>
                      <IonText>{getValues('phone_number')}</IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Occupation</IonLabel>
                      <IonText>{getValues('occupation')}</IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Address</IonLabel>
                      <IonText>{getValues('address')}</IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">
                        Emergency Contact Name
                      </IonLabel>
                      <IonText>{getValues('emergency_contact_name')}</IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">
                        Emergency Contact Phone Number
                      </IonLabel>
                      <IonText>
                        {getValues('emergency_contact_phone_number')}
                      </IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Home Phone Number</IonLabel>
                      <IonText>{getValues('home_phone_number')}</IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel>Marital Status</IonLabel>
                      <IonText>
                        {getValues('marital_status') === 0
                          ? 'single'
                          : 'married '}
                      </IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel>Gender</IonLabel>
                      <IonText>
                        {getValues('gender') === 0 ? 'male' : 'female'}
                      </IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel>Department</IonLabel>
                      <IonText>{departmentName}</IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel>Is active?</IonLabel>
                      <IonToggle
                        mode="md"
                        checked={getValues('status') === 1}
                      ></IonToggle>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonButton
                      shape="round"
                      expand="full"
                      size="large"
                      onClick={() => {
                        history.goBack()
                      }}
                    >
                      Close
                    </IonButton>
                  </IonCol>
                </IonRow>
              </>
            )}
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default NurseDetailPage
