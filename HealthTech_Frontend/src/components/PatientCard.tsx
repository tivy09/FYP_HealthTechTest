import React from 'react'
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonSlides,
  IonSlide,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonCol,
  IonRow,
} from '@ionic/react'
import { createOutline } from 'ionicons/icons'

interface Patient {
  id: number
  patient: string
  doctor: string
  date: string
  time: string
}

interface PatientCardProps {
  patientData: Patient[]
}

const slideOpts = {
  initialSlide: 1,
  speed: 400,
}

const thumbnail: React.CSSProperties = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  objectFit: 'cover',
}

const PatientCard: React.FC<PatientCardProps> = ({ patientData }) => {
  return (
    <>
      {patientData.map((patient: Patient) => (
        <IonCard key={patient.id} style={{ width: '300px', height: '150' }}>
          <IonCardContent>
            <IonItem lines="none" className="ion-no-padding">
              <IonCol size="4">
                <img
                  style={thumbnail}
                  src="https://wallpaperaccess.com/full/6295120.jpg"
                />
              </IonCol>
              <IonCol size="8">
                <IonRow>{patient.patient}</IonRow>
                <IonRow>{patient.patient}</IonRow>
                {/* description? */}
              </IonCol>
              <IonLabel>{patient.patient}</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
      ))}
    </>
  )
}

export default PatientCard
