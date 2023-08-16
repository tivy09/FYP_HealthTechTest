import { IonText, IonRippleEffect } from '@ionic/react'
import { IonicReactProps } from '@ionic/react/dist/types/components/IonicReactProps'
import React from 'react'
import styles from './CustomFileInput.module.scss'

type Props = {
  children: Element | Element[] | JSX.Element[] | JSX.Element | string
  onClick: (event: React.MouseEvent) => void
} & IonicReactProps

const CustomFileInput = ({ children, className, onClick }: Props) => {
  return (
    <div
      onClick={(e) => onClick(e)}
      className={`ion-activatable ripple-parent ${className} ${styles.uploader}`}
    >
      {children}
      <IonRippleEffect></IonRippleEffect>
    </div>
  )
}

export default CustomFileInput
