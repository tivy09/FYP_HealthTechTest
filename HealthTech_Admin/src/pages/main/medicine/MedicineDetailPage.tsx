import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  RefresherEventDetail,
  useIonToast,
} from '@ionic/react'
import BackHeader from '../../../components/BackHeader'
import { RouteComponentProps, useHistory } from 'react-router'
import { useForm } from 'react-hook-form'
import {
  LoadingState,
  MedicineCategoryData,
  MedicineData,
} from '../../../utils/types/types'
import { useState, useEffect } from 'react'
import { medCatAPI } from '../../../api/medCatApi'
import { medAPI } from '../../../api/medApi'

interface Props
  extends RouteComponentProps<{
    id: string
  }> {}

const MedicineDetailPage: React.FC<Props> = ({ match }) => {
  const { setValue, getValues, reset } = useForm<MedicineData>({
    defaultValues: {
      id: 0,
      uid: 0,
      name: '',
      amount: 0,
      price: 0,
      status: 1,
      medicine_category_id: 0,
    },
  })

  //const medicine category list
  const [medCatList, setMedCatList] = useState<MedicineCategoryData[]>()

  //set medicine category name
  const [medCatName, setMedCatName] = useState<string>('')

  //loading detail state
  const [loadingDetail, SetLoadingDetail] = useState<LoadingState>('idle')

  //history - go to other page
  const history = useHistory()

  //set toast msg
  const [presentToast] = useIonToast()

  // useEffect
  useEffect(() => {
    getMedicineDetail()
    return
  }, [])

  //get medicine detail
  const getMedicineDetail = async () => {
    SetLoadingDetail('loading')
    const { data } = await medAPI.getMedicineDetail(match.params.id)
    if (data.status === 1053) {
      SetLoadingDetail('success')
      setValue('id', data.response.medicine.id)
      setValue('uid', data.response.medicine.uid)
      setValue('name', data.response.medicine.name)
      setValue('amount', data.response.medicine.amount)
      setValue('price', data.response.medicine.price)
      setValue('status', data.response.medicine.status)
      setValue(
        'medicine_category_id',
        data.response.medicine.medicine_category_id,
      )
      presentToast({
        message: `${data.message}`,
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
    }
  }

  //pull refresh function
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete()
    }, 2000)
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
        <IonGrid fixed class="ion-padding">
          {loadingDetail === 'loading' && (
            <IonRow>
              <IonCol class="ion-text-center">
                <IonSpinner />
              </IonCol>
            </IonRow>
          )}
          {loadingDetail === 'success' && getValues() && (
            <>
              {/* medicine name */}
              <IonRow>
                <IonCol>
                  <IonItem class="ion-no-padding">
                    <IonLabel color={'primary'} position="fixed">
                      Name
                    </IonLabel>
                    <IonText>{getValues('name')}</IonText>
                  </IonItem>
                </IonCol>
              </IonRow>
              {/* medicine amount */}
              <IonRow>
                <IonCol>
                  <IonItem class="ion-no-padding">
                    <IonLabel color={'primary'} position="fixed">
                      Amount
                    </IonLabel>
                    <IonText>{getValues('amount')}</IonText>
                  </IonItem>
                </IonCol>
              </IonRow>
              {/* medicine price */}
              <IonRow>
                <IonCol>
                  <IonItem class="ion-no-padding">
                    <IonLabel color={'primary'} position="fixed">
                      Price
                    </IonLabel>
                    <IonText>{`RM ` + ` ` + getValues('price')}</IonText>
                  </IonItem>
                </IonCol>
              </IonRow>
              {/* medicine status */}
              <IonRow>
                <IonCol>
                  <IonItem class="ion-no-padding">
                    <IonLabel color={'primary'}>Status</IonLabel>
                    <IonToggle
                      checked={getValues('status') === 1 ? true : false}
                      slot="end"
                      onIonChange={(e) =>
                        setValue('status', e.detail.checked === true ? 1 : 0)
                      }
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
              {/* medicine category */}
              <IonRow>
                <IonCol>
                  <IonItem class="ion-no-padding">
                    <IonLabel color={'primary'}>Medicine Category</IonLabel>
                    <IonText>{medCatName}</IonText>
                  </IonItem>
                </IonCol>
              </IonRow>
              {/* submit & close button */}
              <IonButton
                type="submit"
                expand="block"
                fill="solid"
                shape="round"
                size="large"
                onClick={() => {
                  history.push('/medicine')
                  reset()
                }}
              >
                Close
              </IonButton>
            </>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default MedicineDetailPage
