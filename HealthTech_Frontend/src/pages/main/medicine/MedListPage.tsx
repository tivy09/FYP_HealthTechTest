import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  RefresherEventDetail,
  useIonAlert,
  useIonToast,
} from '@ionic/react'
import { create, homeOutline, trash } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { authAPI } from '../../../api/authApi'
import { saveUserData } from '../../../app/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { LoginData, MedicineData } from '../../../utils/types/types'

const AllMedicinePage = () => {
  //const
  const [medList, setMedList] = useState<MedicineData[]>()
  //alert
  const [presentAlert] = useIonAlert()

  //useAppDispatch - save data to local storage
  const dispatch = useAppDispatch()

  //set toast msg
  const [presentToast] = useIonToast()

  //history - go to other page
  const history = useHistory()

  //hook form init
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      input: '',
      password: '',
    },
  })
  const deleteMed = (medId: any) => {
    return
    if ('') {
      presentToast({
        message: 'Medicine deleted success',
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
      //call useEffect API function
    }
  }
  //pull refresh function
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete()
    }, 2000)
  }
  //delete function
  const confirmDelete = (catId: any) => {
    presentAlert({
      header: 'Alert',
      message: 'Delete meidicine?',
      buttons: [
        {
          text: 'ok',
          handler: () => deleteMed(catId),
        },
        'Cancel',
      ],
      onDidDismiss: (e) => console.log('did dismiss'),
    })
  }
  //get medicine list
  const getMedList = async () => {
    setMedList([
      {
        id: 1,
        uid: 1,
        name: 'medicine 1',
        amount: 10,
        price: 'RM' + 10,
        status: 1,
        medicine_category_id: 1,
      },
      {
        id: 2,
        uid: 1,
        name: 'medicine 2',
        amount: 10,
        price: 'RM' + 10,
        status: 1,
        medicine_category_id: 1,
      },
    ])
  }

  //useEffect
  useEffect(() => {
    getMedList()
  }, [])

  //search bar function start
  const [searchQuery, setSearchQuery] = useState('')

  function handleSearchInput(event: CustomEvent) {
    console.log(event.detail.value)
    setSearchQuery(event.detail.value)
  }

  const handleSearch = async () => {
    console.log(searchQuery)
    alert('search api called')
  }

  //submtit form
  const onSubmit = async (data: LoginData) => {
    const { data: responseData } = await authAPI.loginUser(data)
    if (responseData.status === 702) {
      presentToast({
        message: responseData.message,
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
      const token = atob(responseData.response)
      dispatch(saveUserData(token))
    } else if (responseData.status !== 702) {
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
      <IonHeader class="ion-text-center">
        <IonToolbar>
          <IonButtons
            slot="start"
            onClick={() => history.goBack()}
            style={{ paddingLeft: '2%' }}
          >
            <IonIcon src={homeOutline} />
          </IonButtons>
          <IonTitle class="ion-text-center">Medicine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonGrid>
          <IonRow class="ion-no-padding">
            <IonCol size="9">
              <IonSearchbar
                placeholder="Search"
                onIonInput={handleSearchInput}
                onIonChange={handleSearch}
                showClearButton="focus"
              />
            </IonCol>
            <IonCol size="3" style={{ paddingTop: '5%' }}>
              <IonButton onClick={handleSearch} size="small">
                <IonText>Search</IonText>
              </IonButton>
            </IonCol>
          </IonRow>
          {medList &&
            medList.map((medicine: MedicineData, index: number) => {
              return (
                <IonCard
                  key={index}
                  style={{ padding: '1%' }}
                  class="ion-text-center"
                >
                  <IonItem lines="none">
                    <IonCol
                      size="10"
                      onClick={() => {
                        history.push(`/medicineDetail/` + medicine.id)
                      }}
                    >
                      <IonLabel>{medicine.name}</IonLabel>
                    </IonCol>
                    <IonCol size="1">
                      <IonIcon
                        icon={create}
                        size="default"
                        onClick={() => {
                          history.push(`/medicineDetail/` + medicine.id)
                        }}
                      />
                    </IonCol>
                    <IonCol size="1">
                      <IonIcon
                        icon={trash}
                        size="default"
                        onClick={() => {
                          confirmDelete(medicine.id)
                        }}
                      />
                    </IonCol>
                  </IonItem>
                </IonCard>
              )
            })}
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default AllMedicinePage
