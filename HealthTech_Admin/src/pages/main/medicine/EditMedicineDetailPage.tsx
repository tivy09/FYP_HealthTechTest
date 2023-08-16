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
  IonRange,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import { useForm } from 'react-hook-form'
import BackHeader from '../../../components/BackHeader'
import {
  LoadingState,
  MedicineCategoryData,
  MedicineData,
} from '../../../utils/types/types'
import { useEffect, useState } from 'react'
import { add, remove, tvSharp } from 'ionicons/icons'
import { medCatAPI } from '../../../api/medCatApi'
import { medAPI } from '../../../api/medApi'
import { RouteComponentProps, useHistory } from 'react-router'

interface Props
  extends RouteComponentProps<{
    id: string
  }> {}

const EditMedicineDetailPage: React.FC<Props> = ({ match }) => {
  //set toast msg
  const [presentToast] = useIonToast()

  //history - go to other page
  const history = useHistory()

  //const
  const [medCatList, setMedCatList] = useState<MedicineCategoryData[]>()

  //loading state
  const [loadingList, SetLoadingList] = useState<LoadingState>('idle')

  //loading detail state
  const [loadingDetail, setLoadingDetail] = useState<LoadingState>('idle')

  //loading submit state
  const [loadingSubmit, setLoadingSubmit] = useState<LoadingState>('idle')

  //price range hook & func
  const [price, setPrice] = useState<number>(50)
  const incrementPrice = () => {
    setPrice(price + 1)
    setValue('price', price)
  }
  const decrementPrice = () => {
    setPrice(price - 1)
    setValue('price', price)
  }

  //amount range hook & func
  const [amount, setAmount] = useState<number>(1)
  const incrementAmount = () => {
    setAmount(amount + 1)
    setValue('amount', amount)
  }
  const decrementAmount = () => {
    setAmount(amount - 1)
    setValue('amount', amount)
  }

  //handle medicine category
  const handleMedicineCategory = (event: any) => {
    if (medCatList)
      medCatList.map((medcineCategory) => {
        if (medcineCategory.id === event.detail.value) {
          setValue('medicine_category_id', medcineCategory.id)
        }
      })
  }

  //medicine data hook form
  const { register, setValue, getValues, handleSubmit, reset } = useForm<
    MedicineData
  >({
    defaultValues: {
      id: 0,
      uid: 0,
      name: '',
      amount: amount,
      price: price,
      status: 1,
      medicine_category_id: 0,
    },
  })

  //get medicine category data
  const getMedCatList = async () => {
    SetLoadingList('loading')
    const { data } = await medCatAPI.getMedCatList()
    const getList = data.response.medicine_categories
    setMedCatList(await getList)
    setValue('medicine_category_id', getList[0].id)
    if (medCatList !== null) {
      SetLoadingList('success')
    }
  }

  //get medicine detail
  const getMedicineDetail = async () => {
    const { data } = await medAPI.getMedicineDetail(match.params.id)
    setLoadingDetail('loading')
    if (data.status === 1053) {
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
    setLoadingDetail('success')
  }

  // useEffect
  useEffect(() => {
    getMedCatList()
    getMedicineDetail()
  }, [])

  //create data
  const onSubmit = async (data: MedicineData) => {
    setLoadingSubmit('loading')
    const payload = {
      name: getValues('name'),
      amount: getValues('amount'),
      price: getValues('price'),
      status: getValues('status'),
      medicine_category_id: getValues('medicine_category_id'),
    }
    const { data: responseData } = await medAPI.updateMedicine(data.id, payload)
    if (responseData.status === 1054) {
      setLoadingSubmit('success')
      presentToast({
        message: responseData.message,
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
      history.push('/medicine')
    } else {
      setLoadingDetail('failed')
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
          <IonTitle class="ion-text-center">Medicine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonGrid fixed>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* medicine name */}
            <IonRow>
              <IonCol>
                <IonItem class="ion-no-padding">
                  <IonLabel position="fixed">Name</IonLabel>
                  <IonInput
                    type="text"
                    required
                    value={getValues('name')}
                    {...register('name', { required: true })}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            {/* medicine amount */}
            <IonRow>
              <IonCol>
                <IonItem class="ion-no-padding">
                  <IonLabel position="fixed">Amount</IonLabel>
                  <IonCol></IonCol>
                  <IonButton expand="block" onClick={incrementAmount}>
                    <IonIcon src={add} />
                  </IonButton>
                  <IonText>{getValues('amount')}</IonText>
                  <IonButton expand="block" onClick={decrementAmount}>
                    <IonIcon src={remove} />
                  </IonButton>
                </IonItem>
              </IonCol>
            </IonRow>
            {/* medicine price */}
            <IonRow>
              <IonCol>
                <IonItem class="ion-no-padding">
                  <IonLabel position="fixed">Price</IonLabel>
                  <IonCol></IonCol>
                  <IonButton expand="block" onClick={incrementPrice}>
                    <IonIcon src={add} />
                  </IonButton>
                  {''}
                  <IonText>{`RM ` + ` ` + getValues('price')}</IonText>
                  {''}
                  <IonButton expand="block" onClick={decrementPrice}>
                    <IonIcon src={remove} />
                  </IonButton>
                </IonItem>
              </IonCol>
            </IonRow>
            {/* medicine status */}
            <IonRow>
              <IonCol>
                <IonItem class="ion-no-padding">
                  <IonLabel>Status</IonLabel>
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
                  <IonLabel>Medicine Category</IonLabel>
                  <IonSelect
                    value={getValues('medicine_category_id')}
                    onIonChange={handleMedicineCategory}
                  >
                    {loadingList === 'success' &&
                      medCatList &&
                      medCatList.map((item) => (
                        <IonSelectOption key={item.id} value={item.id}>
                          {item.name}
                        </IonSelectOption>
                      ))}
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
            {/* submit & close button */}
            {loadingSubmit === 'loading' || 'failed ' ? (
              <>
                <IonButton
                  type="submit"
                  expand="block"
                  fill="solid"
                  shape="round"
                  size="large"
                  onClick={() => {
                    onSubmit(getValues())
                  }}
                >
                  Submit
                </IonButton>
                <IonRow>
                  <IonCol class="ion-text-center">
                    <IonLabel
                      onClick={() => {
                        history.push('/medicine')
                        reset()
                      }}
                    >
                      <IonText color={'primary'}>Close</IonText>
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </>
            ) : (
              <IonRow>
                <IonCol class="-ion-text-center">
                  <IonSpinner />
                </IonCol>
              </IonRow>
            )}
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default EditMedicineDetailPage
