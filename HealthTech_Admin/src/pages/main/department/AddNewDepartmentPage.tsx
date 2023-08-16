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
import {
  DepartmentData,
  LoadingState,
  PatientData,
} from '../../../utils/types/types'
import { set, useForm } from 'react-hook-form'
import { departmentAPI } from '../../../api/departmentApi'
import { cloudUploadOutline } from 'ionicons/icons'
import CustomFileInput from '../../../components/CustomFileInput'
import { storeImageApi } from '../../../api/storeImageApi'
import { RouteComponentProps, useHistory } from 'react-router'
import BackHeader from '../../../components/BackHeader'
import { error } from 'console'

const AddNewDepartmentPage = () => {
  // change page
  const history = useHistory()

  //loading state
  const [isLoadingData, setIsLoadingData] = useState<LoadingState>('idle')

  // loading image state
  const [imageIdReturned, getImageIdReturned] = useState<LoadingState>('idle')

  //loading state
  const [isActive, setIsActive] = useState<boolean>(false) //false - inactive, true - active

  //set toast msg
  const [presentToast] = useIonToast()

  //patient data hook form
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors, isSubmitted, isSubmitSuccessful },
    reset,
    getValues,
  } = useForm<DepartmentData>({
    defaultValues: {
      id: 0,
      name: '',
      status: 0,
      image: '',
      image_id: 0,
    },
  })

  //handle department status
  const handleDepartmentStatus = (event: CustomEvent) => {
    setIsActive(event.detail.checked) //0 - inacitve, 1 - active
    if (event.detail.checked === false) {
      setValue('status', 0)
    } else {
      setValue('status', 1)
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
    getImageIdReturned('loading')
    try {
      const { data } = await storeImageApi.storeImage(image)
      const avatarId = data.response.document_id
      if (data.status === 1999) {
        setValue('image_id', avatarId)
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

  //submit edit data
  const onSubmit = async () => {
    const payload = {
      name: getValues('name'),
      status: getValues('status'),
      image_id: getValues('image_id'),
    }
    const { data } = await departmentAPI.addNewDepartment(payload)
    if (data.status === 1202) {
      presentToast({
        message: data.message,
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
      history.goBack()
    } else {
      presentToast({
        message: data.message,
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
          <IonTitle class="ion-text-center">New Department</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonGrid class="ion-padding">
            {/* image file input */}
            <IonRow>
              <IonCol>
                <input
                  hidden
                  type="file"
                  {...register('image', { required: true })}
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
                          objectFit: 'cover',
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
                </CustomFileInput>
              </IonCol>
            </IonRow>
            {/* name */}
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked" color={'primary'}>
                    Department Name
                  </IonLabel>
                  <IonInput
                    type="text"
                    {...register('name', { required: true })}
                    // value={getValues('name')}
                  />
                </IonItem>
                {errors.name && <IonText>Name is required</IonText>}
              </IonCol>
            </IonRow>
            {/* is active */}
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="fixed" color={'primary'}>
                    Is Active
                  </IonLabel>
                  <IonToggle
                    slot="end"
                    onIonChange={handleDepartmentStatus}
                    checked={getValues('status') === 1 ? true : false}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            {/* is active end */}
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
                    onClick={() => onSubmit()}
                    shape="round"
                    expand="full"
                    size="large"
                  >
                    Submit
                  </IonButton>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </IonContent>
    </IonPage>
  )
}
export default AddNewDepartmentPage
