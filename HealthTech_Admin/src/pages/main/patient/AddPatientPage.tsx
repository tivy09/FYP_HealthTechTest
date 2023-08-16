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
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import { patientAPI } from '../../../api/patientApi'
import { useRef, useState } from 'react'
import BackHeader from '../../../components/BackHeader'
import { PatientData } from '../../../utils/types/types'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import './PatientPage.css'
import CustomFileInput from '../../../components/CustomFileInput'
import { cloudUploadOutline } from 'ionicons/icons'
import { storeImageApi } from '../../../api/storeImageApi'

const AddPatientPage = () => {
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
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitSuccessful },
    reset,
    control,
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
    console.log(payload)
    const { data: responseData } = await patientAPI.addNewPatient(payload)
    if (responseData.status === 1502) {
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
          <IonTitle class="ion-text-center">Add New Patient</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid fixed>
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

                {/* mine */}
                <CustomFileInput
                  onClick={onImageUploaderClicked}
                  className="ion-justify-content-center ion-align-items-center ion-flex-col"
                >
                  <>
                    {previewImg ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          content: 'center',
                        }}
                      >
                        <img
                          style={{
                            // maxWidth: '300px',
                            objectFit: 'cover',
                            // maxHeight: '300px',
                            width: '100%',
                          }}
                          src={previewImg}
                        />
                      </div>
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
                    {...register('phone_number', {
                      required: true,
                    })}
                  />
                  {errors.phone_number && (
                    <IonText color="danger">Phone Number is required!</IonText>
                  )}
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Marital Status</IonLabel>
                  <IonToggle
                    checked={maritalStatus}
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
                    value={genderOptionValue}
                    onIonChange={handleGenderValue}
                  >
                    <IonSelectOption
                      defaultValue={genderOptionValue}
                      defaultChecked={true}
                      value="male"
                    >
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
                  <IonLabel position="stacked">Emergency Contact Name</IonLabel>
                  <IonInput
                    type="text"
                    {...register('emergency_contact_name', { required: true })}
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
      </IonContent>
    </IonPage>
  )
}
export default AddPatientPage
