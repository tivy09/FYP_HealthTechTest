import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonViewWillEnter,
} from '@ionic/react'
import './style.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useHistory } from 'react-router'
import {
  checkmarkCircleOutline,
  cloudUploadOutline,
  home,
  power,
} from 'ionicons/icons'
import { hideNavBar } from '../../app/auth/navBarSlice'
import { useRef, useState } from 'react'
import './style.css'
import { userAPI } from '../../api/userApi'
import CustomFileInput from '../../components/CustomFileInput'
import { storeImageApi } from '../../api/storeImageApi'
import { logout } from '../../app/auth/authSlice'
import { useForm } from 'react-hook-form'

const imageContainer: React.CSSProperties = {
  backgroundColor: '#3880ff',
  width: '90%',
  maxWidth: '500px', // Set the maximum width here as per your requirement
  margin: '20px auto',
  borderRadius: '30px',
  display: 'block',
  overflow: 'auto',
}

const image: React.CSSProperties = {
  borderRadius: '50%',
  width: '150px',
  height: '150px',
  alignItems: 'center',
}

const inputContainer: React.CSSProperties = {
  padding: '2%',
  display: 'block',
  width: '85%',
  overflow: 'auto',
  borderRadius: '50px',
  backgroundColor: 'whitesmoke',
  maxWidth: '500px', // Set the maximum width here as per your requirement
  margin: '20px auto',
}

const buttonContainer: React.CSSProperties = {
  width: '85%',
  overflow: 'auto',
  margin: '20px auto',
}

const ionmodalButtonContainer: React.CSSProperties = {
  padding: '0%',
  display: 'grid',
  placeItems: 'center',
  overflow: 'auto',
}

const ProfilePage = () => {
  const [logoutAlert, setLogoutAlert] = useState<boolean>(false)
  const [previewImg, setPreviewImg] = useState<string>('')
  const [updateProfileModal, setUpdateProfileModal] = useState<boolean>(false)
  const [updatePasswordModal, setUpdatePasswordModal] = useState<boolean>(false)
  const [oldPassword, setOldPassword] = useState<string>('')
  const [updatePassword, setUpdatePassword] = useState<string>('')
  const [passwordMatch, setPasswordMatch] = useState<boolean>(false)
  const userInfo = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      username: userInfo.username,
      email: userInfo.email,
      phone_number: userInfo.phone_number,
      avatar_id: 1,
    },
  })
  const avatar =
    'https://static.vecteezy.com/system/resources/previews/014/212/681/original/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions-for-website-and-mobile-app-design-illustration-on-a-white-isolated-background-vector.jpg'

  //get user redux info

  //usehistory
  const history = useHistory()

  //set toast msg
  const [presentToast] = useIonToast()

  //slice function
  const dispatch = useAppDispatch()

  useIonViewWillEnter(() => {
    dispatch(hideNavBar())
    getUserInfo()
    // setPasswordMatch('')
  }, [])

  const handleOldPasswordInput = (event: CustomEvent) => {
    const newValue = event.detail.value as string // Extract the input value
    setOldPassword(newValue)
  }

  const checkOldPassword = async (password: string) => {
    const { data } = await userAPI.checkOldPassword(password)
    if (data.status === 706) {
      setPasswordMatch(true)
    }
  }

  const handleUpdatePasswordInput = (event: CustomEvent) => {
    const newValue = event.detail.value as string // Extract the input value
    setUpdatePassword(newValue)
  }

  const submitNewPassword = async (password: string) => {
    const { data } = await userAPI.updatePassword(password)
    if (data.status === 705) {
      presentToast({
        message: 'Password update successfully',
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
      setUpdatePasswordModal(false)
    }
  }

  const submitPasswordModalButton = () => {
    if (passwordMatch === true) {
      submitNewPassword(updatePassword)
    } else {
      checkOldPassword(oldPassword)
    }
  }

  //image ref
  const imageRef = useRef<HTMLInputElement>(null)

  //upload image method
  const onImageUploaderClicked = () => {
    // takePhoto();
    if (imageRef.current) {
      imageRef.current.click()
    }
  }

  //uplaod image api
  const uploadImage = async (image: any) => {
    try {
      const { data } = await storeImageApi.storeImage(image)
      const avatarId = data.response.document_id
      if (data.status === 1999) {
        setValue('avatar_id', avatarId)
      } else {
        presentToast({
          message: data.message,
          duration: 1500,
          position: 'bottom',
          color: 'danger',
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const submitUpdateProfile = async (profileData: any) => {
    const payload = {
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      username: profileData.username,
      email: profileData.email,
      phone_number: profileData.phone_number,
      avatar_id: getValues('avatar_id'),
    }
    const { data } = await userAPI.updateUserInfo(payload)
    if (data.status === 704) {
      presentToast({
        message: data.message,
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
      getUserInfo()
      setUpdateProfileModal(false)
    } else {
      presentToast({
        message: data.message,
        duration: 1500,
        position: 'bottom',
        color: 'danger',
      })
    }
  }

  const getUserInfo = async () => {
    const { data } = await userAPI.getInfoDetail()
    if (data.status === 702) {
      presentToast({
        message: data.message,
        duration: 1500,
        position: 'bottom',
        color: 'success',
      })
    }
    const userData = data.response.user
    setValue('first_name', userData.first_name)
    setValue('last_name', userData.last_name)
    setValue('username', userData.username)
    setValue('email', userData.email)
    setValue('phone_number', userData.phone_number)
  }

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-text-center ion-padding">
            <IonCol size="1" onClick={() => history.push('/')}>
              <IonIcon src={home} />
            </IonCol>
            <IonCol size="10" className="ion-text-center">
              <IonTitle>Profile</IonTitle>
            </IonCol>
            <IonCol size="1">
              <IonIcon src={power} onClick={() => setLogoutAlert(true)} />{' '}
              {/* logout */}
            </IonCol>
          </IonRow>
        </IonGrid>
        <div style={imageContainer}>
          <IonRow className="ion-padding-top">
            <IonCol className="ion-text-center ">
              <img src={avatar} style={image} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center ion-padding">
              <IonLabel>
                <IonText style={{ fontSize: 'large' }} color={'light'}>
                  {userInfo.username}
                </IonText>
              </IonLabel>
            </IonCol>
          </IonRow>
        </div>

        <div style={inputContainer}>
          <IonRow>
            <IonCol
              size="4"
              className="ion-text-center"
              style={{ paddingTop: '5%' }}
            >
              <IonLabel>
                <IonText color={'primary'}>First Name</IonText>
              </IonLabel>
            </IonCol>
            <IonCol size="8">
              <IonInput
                required
                value={getValues('first_name')}
                {...register('first_name')}
              />
            </IonCol>
          </IonRow>
        </div>

        <div style={inputContainer}>
          <IonRow>
            <IonCol
              size="4"
              className="ion-text-center"
              style={{ paddingTop: '5%' }}
            >
              <IonLabel>
                <IonText color={'primary'}>Last Name</IonText>
              </IonLabel>
            </IonCol>
            <IonCol size="8">
              <IonInput
                required
                value={getValues('last_name')}
                {...register('last_name')}
              />
            </IonCol>
          </IonRow>
        </div>

        <div style={inputContainer}>
          <IonRow>
            <IonCol
              size="4"
              className="ion-text-center"
              style={{ paddingTop: '5%' }}
            >
              <IonLabel>
                <IonText color={'primary'}>Username</IonText>
              </IonLabel>
            </IonCol>
            <IonCol size="8">
              <IonInput required value={getValues('username')} />
            </IonCol>
          </IonRow>
        </div>

        <div style={inputContainer}>
          <IonRow>
            <IonCol
              size="4"
              className="ion-text-center"
              style={{ paddingTop: '5%' }}
            >
              <IonLabel>
                <IonText color={'primary'}>Email</IonText>
              </IonLabel>
            </IonCol>
            <IonCol size="8">
              <IonInput required value={getValues('email')} />
            </IonCol>
          </IonRow>
        </div>

        <div style={inputContainer}>
          <IonRow>
            <IonCol
              size="4"
              className="ion-text-center"
              style={{ paddingTop: '5%' }}
            >
              <IonLabel>
                <IonText color={'primary'}>Phone No.</IonText>
              </IonLabel>
            </IonCol>
            <IonCol size="8">
              <IonInput required value={getValues('phone_number')} />
            </IonCol>
          </IonRow>
        </div>

        <div style={buttonContainer}>
          <IonButton
            shape="round"
            expand="full"
            type="submit"
            size="large"
            fill="outline"
            onClick={() => setUpdatePasswordModal(true)}
          >
            Update Password
          </IonButton>
          <IonButton
            shape="round"
            expand="full"
            type="submit"
            size="large"
            fill="solid"
            onClick={() => setUpdateProfileModal(true)}
          >
            Update Profile
          </IonButton>
        </div>

        <IonModal
          isOpen={updatePasswordModal}
          className="example-modal"
          showBackdrop={true}
          backdropDismiss={false}
        >
          <IonContent>
            <IonToolbar>
              <IonTitle className="ion-text-center">
                <IonText>Update Password</IonText>
              </IonTitle>
            </IonToolbar>
            <IonGrid className="ion-padding">
              <IonRow>
                <IonCol className="ion-text-center">
                  <IonLabel>
                    <IonText style={{ fontWeight: 'bold', fontSize: 'large' }}>
                      {' '}
                      Please enter your old password.{' '}
                    </IonText>
                  </IonLabel>
                </IonCol>
              </IonRow>

              <div style={inputContainer}>
                <IonRow>
                  <IonCol className="ion-text-center">
                    <IonInput
                      value={'password'}
                      disabled={passwordMatch === true}
                      onIonChange={handleOldPasswordInput}
                    />
                  </IonCol>
                </IonRow>
              </div>

              {passwordMatch === true && (
                <>
                  <IonRow className="ion-no-padding">
                    <IonCol className="ion-no-padding ion-text-center">
                      <IonIcon src={checkmarkCircleOutline} color="success" />{' '}
                      &nbsp;
                      <IonText color={'success'}>Old Password Verified</IonText>
                    </IonCol>
                  </IonRow>
                  <div style={inputContainer}>
                    <IonRow>
                      <IonCol className="ion-text-center">
                        <IonInput
                          placeholder="enter your new password here"
                          onIonChange={handleUpdatePasswordInput}
                        />
                      </IonCol>
                    </IonRow>
                  </div>
                </>
              )}

              <div style={ionmodalButtonContainer}>
                <IonButton
                  shape="round"
                  type="submit"
                  size="large"
                  onClick={() => {
                    submitPasswordModalButton()
                  }}
                >
                  Submit
                </IonButton>
                <IonRow>
                  <IonCol>
                    <IonText
                      color={'primary'}
                      onClick={() => {
                        setUpdatePasswordModal(false)
                      }}
                    >
                      Cancel
                    </IonText>
                  </IonCol>
                </IonRow>
              </div>
            </IonGrid>
          </IonContent>
        </IonModal>

        <IonModal
          isOpen={updateProfileModal}
          className="profile-modal"
          showBackdrop={true}
          backdropDismiss={false}
        >
          <IonContent>
            <IonToolbar>
              <IonTitle color={'light'} className="ion-text-center">
                Update Profile
              </IonTitle>
            </IonToolbar>
            <form onSubmit={handleSubmit(submitUpdateProfile)}>
              <IonGrid className="ion-padding">
                <IonRow>
                  <IonCol className="ion-text-center">
                    <input
                      hidden
                      type="file"
                      // {...register('avatar_id', { required: true })}
                      ref={imageRef}
                      onChange={(e) => {
                        if (e.target.files) {
                          const objectUrl: any = URL.createObjectURL(
                            e.target.files[0],
                          )
                          uploadImage(e.target.files[0])
                          setPreviewImg(objectUrl)
                        }
                      }}
                      name="image"
                    />

                    {/* mine */}
                    <CustomFileInput
                      onClick={onImageUploaderClicked}
                      className="ion-justify-content-center ion-align-items-center ion-flex-col"
                    >
                      <>
                        {previewImg ? (
                          <div
                            style={{
                              objectFit: 'cover',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              content: 'center',
                            }}
                          >
                            <img
                              style={{
                                objectFit: 'cover',
                                width: '100%',
                              }}
                              src={previewImg}
                            />
                          </div>
                        ) : (
                          <div
                            style={{
                              paddingTop: '15%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              content: 'center',
                            }}
                          >
                            <IonIcon
                              color="medium"
                              icon={cloudUploadOutline}
                              size="large"
                            />
                          </div>
                        )}
                      </>
                    </CustomFileInput>
                  </IonCol>
                </IonRow>

                <div style={inputContainer}>
                  <IonRow>
                    <IonCol
                      size="4"
                      className="ion-text-center"
                      style={{ paddingTop: '5%' }}
                    >
                      <IonLabel>
                        <IonText color={'primary'}>Username</IonText>
                      </IonLabel>
                    </IonCol>
                    <IonCol size="8">
                      <IonInput
                        required
                        value={getValues('username')}
                        {...register('username', { required: true })}
                      />
                    </IonCol>
                  </IonRow>
                </div>

                <div style={inputContainer}>
                  <IonRow>
                    <IonCol
                      size="4"
                      className="ion-text-center"
                      style={{ paddingTop: '5%' }}
                    >
                      <IonLabel>
                        <IonText color={'primary'}>First Name</IonText>
                      </IonLabel>
                    </IonCol>
                    <IonCol size="8">
                      <IonInput
                        required
                        value={getValues('first_name')}
                        {...register('first_name', { required: true })}
                      />
                    </IonCol>
                  </IonRow>
                </div>

                <div style={inputContainer}>
                  <IonRow>
                    <IonCol
                      size="4"
                      className="ion-text-center"
                      style={{ paddingTop: '5%' }}
                    >
                      <IonLabel>
                        <IonText color={'primary'}>Last Name</IonText>
                      </IonLabel>
                    </IonCol>
                    <IonCol size="8">
                      <IonInput
                        required
                        value={getValues('last_name')}
                        {...register('last_name', { required: true })}
                      />
                    </IonCol>
                  </IonRow>
                </div>

                <div style={inputContainer}>
                  <IonRow>
                    <IonCol
                      size="4"
                      className="ion-text-center"
                      style={{ paddingTop: '5%' }}
                    >
                      <IonLabel>
                        <IonText color={'primary'}>Email</IonText>
                      </IonLabel>
                    </IonCol>
                    <IonCol size="8">
                      <IonInput
                        required
                        value={getValues('email')}
                        {...register('email', { required: true })}
                      />
                    </IonCol>
                  </IonRow>
                </div>

                <div style={inputContainer}>
                  <IonRow>
                    <IonCol
                      size="4"
                      className="ion-text-center"
                      style={{ paddingTop: '5%' }}
                    >
                      <IonLabel>
                        <IonText color={'primary'}>Phone No.</IonText>
                      </IonLabel>
                    </IonCol>
                    <IonCol size="8">
                      <IonInput
                        required
                        value={getValues('phone_number')}
                        {...register('phone_number', { required: true })}
                      />
                    </IonCol>
                  </IonRow>
                </div>

                <div style={ionmodalButtonContainer}>
                  <IonButton shape="round" type="submit" size="large">
                    Submit
                  </IonButton>
                  <IonRow>
                    <IonCol>
                      <IonText
                        color={'primary'}
                        onClick={() => {
                          setUpdateProfileModal(false)
                        }}
                      >
                        Cancel
                      </IonText>
                    </IonCol>
                  </IonRow>
                </div>
              </IonGrid>
            </form>
          </IonContent>
        </IonModal>
        {/* logout  */}
        <IonAlert
          isOpen={logoutAlert}
          header="Are you sure you want to logout?"
          subHeader="You might need to sign in again for detail"
          buttons={[
            {
              text: 'Cancel',
              handler: () => {
                setLogoutAlert(false)
              },
            },
            {
              text: 'Logout',
              handler: () => {
                dispatch(logout())
              },
            },
          ]}
        ></IonAlert>
      </IonContent>
    </IonPage>
  )
}
export default ProfilePage
