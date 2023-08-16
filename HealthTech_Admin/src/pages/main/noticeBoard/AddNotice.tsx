import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import { useHistory } from 'react-router'
import {
  add,
  chevronBackOutline,
  cloudUploadOutline,
  person,
} from 'ionicons/icons'
import { useRef, useState } from 'react'
import { LoadingState, NoticeBoardData } from '../../../utils/types/types'
import { set, useForm } from 'react-hook-form'
import { storeImageApi } from '../../../api/storeImageApi'
import CustomFileInput from '../../../components/CustomFileInput'
import { noticeBoardAPI } from '../../../api/noticeBoardApi'

const AddNotice = () => {
  //notice list
  const [isSubmitLoading, setIsSubmitLoading] = useState<LoadingState>(
    'success',
  )

  //history - go to other page
  const history = useHistory()

  //loading state
  const [isActive, setIsActive] = useState<boolean>(false) //false - inactive, true - active

  //notice data hook form
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<NoticeBoardData>({
    defaultValues: {
      id: 0,
      title: 'NoticeBoard001',
      description: 'Notice Board DescriptionABDCDEDEDONOIH',
      status: 1,
      image: '',
      image_id: 0,
      type: '1',
    },
  })

  //handle department status
  const handleNoticeStatus = (event: CustomEvent) => {
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

  // loading image state
  const [imageIdReturned, getImageIdReturned] = useState<LoadingState>(
    'success',
  )

  //set toast msg
  const [presentToast] = useIonToast()

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
  }

  //submit notice
  const onSubmit = async () => {
    const payload = {
      title: getValues('title'),
      description: getValues('description'),
      status: getValues('status').toString(),
      image_id: getValues('image_id'),
      type: '1',
    }
    const { data } = await noticeBoardAPI.submitNotice(payload)
    if (data.status === 1002) {
      setIsSubmitLoading('success')
      window.location.reload() //reload to close modal
      presentToast({
        message: data.message,
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
    } else {
      presentToast({
        message: data.message,
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
    }
  }
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Notice</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonGrid>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* notice image */}
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
          {/* notice title */}
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked" color={'primary'}>
                  Title
                </IonLabel>
                <IonInput
                  type="text"
                  {...register('title')}
                  spellCheck={true}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          {/* notice description */}
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked" color={'primary'}>
                  Description
                </IonLabel>
                <IonInput
                  type="text"
                  {...register('description')}
                  spellCheck={true}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          {/* status */}
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="fixed" color={'primary'}>
                  Is Active
                </IonLabel>
                <IonToggle
                  slot="end"
                  onIonChange={handleNoticeStatus}
                  checked={getValues('status') === 1 ? true : false}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          {/*submit button  */}
          <IonRow>
            <IonCol size="12">
              {/* check image id returned */} {/* check submit api success */}
              {imageIdReturned === 'success' ||
              isSubmitLoading === 'success' ? (
                <IonButton
                  shape="round"
                  expand="full"
                  type="submit"
                  size="large"
                  onClick={() => onSubmit()}
                >
                  Submit
                </IonButton>
              ) : (
                <IonButton
                  shape="round"
                  expand="full"
                  size="large"
                  disabled={true}
                >
                  <IonSpinner />
                </IonButton>
              )}
              <IonButton
                expand="block"
                fill="outline"
                shape="round"
                size="large"
                onClick={() => window.location.reload()}
              >
                Close
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonGrid>
    </>
  )
}

export default AddNotice
