import {
  IonAlert,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonImg,
  IonModal,
  IonRow,
  IonSpinner,
  IonToggle,
  useIonToast,
} from '@ionic/react'
import { useHistory } from 'react-router'
import { add } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { LoadingState, NoticeBoardData } from '../../../utils/types/types'
import { noticeBoardAPI } from '../../../api/noticeBoardApi'
import AddNotice from './AddNotice'
import './style.css' // Import the custom SCSS file
import { useForm } from 'react-hook-form'

const NoticeList = () => {
  //loadingNotice state
  const [loadingNotice, setLoadingNotice] = useState<LoadingState>('idle')

  //show swipe button
  const [showButton, setShowButton] = useState(false)

  //handle swipe card method
  const handleSwipe = (e: any) => {
    if (e.detail.velocityX > 0.2) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }

  // add notice modal
  const [addNoticeModal, setAddNoticeModal] = useState<boolean>(false)

  //notice list
  const [noticeList, setNoticeList] = useState<NoticeBoardData[]>()

  //history - go to other page
  const history = useHistory()

  //get notice board list
  const getNoticeList = async () => {
    const { data } = await noticeBoardAPI.getAllNotice()
    const response = data.response.noticeBoards
    if (data.status === 1001) {
      setLoadingNotice('success')
      setNoticeList(response)
    }
  }

  //useEffect
  useEffect(() => {
    setLoadingNotice('loading')
    getNoticeList()
    return () => {}
  }, [])

  //status state
  const [noticeStatus, setNoticeStatus] = useState<boolean>(false)

  //notice data hook form
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<any>({
    defaultValues: {
      status: 1,
    },
  })

  //change status ionalert
  const [showAlert, setShowAlert] = useState(false)

  //notice id
  const [noticeId, setNoticeId] = useState<number>(0)

  const handleShowAlert = () => {
    setShowAlert(true)
  }

  const handleAlertDismiss = () => {
    setShowAlert(false)
  }

  //set toast msg
  const [presentToast] = useIonToast()

  //handle state
  const handleStatusToggle = async (id: number) => {
    const { data } = await noticeBoardAPI.updateNoticeStatus(id)
    if (data.status === 1003) {
      presentToast({
        message: data.message,
        duration: 2000,
        position: 'bottom',
        color: 'success',
      })
      setShowAlert(false)
      getNoticeList()
    }
  }

  return (
    <>
      {loadingNotice === 'loading' && (
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonSpinner name="crescent" />
            </IonCol>
          </IonRow>
        </IonGrid>
      )}
      {loadingNotice === 'success' &&
        noticeList &&
        noticeList.length > 0 &&
        noticeList.map((notice: NoticeBoardData) => (
          <IonCard key={notice.id}>
            {notice.image_id === null ? (
              <IonImg
                alt={notice.title}
                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR880drDA1inLyW7DSfu48Q-ju9eW7vTb5GiA&usqp=CAU`}
              />
            ) : (
              <IonImg alt={notice.title} src={notice.image_url} />
            )}
            <IonCardHeader>
              <IonCardTitle>{notice.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonRow>
                <IonCol size="10">{notice.description}</IonCol>
                <IonCol size="2">
                  <IonToggle
                    checked={notice.status === 1}
                    onClick={() => {
                      handleShowAlert()
                      setNoticeId(notice.id)
                    }}

                    // onIonChange={setStatusData(event)}
                  ></IonToggle>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
        ))}
      <IonFab slot="fixed" horizontal="end" vertical="bottom">
        <IonFabButton>
          <IonIcon
            icon={add}
            onClick={() => {
              setAddNoticeModal(true)
            }}
          ></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonModal
        id="example-modal"
        isOpen={addNoticeModal}
        backdropDismiss={false}
      >
        <IonContent>
          <AddNotice />
        </IonContent>
      </IonModal>

      {/* change status ionalert  */}
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={handleAlertDismiss}
        header="Update Status"
        message="Are you sure you want to update notice status?"
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled')
            },
          },
          {
            text: 'Yes',
            handler: () => {
              if (noticeId) handleStatusToggle(noticeId)
            },
          },
        ]}
      />
    </>
  )
}

export default NoticeList
