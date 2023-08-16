import { IonButtons, IonIcon } from '@ionic/react'
import { useHistory } from 'react-router'
import { chevronBackOutline } from 'ionicons/icons'

const BackHeader = () => {
  const history = useHistory()
  return (
    <IonButtons
      slot="start"
      onClick={() => history.goBack()}
      style={{ paddingLeft: '2%' }}
    >
      <IonIcon src={chevronBackOutline} />
    </IonButtons>
  )
}

export default BackHeader
