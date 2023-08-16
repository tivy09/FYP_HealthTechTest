import React from 'react'
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonSlides,
  IonSlide,
} from '@ionic/react'

interface Appointment {
  id: number
  patient: string
  doctor: string
  date: string
  time: string
}

interface AppointmentCardProps {
  appointmentData: Appointment[]
}

const slideOpts = {
  initialSlide: 1,
  speed: 400,
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointmentData,
}) => {
  return (
    <IonSlides options={slideOpts} pager={true}>
      {appointmentData.map((appointment) => (
        <IonSlide key={appointment.id}>
          <IonCard
            key={appointment.id}
            style={{ width: '300px', height: '150' }}
          >
            <IonCardHeader>
              <IonCardTitle>{appointment.patient}</IonCardTitle>
              <IonCardSubtitle>{appointment.date}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Time: {appointment.time}</p>
              {/* <p>Location: {appointment.location}</p> */}
            </IonCardContent>
          </IonCard>
        </IonSlide>
      ))}
    </IonSlides>
  )
}

export default AppointmentCard
