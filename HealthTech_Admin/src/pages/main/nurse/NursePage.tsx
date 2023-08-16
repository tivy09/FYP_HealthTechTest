import {
  IonAlert,
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
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useAppDispatch } from '../../../app/hooks'
import { add, createOutline, home, person } from 'ionicons/icons'
import { LoadingState } from '../../../utils/types/types'
import { nurseAPI } from '../../../api/nurseApi'

const NursePage = () => {
  const [toggleOpen, setToggleOpen] = useState(false)

  const [toggleId, setToggleId] = useState<number>(0)
  //data type display in nurse page
  const [nursesData, setNursesData] = useState<
    { id: number; name: string; image?: string; status: number }[]
  >([])

  //useAppDispatch - save data to local storage
  const dispatch = useAppDispatch()

  //set toast msg
  const [presentToast] = useIonToast()

  //history - go to other page
  const history = useHistory()

  //loading state
  const [isLoadingData, setIsLoadingData] = useState<LoadingState>('idle')

  //get all nurse
  const getAllNurse = async () => {
    const { data } = await nurseAPI.getAllNurse()
    const nurses = data.response.nurses
    if (data.status === 1401) {
      const extractedData: {
        id: number
        name: string
        image: string
        status: number
      }[] = nurses.map((nurse: any) => ({
        key: nurse.id,
        id: nurse.id,
        name: nurse.first_name + ' ' + nurse.last_name,
        image: nurse.avatar_preview,
        status: nurse.status,
      }))
      if (extractedData) {
        setIsLoadingData('success')
        setNursesData([...extractedData])
      }
    }
  }

  //useEffect
  useEffect(() => {
    getAllNurse()
    return
  }, [])

  //handle doctor status
  const handleStatus = async (id: number) => {
    setToggleOpen(true)
    const { data } = await nurseAPI.changeNurseStatus(id)
    if (data.status === 1406) {
      presentToast({
        message: data.message,
        duration: 2000,
        position: 'bottom',
        color: 'success',
      })
      setToggleOpen(false)
      getAllNurse()
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
          <IonTitle class="ion-text-center">Nurse</IonTitle>

          <IonButtons
            slot="end"
            onClick={() => history.goBack()}
            style={{ padding: '2%' }}
          >
            <IonIcon src={person} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid class="ion-no-padding">
          {isLoadingData === 'loading' && (
            <IonRow>
              <IonCol class="ion-text-center ion-padding">
                <IonSpinner />
              </IonCol>
            </IonRow>
          )}

          {isLoadingData === 'success' &&
            nursesData &&
            nursesData.length === 0 && (
              <IonRow>
                <IonCol class="ion-text-center ion-padding">
                  <IonText>There's no any nurse here</IonText>
                </IonCol>
              </IonRow>
            )}
          {isLoadingData === 'success' &&
            nursesData.map((nurse) => (
              <>
                <IonCard key={nurse.id}>
                  <IonCardContent>
                    <IonList>
                      <IonItem lines="none">
                        <IonThumbnail
                          slot="start"
                          onClick={() =>
                            history.push(`/nurse/detail/${nurse.id}`)
                          }
                        >
                          {nurse.image === null ? (
                            <img
                              alt={nurse.name}
                              src={`https://cdn4.iconfinder.com/data/icons/circle-avatars-1/128/012_girl_avatar_profile_woman_nurse_hat-2-512.png`}
                            />
                          ) : (
                            <img alt={nurse.name} src={nurse.image} />
                          )}
                        </IonThumbnail>
                        <IonLabel
                          onClick={() =>
                            history.push(`/nurse/detail/${nurse.id}`)
                          }
                        >
                          {''}
                          {nurse.name}
                        </IonLabel>
                        <IonIcon
                          src={createOutline}
                          size="large"
                          onClick={() =>
                            history.push(`/nurse/edit/${nurse.id}`)
                          }
                        />
                        <IonToggle
                          mode="md"
                          checked={nurse.status === 1 ? true : false}
                          onIonChange={() => {
                            setToggleId(nurse.id)
                            if (toggleId) setToggleOpen(true)
                          }}
                        ></IonToggle>
                      </IonItem>
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </>
            ))}
        </IonGrid>
        {/* add nurse fab button */}
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon
              icon={add}
              onClick={() => {
                history.push('/nurse/add')
              }}
            ></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonAlert
          isOpen={toggleOpen}
          header="Change doctor status?"
          buttons={[
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                setToggleOpen(false)
              },
            },
            {
              text: 'Yes',
              handler: () => {
                if (toggleId) handleStatus(toggleId)
              },
            },
          ]}
        ></IonAlert>
      </IonContent>
    </IonPage>
  )
}
export default NursePage
