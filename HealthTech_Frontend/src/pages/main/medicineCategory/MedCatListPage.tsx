import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
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
  useIonAlert,
  useIonToast,
} from '@ionic/react'
import {
  add,
  addCircleOutline,
  create,
  homeOutline,
  trash,
} from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { LoadingState, MedicineCategoryData } from '../../../utils/types/types'
import '../../../../src/global.scss'
import { medCatAPI } from '../../../api/medCatApi'
import './medCat.css'

const MedCatListPage = () => {
  //loading state
  const [loadingList, SetLoadingList] = useState<LoadingState>('idle')
  const [loadingDetail, SetLoadingDetail] = useState<LoadingState>('idle')
  //modal const
  const [editModal, setEditModal] = useState<boolean>(false)
  const [detailModal, setDetailModal] = useState<boolean>(false)
  const [addModal, setAddModal] = useState<boolean>(false)
  //const
  const [medCatList, setMedCatList] = useState<MedicineCategoryData[]>()
  const [medDetail, setMedDetail] = useState<MedicineCategoryData>()
  //toggel status
  //alert
  const [presentAlert] = useIonAlert()
  //useAppDispatch - save data to local storage
  //set toast msg
  const [presentToast] = useIonToast()
  //history - go to other page
  const history = useHistory()

  //hook form init
  const { register, handleSubmit, setValue, getValues } = useForm<
    MedicineCategoryData
  >({
    defaultValues: {
      name: '',
      status: 1,
    },
  })

  //pull refresh function
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      getMedCatList()
      event.detail.complete()
    }, 2000)
  }

  //delete alert box
  const confirmDelete = (catId: any) => {
    presentAlert({
      header: 'Remove Medicin Cat?',
      mode: 'md',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            deleteFunc(catId)
          },
        },
      ],
    })
  }

  //delete
  const deleteFunc = async (medId: any) => {
    const { data } = await medCatAPI.deleteMedCat(medId)
    if (data.status === '1105') {
      presentToast({
        message: 'Medicine deleted success',
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
      getMedCatList()
    }
  }

  //get medicine list
  const getMedCatList = async () => {
    SetLoadingList('loading')
    const { data } = await medCatAPI.getMedCatList()
    const getList = data.response.medicine_categories
    setMedCatList(await getList)
    if (medCatList !== null) {
      SetLoadingList('success')
    }
  }

  //get detail medicine
  const getMedCatDetail = async (id: number) => {
    SetLoadingDetail('loading')
    const { data } = await medCatAPI.getMedCatDetail(id)
    const getDetail = data.response
    setValue('id', getDetail.id)
    setValue('name', getDetail.name)
    setValue('status', getDetail.status)
    if (getValues('id')) SetLoadingDetail('success')
  }

  //update alert
  const editAlert = handleSubmit((data: MedicineCategoryData) => {
    presentAlert({
      header: 'Update Medicine Category Detail?',
      mode: 'md',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            edit(data)
          },
        },
      ],
    })
  })

  //update API
  const edit = async (updateData: MedicineCategoryData) => {
    const { data } = await medCatAPI.updateMedCat(getValues('id'), updateData)
    if (data.status === 1104) {
      presentToast({
        message: 'Medicine update success',
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
    } else {
      presentToast({
        message: 'Medicine update failed, please try again',
        duration: 1500,
        position: 'bottom',
        color: 'failed',
      })
    }
  }

  //add alert
  const addAlert = handleSubmit((data: MedicineCategoryData) => {
    presentAlert({
      header: 'Add New Medicine Category?',
      mode: 'md',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            add(data)
          },
        },
      ],
    })
  })

  //add API
  const add = async (addData: MedicineCategoryData) => {
    const { data } = await medCatAPI.addMedCat(addData)
    if (data.status === 1102) {
      presentToast({
        message: 'Medicine add success',
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
      setAddModal(false)
      getMedCatList()
    } else {
      presentToast({
        message: 'Medicine add failed, please try again',
        duration: 1500,
        position: 'bottom',
        color: 'failed',
      })
    }
  }

  //useEffect
  useEffect(() => {
    getMedCatList()
  }, [])

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
          <IonTitle class="ion-text-center">Medicine Category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* loading data  */}
        {loadingList !== 'success' && (
          <>
            <IonGrid>
              <IonRow className="ion-text-center">
                <IonCol>
                  <IonSpinner />
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        )}

        {/* if the list is empty */}
        {loadingList === 'success' && medCatList?.length === 0 && (
          <>
            <IonGrid>
              <IonRow className="ion-text-center">
                <IonCol>
                  <IonText>
                    The list is empty now. Create a new at bottom!
                  </IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        )}

        {/* data loaded and display */}
        <>
          <IonGrid>
            {loadingList === 'success' &&
              medCatList &&
              medCatList.map(
                (medicine: MedicineCategoryData, index: number) => {
                  return (
                    <IonCard
                      key={index}
                      style={{ paddingTop: '1%' }}
                      class="ion-text-center ion-no-padding"
                    >
                      <IonItem lines="none">
                        <IonCol
                          size="10"
                          onClick={() => {
                            setDetailModal(true)
                            getMedCatDetail(medicine.id)
                          }}
                        >
                          <IonLabel>{medicine.name}</IonLabel>
                        </IonCol>
                        <IonCol size="1">
                          <IonIcon
                            icon={create}
                            size="default"
                            onClick={() => {
                              setEditModal(true)
                              getMedCatDetail(medicine.id)
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
                },
              )}
          </IonGrid>
        </>

        {/* add modal fab button */}
        <IonFab
          className="ion-padding"
          vertical="bottom"
          horizontal="end"
          slot="fixed"
        >
          <IonFabButton
            onClick={() => {
              setAddModal(true)
              setValue('status', 1)
            }}
          >
            <IonIcon icon={addCircleOutline} />
          </IonFabButton>
        </IonFab>

        {/* pull down to refresh */}
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* edit modal start */}
        <>
          <IonModal
            id="example-modal"
            isOpen={editModal}
            showBackdrop={true}
            onDidDismiss={() => setEditModal(false)}
            backdropDismiss={false}
          >
            <IonContent>
              <IonToolbar>
                <IonTitle className="ion-text-center">
                  Edit Modal Detail
                </IonTitle>
              </IonToolbar>
              {loadingDetail !== 'success' && (
                <>
                  <IonGrid>
                    <IonRow className="ion-text-center">
                      <IonCol>
                        <IonSpinner />
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </>
              )}

              {loadingDetail === 'success' && (
                <>
                  <IonGrid>
                    <form onSubmit={editAlert}>
                      <IonItem style={{ borderRadius: '25px' }}>
                        <IonLabel position="fixed">Name</IonLabel>
                        <IonInput
                          value={getValues('name')}
                          {...register('name')}
                        />
                      </IonItem>
                      <IonItem style={{ borderRadius: '25px' }}>
                        <IonCol size="9" className="ion-no-padding">
                          <IonLabel>Status</IonLabel>
                        </IonCol>
                        <IonCol size="3">
                          <IonToggle
                            checked={getValues('status') === 1}
                            onIonChange={(e) => {
                              if (e.detail.checked === true)
                                setValue('status', 1)
                              else {
                                setValue('status', 0)
                              }
                            }}
                          />
                        </IonCol>
                      </IonItem>
                      <IonRow style={{ paddingTop: '10%', padding: '2%' }}>
                        <IonCol>
                          <IonButton
                            type="submit"
                            expand="block"
                            fill="solid"
                            shape="round"
                            size="large"
                          >
                            Submit
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </form>
                    <IonRow
                      className="ion-text-center ion-no-padding"
                      onClick={() => {
                        setEditModal(false)
                        getMedCatList()
                      }}
                    >
                      <IonCol size="12">
                        <IonText color="primary">Close</IonText>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </>
              )}
            </IonContent>
          </IonModal>
        </>

        {/*detail modal start */}
        <>
          <IonModal
            id="example-modal"
            isOpen={detailModal}
            showBackdrop={true}
            backdropDismiss={false}
          >
            <IonContent>
              <IonToolbar>
                <IonTitle className="ion-text-center">Modal Detail</IonTitle>
              </IonToolbar>

              {loadingDetail !== 'success' && (
                <>
                  <IonGrid>
                    <IonRow className="ion-text-center">
                      <IonCol>
                        <IonSpinner />
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </>
              )}
              {loadingDetail === 'success' && (
                <>
                  <IonGrid>
                    <IonItem style={{ borderRadius: '25px' }}>
                      <IonLabel position="fixed">Name</IonLabel>
                      <IonInput value={getValues('name')} disabled />
                    </IonItem>
                    <IonItem style={{ borderRadius: '25px' }}>
                      <IonCol size="9" className="ion-no-padding">
                        <IonLabel>Status</IonLabel>
                      </IonCol>
                      <IonCol size="3">
                        <IonToggle
                          checked={getValues('status') === 1}
                          disabled
                        />
                      </IonCol>
                    </IonItem>
                    <IonRow style={{ paddingTop: '10%', padding: '2%' }}>
                      <IonCol>
                        <IonButton
                          type="submit"
                          expand="block"
                          fill="solid"
                          shape="round"
                          size="large"
                          onClick={() => {
                            setDetailModal(false)
                            setMedDetail({ id: 0, name: '', status: 0 })
                            getMedCatList()
                          }}
                        >
                          Close
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </>
              )}
            </IonContent>
          </IonModal>
        </>

        {/* add modal start */}
        <>
          <IonModal
            id="example-modal"
            isOpen={addModal}
            showBackdrop={true}
            backdropDismiss={false}
          >
            <IonContent>
              <IonToolbar>
                <IonTitle className="ion-text-center">
                  <IonText>Add New Medicine Category </IonText>
                </IonTitle>
              </IonToolbar>
              <>
                <IonGrid>
                  <form onSubmit={addAlert}>
                    <IonItem style={{ borderRadius: '25px' }}>
                      <IonLabel position="fixed">Name</IonLabel>
                      <IonInput
                        {...register('name')}
                        placeholder="medicine category name"
                      />
                    </IonItem>
                    <IonItem style={{ borderRadius: '25px' }}>
                      <IonCol size="9" className="ion-no-padding">
                        <IonLabel>Status</IonLabel>
                      </IonCol>
                      <IonCol size="3">
                        <IonToggle
                          checked={true}
                          onIonChange={(e) => {
                            if (e.detail.checked === true) setValue('status', 1)
                            else {
                              setValue('status', 0)
                            }
                          }}
                        />
                      </IonCol>
                    </IonItem>
                    <IonRow style={{ paddingTop: '10%', padding: '2%' }}>
                      <IonCol>
                        <IonButton
                          type="submit"
                          expand="block"
                          fill="solid"
                          shape="round"
                          size="large"
                        >
                          Create
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </form>
                  <IonRow
                    className="ion-text-center ion-no-padding"
                    onClick={() => {
                      setAddModal(false)
                      setValue('name', '')
                      setValue('status', 0)
                      getMedCatList()
                    }}
                  >
                    <IonCol size="12">
                      <IonText color="primary">Close</IonText>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </>
            </IonContent>
          </IonModal>
        </>
      </IonContent>
    </IonPage>
  )
}
export default MedCatListPage
