import {
  IonBadge,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  useIonAlert,
  useIonToast,
} from '@ionic/react'
import { appointmentAPI } from '../../../api/appointmentApi'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  AppointmentDetailData,
  LoadingState,
  updateStatusPayload,
} from '../../../utils/types/types'
import {
  calendarClearOutline,
  callOutline,
  chevronBack,
  logoWhatsapp,
  walkOutline,
} from 'ionicons/icons'
import moment from 'moment'
import { useHistory } from 'react-router'
import { useAppDispatch } from '../../../app/hooks'
import { hideNavBar } from '../../../app/auth/navBarSlice'

const AppointmentDetailPage = (id: any) => {
  //patient default image
  const patientDefaultAvatar =
    'https://t3.ftcdn.net/jpg/04/41/79/68/360_F_441796853_cRB7JefHT0a1ZsDeFOmu7P7kzG8YsVBc.jpg'

  //chang route
  const history = useHistory()

  //call redux function
  const dispatch = useAppDispatch()

  //loading data
  const [loadingData, isLoadingData] = useState<LoadingState>('idle')

  //get id from link
  const appointmentId = id.match.params.id

  //set toast msg
  const [presentToast] = useIonToast()

  //set alert prompt
  const [presentAlert] = useIonAlert()

  //useForm to set data
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useForm<AppointmentDetailData>()

  //get appointment detail by appointment id
  const appointmentDetail = async () => {
    isLoadingData('loading')
    const { data } = await appointmentAPI.getAppointmentDetail(appointmentId)
    const appointment = data.response.appointment
    if (data.status === 1556) {
      if (appointment) {
        setValue('id', appointment.id)
        setValue('name', appointment.name)
        setValue('email', appointment.patients?.email)
        setValue('date', appointment.appointment_date)
        setValue('time', appointment.appointment_time)
        setValue('status', appointment.status)
        getDayName(new Date(appointment.appointment_date))
        isLoadingData('success')
        /* status & color
        1 - pending (grey/medium)
        2 - scheduled
        3 - approved
        4 - rejected (red/danger)
        5 - canceled (red/danger)
        6 - completed (green/success)
        7 - arrived
        8 - ready*/
      }
    } else {
      presentToast({
        message: data.message,
        duration: 1500,
        position: 'bottom',
        color: 'danger',
      })
    }
  }

  const getDayName = (date = new Date(), locale = 'en-US') => {
    setValue('day', date.toLocaleDateString(locale, { weekday: 'long' }))
  }

  const updateDepartmentAlert = async (status: string) => {
    presentAlert({
      header: 'Alert',
      subHeader: 'Are you sure to change the appointment status?',
      buttons: [
        { text: 'Yes', handler: () => updateDepartmentStatus(status) },
        'Cancel',
      ],
      onDidDismiss: (e) => console.log('did dismiss'),
    })
  }

  const updateDepartmentStatus = async (status: string) => {
    const payload: updateStatusPayload = {
      id: appointmentId,
      status: status,
    }
    const { data } = await appointmentAPI.updateAppointmentStatus(payload)
    if (data.status === 1553) {
      presentToast({
        message: 'Appointment status updated!',
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
    }
  }

  const divGreyRec: React.CSSProperties = {
    background: 'whitesmoke',
    width: '96%',
    maxWidth: '500px', // Set the maximum width here as per your requirement
    margin: '20px auto',
    borderRadius: '4px',
  }

  const roundImg: React.CSSProperties = {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    objectFit: 'cover',
  }

  //useEffect
  useEffect(() => {
    appointmentDetail()
    dispatch(hideNavBar())
  }, [])

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          {/* header */}
          <IonRow className="ion-padding ion-text-center">
            <IonCol
              size="1"
              style={{ paddingTop: '2%' }}
              onClick={() => history.goBack()}
            >
              <IonIcon src={chevronBack} />
            </IonCol>
            <IonCol size="11">
              <IonTitle>Booking Detail</IonTitle>
            </IonCol>
          </IonRow>
          {loadingData === 'loading' && (
            <IonGrid>
              <IonRow>
                <IonCol className="ion-text-center ion-padding-top">
                  <IonSpinner />
                </IonCol>
              </IonRow>
            </IonGrid>
          )}
          {loadingData === 'success' && (
            <>
              {/* booking info title + status */}
              <IonRow className="ion-no-padding">
                <IonCol size="6" className="ion-padding">
                  <IonLabel>
                    <IonText style={{ fontWeight: 'bold' }}>
                      Booking Info
                    </IonText>
                  </IonLabel>
                </IonCol>
                <IonCol size="6" className="ion-padding ion-text-end">
                  {getValues('status') === '1' && (
                    <IonBadge color={'medium'}>
                      <IonLabel>
                        <IonText
                          style={{ fontWeight: 'bold', fontSize: 'small' }}
                        >
                          Pending
                        </IonText>
                      </IonLabel>
                    </IonBadge>
                  )}
                </IonCol>
                <div style={divGreyRec}>
                  <IonRow className="ion-no-padding">
                    <IonCol size="3" className="ion-padding">
                      <IonBadge
                        style={{
                          width: '55px',
                          height: '55px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IonIcon
                          icon={calendarClearOutline}
                          color="light"
                          size="large"
                        />
                      </IonBadge>
                    </IonCol>
                    <IonCol size="9" className="ion-padding">
                      <IonRow>
                        <IonLabel>
                          <IonText>Date & Time</IonText>
                        </IonLabel>
                      </IonRow>
                      <IonRow>
                        <IonLabel>
                          <IonText color={'medium'}>{getValues('day')}</IonText>{' '}
                          &nbsp;
                          <IonText color={'medium'}>·</IonText> &nbsp;
                          <IonText color={'medium'}>
                            {getValues('date')}
                          </IonText>
                        </IonLabel>
                      </IonRow>
                      <IonRow>
                        <IonLabel>
                          <IonText>
                            {moment(getValues('time'), 'HH:mm').format(
                              'h:mm A',
                            )}
                          </IonText>
                        </IonLabel>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                  <hr
                    style={{
                      border: 'none',
                      height: '1px',
                      color: '#d9d9d9',
                      backgroundColor: '#d9d9d9',
                    }}
                  />
                  {/* appointment */}
                  <IonRow>
                    <IonCol size="3" className="ion-padding">
                      <IonBadge
                        style={{
                          width: '55px',
                          height: '55px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IonIcon
                          icon={walkOutline}
                          color="light"
                          size="large"
                        />
                      </IonBadge>
                    </IonCol>
                    <IonCol size="9" className="ion-padding">
                      <IonRow>
                        <IonLabel>
                          <IonText>Appointment Type</IonText>
                        </IonLabel>
                      </IonRow>
                      <IonRow>
                        <IonLabel>
                          <IonText color={'medium'}>In Person</IonText>
                        </IonLabel>
                      </IonRow>
                      <IonRow>
                        <IonLabel>
                          <IonText color={'medium'}>None</IonText>
                        </IonLabel>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </div>
                {/* grey background end */}
              </IonRow>

              <IonRow>
                <IonCol size="12" className="ion-padding">
                  <IonLabel>
                    <IonText style={{ fontWeight: 'bold' }}>
                      Patient Info
                    </IonText>
                  </IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-padding">
                  <img style={roundImg} src={patientDefaultAvatar} />
                </IonCol>
                <IonCol size="6" className="ion-padding-top">
                  <IonRow className="ion-padding-top">
                    <IonLabel>
                      <IonText>{getValues('name')}</IonText>
                    </IonLabel>
                  </IonRow>
                  <IonRow>
                    <IonLabel>
                      <IonText color={'medium'}>{getValues('email')}</IonText>
                    </IonLabel>
                  </IonRow>
                </IonCol>
                <IonCol size="2">
                  <IonRow className="ion-padding-top">
                    <IonCol>
                      <IonIcon src={callOutline} />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonIcon src={logoWhatsapp} />
                    </IonCol>
                  </IonRow>
                </IonCol>
              </IonRow>
              <IonRow className="ion-padding-top">
                {/* <IonCol size="12"> */}
                {/* <IonButton
                    shape="round"
                    expand="full"
                    type="submit"
                    size="large"
                    fill="outline"
                  > */}
                {/* 1 - pending (grey/medium) 2 - scheduled 3 - approved 4 -
                    rejected (red/danger) 5 - canceled (red/danger) 6 -
                      completed (green/success) 7 - arrived 8 - ready*/}
                {/* 1 - pending  */}
                {getValues('status') === '1' && (
                  <>
                    {/* approved */}
                    <IonCol size="6">
                      <IonButton
                        shape="round"
                        expand="full"
                        fill="outline"
                        size="large"
                        onClick={() => updateDepartmentAlert('3')}
                      >
                        <IonText>Accept</IonText>
                      </IonButton>
                    </IonCol>
                    {/* rejected */}
                    <IonCol size="6">
                      <IonButton
                        shape="round"
                        expand="full"
                        fill="outline"
                        size="large"
                        color={'danger'}
                        onClick={() => updateDepartmentAlert('4')}
                      >
                        <IonText>Reject</IonText>
                      </IonButton>
                    </IonCol>
                  </>
                )}
                {/* 2 - scheduled => 7 - Arrived */}
                {getValues('status') === '2' && (
                  <IonCol size="12">
                    <IonButton
                      shape="round"
                      expand="full"
                      fill="solid"
                      size="large"
                      onClick={() => updateDepartmentAlert('7')}
                    >
                      <IonText>Mark as arrived</IonText>
                    </IonButton>
                  </IonCol>
                )}
                {/* 3 - Approved => 2 - scheduled*/}
                {getValues('status') === '3' && (
                  <IonCol size="12">
                    <IonButton
                      shape="round"
                      expand="full"
                      fill="solid"
                      size="large"
                      onClick={() => updateDepartmentAlert('2')}
                    >
                      <IonText>Mark as Scheduled</IonText>
                    </IonButton>
                  </IonCol>
                )}
                {/* 4 - Rejected */}
                {getValues('status') === '4' && (
                  <IonCol size="12">
                    <IonButton
                      shape="round"
                      expand="full"
                      fill="solid"
                      size="large"
                      color={'danger'}
                      disabled={true}
                    >
                      <IonText>Rejected</IonText>
                    </IonButton>
                  </IonCol>
                )}
                {/* 5 - Canceled */}
                {getValues('status') === '5' && (
                  <IonCol size="12">
                    <IonButton
                      shape="round"
                      expand="full"
                      fill="solid"
                      size="large"
                      color={'danger'}
                      disabled={true}
                    >
                      <IonText>Canceled</IonText>
                    </IonButton>
                  </IonCol>
                )}
                {/* 6 - Completed */}
                {getValues('status') === '6' && (
                  <IonCol size="12">
                    <IonButton
                      shape="round"
                      expand="full"
                      fill="solid"
                      size="large"
                      color={'success'}
                      disabled={true}
                    >
                      <IonText>Completed</IonText>
                    </IonButton>
                  </IonCol>
                )}
                {/* 7 - Arrived => 8 - ready*/}
                {getValues('status') === '7' && (
                  <IonCol size="12">
                    <IonButton
                      shape="round"
                      expand="full"
                      fill="solid"
                      size="large"
                      onClick={() => updateDepartmentAlert('8')}
                    >
                      <IonText>Mark as Ready</IonText>
                    </IonButton>
                  </IonCol>
                )}
                {/* 8 - Ready => 6 - completed*/}
                {getValues('status') === '8' && (
                  <IonCol size="12">
                    <IonButton
                      shape="round"
                      expand="full"
                      fill="solid"
                      size="large"
                      onClick={() => updateDepartmentAlert('6')}
                    >
                      <IonText>Mark as Completed</IonText>
                    </IonButton>
                  </IonCol>
                )}
                {/* </IonButton> */}
                {/* </IonCol> */}
              </IonRow>
            </>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default AppointmentDetailPage
