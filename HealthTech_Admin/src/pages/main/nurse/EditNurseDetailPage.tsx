import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import { useEffect, useRef, useState } from 'react'
import BackHeader from '../../../components/BackHeader'
import { DoctorData, LoadingState } from '../../../utils/types/types'
import { useForm } from 'react-hook-form'
import { RouteComponentProps, useHistory } from 'react-router'
import CustomFileInput from '../../../components/CustomFileInput'
import { cloudUploadOutline } from 'ionicons/icons'
import { storeImageApi } from '../../../api/storeImageApi'
import { departmentAPI } from '../../../api/departmentApi'
import { nurseAPI } from '../../../api/nurseApi'

interface Props
  extends RouteComponentProps<{
    id: string
  }> {}
const EditNurseDetailPage: React.FC<Props> = ({ match }) => {
  //history - go to other page
  const history = useHistory()

  //set toast msg
  const [presentToast] = useIonToast()

  //default value for gender & marital status
  const [genderOptionValue, setGenderOptionValue] = useState<string>('male')
  const [maritalStatus, setMaritalStatus] = useState<string>('single') //if false, not married

  //set department data array
  const [departmentData, setDepartmentData] = useState<
    { id: number; name: string; image?: string }[]
  >([])

  //loading department data state
  const [isLoadingData, setIsLoadingData] = useState<LoadingState>('idle')

  //set default department data state
  const [defaultDepartment, setDefaultDepartment] = useState<string>('')

  //patient data hook form
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitSuccessful },
    reset,
    control,
    getValues,
  } = useForm<DoctorData>({
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
      department_id: 0,
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
      setValue('status', nurse.status)
      compareDepartmentId()
    }
  }

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
          setDefaultDepartment(extractedData[0].name)
        }
        const id: {
          id: number
        }[] = departments.map((department: any) => ({
          id: department.id,
        }))
      }
    } catch {
      console.log('error')
    }
  }

  //call method when enter the page
  useEffect(() => {
    getDoctorDetail()
    getAllDepartment()
  }, [])

  //get gender value
  const handleGenderValue = (event: CustomEvent) => {
    setGenderOptionValue(event.detail.value) //0 - male, 1 - female
    if (event.detail.value === 'male') {
      setValue('gender', 0)
    } else {
      setValue('gender', 1)
    }
  }

  //get marital status
  const handleMaritalStatus = (event: CustomEvent) => {
    setMaritalStatus(event.detail.value) //0 - single, 1 - married
    if (event.detail.value === 'single') {
      setValue('marital_status', 0)
    } else {
      setValue('marital_status', 1)
    }
  }

  //get department id
  const handleDepartmentValue = (event: CustomEvent) => {
    departmentData.map((department) => {
      if (department.name === event.detail.value) {
        setValue('department_id', department.id)
      }
    })
  }

  //compare department id
  const compareDepartmentId = () => {
    departmentData.map((department) => {
      if (getValues('department_id') === department.id)
        setDefaultDepartment(department.name)
    })
  }

  //image preview
  const [previewImg, setPreviewImg] = useState<any>()

  //image ref
  const imageRef = useRef<HTMLInputElement>(null)

  // loading image state
  const [imageIdReturned, getImageIdReturned] = useState<LoadingState>('idle')

  //upload image method
  const onImageUploaderClicked = () => {
    // takePhoto();
    if (imageRef.current) {
      imageRef.current.click()
    }
  }

  //uplaod image api
  const uploadImage = async (image: any) => {
    try {
      const { data } = await storeImageApi.storeImage(image)
      getImageIdReturned('loading')
      const avatarId = data.response.document_id
      if (data.status === 1999) {
        setValue('avatar_id', avatarId)
        getImageIdReturned('success')
      } else {
        presentToast({
          message: data.message,
          duration: 1500,
          position: 'bottom',
          color: 'danger',
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  //handle doctor status toggle
  const handleToggle = (e: CustomEvent) => {
    if (e.detail.checked) {
      setValue('status', 1)
    } else {
      setValue('status', 0)
    }
  }

  //submit new patient data
  const onSubmit = async (data: any) => {
    const payload = {
      ic_number: getValues('ic_number'),
      first_name: getValues('first_name'),
      last_name: getValues('last_name'),
      email: getValues('email'),
      marital_status: getValues('marital_status'),
      address: getValues('address'),
      gender: getValues('gender'),
      emergency_contact_name: getValues('emergency_contact_name'),
      emergency_contact_phone_number: getValues('emergency_contact_name'),
      phone_number: getValues('phone_number'),
      avatar_id: getValues('avatar_id'),
      home_phone_number: getValues('home_phone_number'),
      occupation: getValues('occupation'),
      department_id: getValues('department_id'),
    }
    const { data: responseData } = await nurseAPI.updateNurseDetail(
      match.params.id,
      payload,
    )
    if (responseData.status === 1404) {
      presentToast({
        message: responseData.message,
        duration: 500,
        position: 'bottom',
        color: 'success',
      })
      history.goBack()
      // reset()
    } else {
      presentToast({
        message: responseData.message,
        duration: 1500,
        position: 'bottom',
        color: 'danger',
      })
    }
  }

  return (
    <IonPage>
      <IonHeader class="center">
        <IonToolbar>
          <BackHeader />
          <IonTitle class="ion-text-center">Edit Nurse Ddetail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid class="ion-padding">
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonRow>
              <IonCol>
                <input
                  hidden
                  type="file"
                  {...register('avatar_id', { required: true })}
                  ref={imageRef}
                  onChange={(e) => {
                    if (e.target.files) {
                      const objectUrl: any = URL.createObjectURL(
                        e.target.files[0],
                      )
                      uploadImage(e.target.files[0])
                      setPreviewImg(objectUrl)
                    }
                  }}
                  name="image"
                />

                <CustomFileInput
                  onClick={onImageUploaderClicked}
                  className="ion-justify-content-center ion-align-items-center ion-flex-col"
                >
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
                </CustomFileInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">IC no.</IonLabel>
                  <IonInput
                    type="number"
                    {...register('ic_number', { required: true })}
                  />
                </IonItem>
                {errors.ic_number && (
                  <IonText color="danger">IC Number is required!</IonText>
                )}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">First Name</IonLabel>
                  <IonInput
                    type="text"
                    {...register('first_name', { required: true })}
                  />
                </IonItem>

                {errors.first_name && (
                  <IonText color="danger">First Name is required!</IonText>
                )}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Last Name</IonLabel>
                  <IonInput
                    type="text"
                    {...register('last_name', { required: true })}
                  />
                </IonItem>

                {errors.last_name && (
                  <IonText color="danger">Last Name is required!</IonText>
                )}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    type="email"
                    {...register('email', { required: true })}
                  />
                </IonItem>

                {errors.email && (
                  <IonText color="danger">Email is required!</IonText>
                )}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Phone Number</IonLabel>
                  <IonInput
                    type="number"
                    {...register('phone_number', {
                      required: true,
                    })}
                  />
                </IonItem>
                {errors.phone_number && (
                  <IonText color="danger">Phone Number is required!</IonText>
                )}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Occupation</IonLabel>
                  <IonInput
                    type="text"
                    {...register('occupation', { required: true })}
                  />
                </IonItem>
                {errors.address && (
                  <IonText color="danger">Occupation is required!</IonText>
                )}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Adress</IonLabel>
                  <IonInput
                    type="text"
                    {...register('address', { required: true })}
                  />
                </IonItem>
                {errors.address && (
                  <IonText color="danger">Address is required!</IonText>
                )}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Emergency Contact Name</IonLabel>
                  <IonInput
                    type="text"
                    {...register('emergency_contact_name', { required: true })}
                  />
                </IonItem>
                {errors.emergency_contact_name && (
                  <IonText color="danger">
                    Emergency Contact Name is required!
                  </IonText>
                )}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">
                    Emergency Contact Phone Number
                  </IonLabel>
                  <IonInput
                    type="number"
                    {...register('emergency_contact_phone_number', {
                      required: true,
                    })}
                  />
                </IonItem>
                {errors.emergency_contact_phone_number && (
                  <IonText color="danger">
                    Emergency Contact Phone Number is required!
                  </IonText>
                )}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Home Phone Number</IonLabel>
                  <IonInput
                    type="number"
                    {...register('home_phone_number', {
                      required: true,
                    })}
                  />
                </IonItem>
                {errors.home_phone_number && (
                  <IonText color="danger">
                    Emergency Contact Phone Number is required!
                  </IonText>
                )}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Marital Status</IonLabel>
                  <IonSelect
                    value={
                      getValues('marital_status') === 0 ? 'single' : 'married'
                    }
                    onIonChange={handleMaritalStatus}
                  >
                    <IonSelectOption value="single">Single</IonSelectOption>
                    <IonSelectOption value="married">Married</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Gender</IonLabel>
                  <IonSelect
                    value={getValues('gender') === 0 ? 'male' : 'female'}
                    onIonChange={handleGenderValue}
                  >
                    <IonSelectOption value="male">Male</IonSelectOption>
                    <IonSelectOption value="female">Female</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Department</IonLabel>
                  <IonSelect
                    value={defaultDepartment}
                    onIonChange={handleDepartmentValue}
                  >
                    {isLoadingData === 'success' ? (
                      departmentData.map((department, id) => (
                        <IonSelectOption
                          key={department.id}
                          value={department.name}
                        >
                          {department.name}
                        </IonSelectOption>
                      ))
                    ) : (
                      <IonSpinner />
                    )}
                  </IonSelect>
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
                    onIonChange={(e) => {
                      handleToggle(e)
                    }}
                  ></IonToggle>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                {imageIdReturned === 'loading' ? (
                  <IonButton
                    shape="round"
                    expand="full"
                    type="submit"
                    size="large"
                    disabled={true}
                  >
                    <IonSpinner />
                  </IonButton>
                ) : (
                  <IonButton
                    // onClick={() => onSubmit()}
                    shape="round"
                    expand="full"
                    size="large"
                  >
                    Submit
                  </IonButton>
                )}
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default EditNurseDetailPage
