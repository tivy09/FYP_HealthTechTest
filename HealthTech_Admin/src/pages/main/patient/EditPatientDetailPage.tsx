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
  useIonViewDidEnter,
} from '@ionic/react'
import { patientAPI } from '../../../api/patientApi'
import { useEffect, useRef, useState } from 'react'
import BackHeader from '../../../components/BackHeader'
import { LoadingState, PatientData } from '../../../utils/types/types'
import { useForm } from 'react-hook-form'
import { RouteComponentProps, useHistory } from 'react-router'
import { cloudUploadOutline } from 'ionicons/icons'
import CustomFileInput from '../../../components/CustomFileInput'
import { storeImageApi } from '../../../api/storeImageApi'

interface Props
  extends RouteComponentProps<{
    id: string
  }> {}

const EditPatientDetailPage: React.FC<Props> = ({ match }) => {
  //loading state
  const [isLoadingData, setIsLoadingData] = useState<LoadingState>('idle')

  //history - go to other page
  const history = useHistory()

  //set toast msg
  const [presentToast] = useIonToast()

  //default value for gender & marital status
  const [genderOptionValue, setGenderOptionValue] = useState<string>('male')
  const [maritalStatus, setMaritalStatus] = useState<boolean>(false) //if false, not married

  //patient data hook form
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
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

  const getPatientDetail = async () => {
    const { data: responseData } = await patientAPI.getPatientDetail(
      match.params.id,
    )
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
        Math.floor(data.emergency_contact_phone_number),
      )
      setValue('phone_number', Math.floor(data.phone_number))
      setIsLoadingData('success')
      setPreviewImg(data.avatar_url)
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
  }, [match.params.id])

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
    setMaritalStatus(event.detail.checked) //0 - single, 1 - married
    if (event.detail.checked === false) {
      setValue('marital_status', 0)
    } else {
      setValue('marital_status', 1)
    }
  }

  //image preview
  const [previewImg, setPreviewImg] = useState<any>()

  //image ref
  const imageRef = useRef<HTMLInputElement>(null)

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
      const avatarId = data.response.document_id
      if (data.status === 1999) {
        setValue('avatar_id', avatarId)
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

  //submit new patient data
  const onSubmit = async (data: PatientData) => {
    const payload = {
      ic_number: data.ic_number,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      marital_status: getValues('marital_status'),
      address: data.address,
      gender: getValues('gender'),
      emergency_contact_name: data.emergency_contact_name,
      emergency_contact_phone_number: data.emergency_contact_phone_number,
      phone_number: data.phone_number,
      avatar_id: getValues('avatar_id'),
    }
    const { data: responseData } = await patientAPI.editPatientDetail(
      match.params.id,
      payload,
    )
    if (responseData.status === 1504) {
      presentToast({
        message: responseData.message,
        duration: 500,
        position: 'bottom',
        color: 'success',
      })
      reset()
      history.push('/patient')
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
          <IonTitle class="ion-text-center">Edit Patient Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="center">
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
                    <>
                      {previewImg ? (
                        // <div
                        //   style={{
                        //     display: 'flex',
                        //     alignItems: 'center',
                        //     justifyContent: 'center',
                        //     content: 'center',
                        //   }}
                        // >
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
                        // </div>
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
                    </>
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
                    {errors.ic_number && (
                      <IonText color="danger">IC Number is required!</IonText>
                    )}
                  </IonItem>
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
                    {errors.first_name && (
                      <IonText color="danger">First Name is required!</IonText>
                    )}
                  </IonItem>
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
                    {errors.last_name && (
                      <IonText color="danger">Last Name is required!</IonText>
                    )}
                  </IonItem>
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
                    {errors.email && (
                      <IonText color="danger">Email is required!</IonText>
                    )}
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="stacked">Phone Number</IonLabel>
                    <IonInput
                      type="number"
                      value={getValues('phone_number')}
                      {...register('phone_number', {
                        required: true,
                      })}
                    />
                    {errors.phone_number && (
                      <IonText color="danger">
                        Phone Number is required!
                      </IonText>
                    )}
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel>Marital Status</IonLabel>
                    <IonToggle
                      checked={getValues('marital_status') === 1 ? true : false}
                      onIonChange={handleMaritalStatus}
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
                    <IonLabel position="stacked">Adress</IonLabel>
                    <IonInput
                      type="text"
                      {...register('address', { required: true })}
                    />
                    {errors.address && (
                      <IonText color="danger">Address is required!</IonText>
                    )}
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="stacked">
                      Emergency Contact Name
                    </IonLabel>
                    <IonInput
                      type="text"
                      {...register('emergency_contact_name', {
                        required: true,
                      })}
                    />
                    {errors.emergency_contact_name && (
                      <IonText color="danger">
                        Emergency Contact Name is required!
                      </IonText>
                    )}
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
                      type="number"
                      value={getValues('emergency_contact_phone_number')}
                      {...register('emergency_contact_phone_number', {
                        required: true,
                      })}
                    />
                    {errors.emergency_contact_phone_number && (
                      <IonText color="danger">
                        Emergency Contact Phone Number is required!
                      </IonText>
                    )}
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonButton
                    shape="round"
                    expand="full"
                    type="submit"
                    size="large"
                  >
                    Submit
                  </IonButton>
                </IonCol>
              </IonRow>
            </form>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  )
}
export default EditPatientDetailPage
