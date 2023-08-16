import {
  IonAlert,
  IonCard,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToggle,
  IonToolbar,
  RefresherEventDetail,
  useIonAlert,
  useIonToast,
} from '@ionic/react'
import { addCircleOutline, create, trash } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useAppDispatch } from '../../../app/hooks'
import { LoadingState, MedicineData } from '../../../utils/types/types'
import BackHeader from '../../../components/BackHeader'
import { medAPI } from '../../../api/medApi'

const MedicineListPage = () => {
  //const
  const [medList, setMedList] = useState<MedicineData[]>()
  const [loadingList, SetLoadingList] = useState<LoadingState>('idle')

  //alert
  const [presentAlert] = useIonAlert()

  //useAppDispatch - save data to local storage
  const dispatch = useAppDispatch()

  //set toast msg
  const [presentToast] = useIonToast()

  //history - go to other page
  const history = useHistory()

  //alert
  const [statusAlert, setStatusAlert] = useState<boolean>(false)

  //medicine id
  const [medicineId, setMedicineId] = useState<number>(0)

  //get medicine list
  const getMedList = async () => {
    SetLoadingList('loading')
    const { data: responseData } = await medAPI.getMedicineList()
    if (responseData.status === 1051) {
      SetLoadingList('success')
      setMedList(responseData.response.medicines)
      presentToast({
        message: `${responseData.message}`,
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
    } else {
      SetLoadingList('failed')
    }
  }

  //useEffect
  useEffect(() => {
    getMedList()
  }, [])

  //pull refresh function
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete()
    }, 2000)
  }
  //delete alert
  const confirmDelete = (medId: number, medName: string) => {
    presentAlert({
      header: 'Alert',
      message: `Delete ${medName} ?`,
      buttons: [
        {
          text: 'ok',
          handler: () => deleteMed(medId),
        },
        'Cancel',
      ],
    })
  }
  //delete func
  const deleteMed = async (medId: any) => {
    const { data } = await medAPI.deleteMedicine(medId)
    console.log(data)
    if (data.status === 1055) {
      presentToast({
        message: `${data.message}`,
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
      getMedList()
      //call useEffect API function
    } else {
      presentToast({
        message: `${data.message}`,
        duration: 1500,
        position: 'bottom',
        color: 'danger',
      })
    }
  }

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

  //handle doctor status
  const handleMedicineStatus = async (id: number) => {
    setStatusAlert(true)
    const { data } = await medAPI.changeMedicineStatus(id)
    if (data.status === 1306) {
      presentToast({
        message: data.message,
        duration: 2000,
        position: 'bottom',
        color: 'success',
      })
      setStatusAlert(false)
      getMedList()
    }
  }
  return (
    <IonPage>
      <IonHeader class="ion-text-center">
        <IonToolbar>
          <BackHeader />
          <IonTitle class="ion-text-center">Medicine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonGrid>
          {/* <IonRow class="ion-no-padding">
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
          </IonRow> */}
          {loadingList === 'loading' && (
            <IonRow>
              <IonCol class="ion-text-center ion-padding">
                <IonSpinner />
              </IonCol>
            </IonRow>
          )}
          {loadingList === 'success' &&
            medList &&
            medList.map((medicine: MedicineData, index: number) => {
              return (
                <IonCard
                  key={index}
                  style={{ padding: '1%' }}
                  class="ion-text-center"
                >
                  <IonItem lines="none">
                    <IonCol
                      onClick={() => {
                        history.push(`/medicine/detail/` + medicine.id)
                      }}
                    >
                      <IonLabel>{medicine.name}</IonLabel>
                    </IonCol>
                    <IonIcon
                      icon={create}
                      size="small"
                      onClick={() => {
                        history.push(`/medicine/edit/` + medicine.id)
                      }}
                    />
                    <IonIcon
                      icon={trash}
                      size="small"
                      onClick={() => {
                        confirmDelete(medicine.id, medicine.name)
                      }}
                    />
                    <IonToggle
                      mode="md"
                      checked={medicine.status === 1 ? true : false}
                      onClick={() => {
                        setStatusAlert(true)
                        setMedicineId(medicine.id)
                      }}
                    ></IonToggle>
                  </IonItem>
                </IonCard>
              )
            })}
        </IonGrid>

        {/* add modal fab button */}
        <IonFab
          className="ion-padding"
          vertical="bottom"
          horizontal="end"
          slot="fixed"
          onClick={() => {
            history.push('/medicine/add')
          }}
        >
          <IonFabButton>
            <IonIcon icon={addCircleOutline} />
          </IonFabButton>
        </IonFab>
        {/* toggle status alert */}
        <IonAlert
          isOpen={statusAlert}
          header="Change medicine status?"
          buttons={[
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                setStatusAlert(false)
              },
            },
            {
              text: 'Yes',
              handler: () => {
                if (medicineId) handleMedicineStatus(medicineId)
              },
            },
          ]}
        ></IonAlert>
      </IonContent>
    </IonPage>
  )
}
export default MedicineListPage
