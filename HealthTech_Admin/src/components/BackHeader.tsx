import { IonButtons, IonIcon } from '@ionic/react'
import { useHistory } from 'react-router'
import { chevronBackOutline, person } from 'ionicons/icons'

const BackHeader = () => {
  const history = useHistory()
  return (
    <>
      <IonButtons
        slot="start"
        onClick={() => history.goBack()}
        style={{ paddingLeft: '2%' }}
      >
        <IonIcon src={chevronBackOutline} />
      </IonButtons>
      <IonButtons
        slot="end"
        onClick={() => history.goBack()}
        style={{ padding: '2%' }}
      >
        <IonIcon src={person} />
      </IonButtons>
    </>
  )
}

export default BackHeader
