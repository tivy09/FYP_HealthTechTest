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

interface Props
  extends RouteComponentProps<{
    id: string
  }> {}

const EditDepartmentDetailPage: React.FC<Props> = ({ match }) => {
  let departmentId = match.params.id

  //change page
  const history = useHistory()
  //loading state
  const [isLoadingData, setIsLoadingData] = useState<LoadingState>('idle')

  // loading image state
  const [imageIdReturned, setImageIdReturned] = useState<LoadingState>('idle')

  // submit data state
  const [isSubmitData, setIsSubmitData] = useState<LoadingState>('idle')

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

  //get all patient method
  const getDepartmentDetail = async () => {
    const { data: responseData } = await departmentAPI.getDepartmentDetail(
      departmentId,
    )
    if (responseData.status === 1203) {
      const data = responseData.response.departments
      setValue('id', data.id)
      setValue('name', data.name)
      setValue('status', data.status)
      setValue('image', data.images_url)
      setPreviewImg(data.images_url)
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
    setImageIdReturned('loading')
    try {
      const { data } = await storeImageApi.storeImage(image)
      const avatarId = data.response.document_id
      if (data.status === 1999) {
        setValue('image_id', avatarId)
        // setValue('image', avatarId)
        setImageIdReturned('success')
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

  //run when load page
  useEffect(() => {
    getDepartmentDetail()
  }, [])

  //submit edit data
  const onSubmit = async () => {
    setIsSubmitData('loading')
    const imageIdDB = getValues('image_id') //number
    if (imageIdDB) {
      setValue('image', imageIdDB.toString())
    } else {
      setValue('image_id', 1)
    }
    const payload = {
      name: getValues('name'),
      status: getValues('status'),
      image_id: getValues('image_id'),
    }
    const { data: responseData } = await departmentAPI.updateDepartmentDetail(
      match.params.id,
      payload,
    )
    if (responseData.status === 1204) {
      setIsSubmitData('success')
      presentToast({
        message: responseData.message,
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
      history.push('/department')
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
          <IonTitle class="ion-text-center">{getValues('name')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoadingData === 'loading' && (
          <IonGrid>
            <IonRow>
              <IonCol class="ion-text-center">
                <IonSpinner />
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
        {isLoadingData === 'success' && (
          <IonGrid class="ion-padding">
            {/* <form onSubmit={handleSubmit(async (data) => onSubmit(data))}> */}
            <form>
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
                    {getValues('image') ||
                    (getValues('image_id') && previewImg) ? (
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
                          // size="large"
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
                      value={getValues('name')}
                    />
                  </IonItem>
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
                  {imageIdReturned === 'loading' ||
                  isSubmitData === 'success' ? (
                    <IonButton
                      shape="round"
                      expand="full"
                      disabled={true}
                      // type="submit"
                      size="large"
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
            </form>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  )
}
export default EditDepartmentDetailPage
