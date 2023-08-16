import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { call, ellipsisVertical, logoWhatsapp, time } from 'ionicons/icons'
import { useHistory } from 'react-router'
import { showNavBar } from '../../../app/auth/navBarSlice'
import { appointmentAPI } from '../../../api/appointmentApi'

const thumbnail: React.CSSProperties = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  objectFit: 'cover',
}
export type appointmentListType = {
  id: 0
  patientName: ''
  departmentName: ''
  avatar: ''
  appointmentDate: ''
  appointmentTime: ''
  status: ''
}

const ViewAppointmentPage = () => {
  const dispatch = useAppDispatch()
  //segment appointment status
  const [segmentDefault, selectedSegmentDefault] = useState<string>('past') //upcoming - scheduled,past - completed
  const [appointmentList, setAppointmentList] = useState<appointmentListType[]>(
    [],
  )
  const [upcomingAppointmentList, setUpcomingAppointmentList] = useState<
    appointmentListType[]
  >([])
  const userInfo = useAppSelector((state) => state.auth)
  const patientDefaultAvatar =
    'https://t3.ftcdn.net/jpg/04/41/79/68/360_F_441796853_cRB7JefHT0a1ZsDeFOmu7P7kzG8YsVBc.jpg'
  const history = useHistory()

  const getAppointmentList = async () => {
    const { data } = await appointmentAPI.getAppointmentList()
    const appointmentList = data.response.appointments
    if (data.status === 1551) {
      const extractedData: appointmentListType[] = appointmentList.map(
        (appointment: any) => ({
          id: appointment.id,
          patientName: appointment.name,
          departmentName: appointment.department_name,
          avatar:
            appointment.patients &&
            appointment.patients.image_preview === 'null'
              ? appointment.patients.image_preview
              : patientDefaultAvatar,
          appointmentDate: appointment.appointment_date,
          appointmentTime: appointment.appointment_time,
          status: appointment.status,
        }),
      )
      if (extractedData) setAppointmentList([...extractedData])
    }
  }

  //useEffect
  useEffect(() => {
    getAppointmentList()
    dispatch(showNavBar())
    return
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-text-center">
          <IonTitle>Appointment List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="ion-text-center">
          {appointmentList.map((appointmentData: any) => (
            <IonRow key={appointmentData.id}>
              <IonCol>
                <IonCard
                  onClick={() => {
                    history.push(`/appointment/${appointmentData.id}`)
                  }}
                >
                  <IonCardContent style={{ padding: '5%' }}>
                    <IonRow>
                      <IonCol>
                        <IonRow>
                          <IonCol className="ion-text-start" size="10">
                            <IonText
                              color={'primary'}
                              style={{ fontSize: '14px' }}
                            >
                              Appointment Date
                            </IonText>
                          </IonCol>
                          <IonCol size="2">
                            <IonIcon src={ellipsisVertical} />
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonIcon src={time} />
                          <IonText
                            className="ion-padding-left"
                            color={'medium'}
                            style={{ fontSize: '12px', paddingLeft: '3%' }}
                          >
                            {' '}
                            {appointmentData.appointmentDate}{' '}
                            {appointmentData.appointmentTime}
                          </IonText>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                    <hr
                      style={{
                        border: 'none',
                        height: '1px',
                        color: '#333',
                        backgroundColor: '#333',
                      }}
                    />
                    <IonRow>
                      <IonCol size="3">
                        <img style={thumbnail} src={appointmentData.avatar} />
                      </IonCol>
                      <IonCol size="7">
                        <IonRow>
                          <IonCol className="ion-text-start ion-padding-top">
                            {appointmentData.patientName}
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol
                            className="ion-text-start"
                            style={{ fontSize: '14px', padding: '2px 5px' }}
                          >
                            <IonText color={'medium'}>
                              {appointmentData.departmentName}
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </IonCol>
                      <IonCol size="2">
                        <IonRow>
                          <IonCol>
                            <IonIcon style={{ paddingTop: '10%' }} src={call} />
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol>
                            <IonIcon src={logoWhatsapp} />
                          </IonCol>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default ViewAppointmentPage
