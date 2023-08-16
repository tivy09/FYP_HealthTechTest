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
  IonSlide,
  IonSlides,
  IonText,
} from '@ionic/react'
import { add, addCircleOutline } from 'ionicons/icons'
import React from 'react'

const TimetablePage = () => {
  const divGreyRec: React.CSSProperties = {
    background: 'whitesmoke',
    width: '96%',
    maxWidth: '500px', // Set the maximum width here as per your requirement
    margin: '20px auto',
    borderRadius: '30px',
    display: 'block',
    overflow: 'auto',
  }

  const blueRec: React.CSSProperties = {
    background: 'lightblue',
    width: '93%',
    margin: '20px auto',
    borderRadius: '30px',
    display: 'block',
    overflow: 'auto',
  }

  const purpleRec: React.CSSProperties = {
    background: '#c381c9',
    width: '93%',
    margin: '20px auto',
    borderRadius: '30px',
    display: 'block',
    overflow: 'auto',
  }

  const greenRec: React.CSSProperties = {
    background: '#ffb3d1',
    width: '93%',
    margin: '20px auto',
    borderRadius: '30px',
    display: 'block',
    overflow: 'auto',
  }

  const bottomIcon: React.CSSProperties = {
    position: 'absolute',
    bottom: '10px',
  }
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="4">
              <IonButton
                shape="round"
                expand="full"
                size="default"
                fill="outline"
              >
                Dr Beckham
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton shape="round" type="submit">
                Dr Wong
              </IonButton>
            </IonCol>
            <IonCol size="2"></IonCol>
            <IonCol
              size="2"
              style={{
                paddingTop: '2%',
              }}
            >
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
                <IonIcon icon={add} color="light" size="large" />
              </IonBadge>
            </IonCol>
          </IonRow>
          <IonRow>
            <div style={divGreyRec}>
              <IonRow>
                <IonCol>
                  <IonSlides pager={true}>
                    <IonSlide>
                      <IonLabel>
                        <IonText style={{ fontSize: 'large' }}>Dec</IonText>
                      </IonLabel>
                    </IonSlide>
                    <IonSlide>
                      <IonLabel>
                        <IonText style={{ fontSize: 'large' }}>Nov</IonText>
                      </IonLabel>
                    </IonSlide>
                  </IonSlides>
                </IonCol>
              </IonRow>
              <div style={blueRec} className="ion-padding">
                <IonRow>
                  <IonCol>
                    <IonLabel>
                      <IonText>Tuesday</IonText>
                    </IonLabel>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <IonLabel>
                      <IonText style={{ fontWeight: 'bold', fontSize: '40px' }}>
                        14 DEC
                      </IonText>
                    </IonLabel>
                  </IonCol>
                  <IonCol size="3" style={{ borderLeft: '1px solid skyblue' }}>
                    <IonRow>3 pm</IonRow>
                    <IonRow>
                      <IonIcon style={bottomIcon} src={addCircleOutline} />
                    </IonRow>
                  </IonCol>
                  <IonCol size="3" style={{ borderLeft: '1px solid skyblue' }}>
                    <IonRow>4 pm</IonRow>
                    <IonRow>
                      <IonIcon style={bottomIcon} src={addCircleOutline} />
                    </IonRow>
                  </IonCol>
                </IonRow>
              </div>
              <div style={purpleRec} className="ion-padding">
                <IonRow>
                  <IonCol>
                    <IonLabel>
                      <IonText>Wednesday</IonText>
                    </IonLabel>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <IonLabel>
                      <IonText style={{ fontWeight: 'bold', fontSize: '40px' }}>
                        15 DEC
                      </IonText>
                    </IonLabel>
                  </IonCol>
                  <IonCol size="3" style={{ borderLeft: '1px solid #d44fe0' }}>
                    <IonRow>11 am</IonRow>
                    <IonRow>
                      <IonIcon style={bottomIcon} src={addCircleOutline} />
                    </IonRow>
                  </IonCol>
                  <IonCol size="3" style={{ borderLeft: '1px solid #d44fe0' }}>
                    <IonRow>12 pm</IonRow>
                    <IonRow>
                      <IonIcon style={bottomIcon} src={addCircleOutline} />
                    </IonRow>
                  </IonCol>
                </IonRow>
              </div>
              <div style={greenRec} className="ion-padding">
                <IonRow>
                  <IonCol>
                    <IonLabel>
                      <IonText>Wednesday</IonText>
                    </IonLabel>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <IonLabel>
                      <IonText style={{ fontWeight: 'bold', fontSize: '40px' }}>
                        16 DEC
                      </IonText>
                    </IonLabel>
                  </IonCol>
                  <IonCol size="3" style={{ borderLeft: '1px solid #ffffff' }}>
                    <IonRow>8 am</IonRow>
                    <IonRow>
                      <IonIcon style={bottomIcon} src={addCircleOutline} />
                    </IonRow>
                  </IonCol>
                  <IonCol size="3" style={{ borderLeft: '1px solid #ffffff' }}>
                    <IonRow>9 am</IonRow>
                    <IonRow>
                      <IonIcon style={bottomIcon} src={addCircleOutline} />
                    </IonRow>
                  </IonCol>
                </IonRow>
              </div>
            </div>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default TimetablePage
