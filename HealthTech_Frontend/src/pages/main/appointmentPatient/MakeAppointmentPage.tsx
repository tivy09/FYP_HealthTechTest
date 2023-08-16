import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import { useHistory } from 'react-router'
import { LoadingState } from '../../../utils/types/types'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { appointmentAPI } from '../../../api/appointmentApi'
import moment from 'moment'
import './style.css'
import { useAppSelector } from '../../../app/hooks'

const MakeAppointmentPage = () => {
  //check auth state
  const auth = useAppSelector((state) => state.auth)

  //set option modal
  const [alertPrompt, setAlertPrompt] = useState<boolean>(false)

  //data loading
  const [loading, setLoading] = useState<LoadingState>('idle')

  //data loading
  const [loadingDoctor, setLoadingDoctor] = useState<LoadingState>('idle')

  //set toast msg
  const [presentToast] = useIonToast()

  //history - go to other page
  const history = useHistory()

  //department state
  const [departmentList, setDepartmentList] = useState<
    { id: number; name: string }[]
  >([])

  //doctor state
  const [doctorList, setDoctorList] = useState<{ id: number; name: string }[]>(
    [],
  )

  //doctor option state
  const [doctorRow, setDoctorRow] = useState<boolean>(false)

  //choosen date from calender
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString())

  //book appointment data
  const { register, setValue, getValues, handleSubmit } = useForm({
    defaultValues: {
      name: 'Patient',
      ic_no: 0,
      phone_number: 0,
      appointment_date: moment(new Date().toISOString()).format('YYYY-MM-DD'),
      appointment_time: moment(new Date().toISOString()).format('HH:mm'),
      department_id: 0,
      doctor_id: 0,
    },
  })
  //get department without token
  const allDepartment = async () => {
    const { data } = await appointmentAPI.getAllDepartment()
    setLoading('loading')
    const departments = data.response.departments
    if (data.status === 1201) {
      const extractedData: {
        id: number
        name: string
      }[] = departments.map((department: any) => ({
        id: department.id,
        name: department.name,
      }))
      if (extractedData) {
        setLoading('success')
        setDepartmentList([...extractedData])
      }
    }
  }

  //get department id
  const handleDepartmentValue = (event: CustomEvent) => {
    departmentList.map((department) => {
      if (department.id === event.detail.value) {
        setValue('department_id', department.id)
        setDoctorRow(true)
        departmentDoctor()
      }
    })
  }

  //get department id
  const handleDoctorId = (event: CustomEvent) => {
    doctorList.map((doctor) => {
      if (doctor.id === event.detail.value) {
        setValue('doctor_id', doctor.id)
      }
    })
  }

  //get department without token
  const departmentDoctor = async () => {
    const { data } = await appointmentAPI.getDepartmentDoctor(
      getValues('department_id'),
    )
    setLoadingDoctor('loading')
    const doctors = data.response.doctors
    if (data.status === 1201) {
      const extractedData: {
        id: number
        name: string
        image: string
      }[] = doctors.map((doctor: any) => ({
        id: doctor.id,
        name: doctor.name,
        image: doctor.images_preview,
      }))
      if (extractedData) {
        setLoadingDoctor('success')
        setDoctorList([...extractedData])
      }
    }
  }

  //handle appointment datetime
  const handleDateChange = (event: CustomEvent<any>) => {
    const selectedDateTime = event.detail.value
    setSelectedDate(selectedDateTime)
    setValue('appointment_date', moment(selectedDateTime).format('YYYY-MM-DD'))
    setValue('appointment_time', moment(selectedDateTime).format('HH:mm'))
  }

  // submit appointment
  const onSubmit = async () => {
    if (getValues('department_id') === 0) {
      presentToast({
        message: 'Please select a department',
        duration: 1500,
        position: 'middle',
        color: 'danger',
      })
    } else {
      const payload = {
        name: getValues('name'),
        ic_no: getValues('ic_no'),
        phone_number: getValues('phone_number'),
        appointment_date: getValues('appointment_date'),
        appointment_time: getValues('appointment_time'),
        department_id: getValues('department_id'),
        doctor_id: getValues('doctor_id'),
      }
      const { data } = await appointmentAPI.addAppointment(payload)
      if (data.status === 1552) {
        presentToast({
          message: data.message,
          duration: 1500,
          position: 'bottom',
          color: 'danger',
        })
      }
      setAlertPrompt(true)
    }
  }

  useEffect(() => {
    allDepartment()
    return () => {}
  }, [])

  //handle page reload
  const handleReload = () => {
    window.location.reload()
  }

  //handle profile page button
  const goToProfile = () => {
    if (auth.is_auth === true) history.push('/home')
    else history.push('/login')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Book New Appointment</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonGrid>
            {/* patient name */}
            <IonRow>
              <IonCol>
                <IonItem
                  className="ion-border"
                  style={{ borderRadius: '20px' }}
                >
                  <IonLabel position="stacked" color={'primary'}>
                    Patient Name
                  </IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Patient Name"
                    required
                    {...register('name', { required: true })}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            {/* patient ic no */}
            <IonRow>
              <IonCol>
                <IonItem
                  className="ion-border"
                  style={{ borderRadius: '20px' }}
                >
                  <IonLabel position="stacked" color={'primary'}>
                    Patient IC No
                  </IonLabel>
                  <IonInput
                    type="number"
                    value={getValues('ic_no')}
                    required
                    {...register('ic_no', { required: true })}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            {/* patient phone number */}
            <IonRow>
              <IonCol>
                <IonItem
                  className="ion-border"
                  style={{ borderRadius: '20px' }}
                >
                  <IonLabel position="stacked" color={'primary'}>
                    Patient Phone Number
                  </IonLabel>
                  <IonInput
                    type="text"
                    required
                    value={getValues('phone_number')}
                    placeholder="Patient Phone Number"
                    {...register('phone_number', { required: true })}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            {/* appointment date */}
            <IonRow>
              <IonCol>
                <IonItem
                  lines="none"
                  className="ion-border"
                  style={{ borderRadius: '20px' }}
                >
                  <IonLabel>Appointment Date & Time</IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
            {/* appointmrent time */}
            <IonRow>
              <IonCol>
                <IonDatetime
                  // displayFormat="DD/MM/YYYY HH:mm"
                  placeholder="Select Date and Time"
                  onIonChange={handleDateChange}
                  value={selectedDate}
                />
              </IonCol>
            </IonRow>
            {/* department */}
            <IonRow>
              <IonCol>
                <IonItem
                  className="ion-border"
                  style={{ borderRadius: '20px' }}
                >
                  <IonLabel>Department</IonLabel>
                  <IonSelect onIonChange={handleDepartmentValue}>
                    {departmentList &&
                      departmentList.map((department: any) => (
                        <IonSelectOption
                          key={department.id}
                          value={department.id}
                        >
                          {department.name}
                        </IonSelectOption>
                      ))}
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
            {/* if get department,call doctor api and ui */}
            {doctorRow === true && doctorList.length > 0 && (
              <IonRow>
                <IonCol>
                  <IonItem
                    className="ion-border"
                    style={{ borderRadius: '20px' }}
                  >
                    <IonLabel>Doctor</IonLabel>
                    <IonSelect onIonChange={handleDoctorId}>
                      {doctorList &&
                        doctorList.map((doctor: any) => (
                          <IonSelectOption key={doctor.id}>
                            {doctor.name}
                          </IonSelectOption>
                        ))}
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>
            )}

            {/* if doctor list length === 0 */}
            {doctorRow === true && doctorList.length === 0 && (
              <IonRow>
                <IonCol>
                  <IonItem
                    className="ion-border ion-text-center"
                    lines="none"
                    style={{ borderRadius: '20px' }}
                  >
                    <IonLabel>No Doctor Available</IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>
            )}
            <IonRow>
              <IonCol size="12">
                <IonButton
                  shape="round"
                  expand="full"
                  type="submit"
                  size="large"
                >
                  Register
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonButton
                  shape="round"
                  expand="full"
                  size="large"
                  fill="outline"
                  onClick={() => {
                    history.goBack()
                  }}
                >
                  Close
                </IonButton>
              </IonCol>
            </IonRow>
            {/* doctor */}
          </IonGrid>
        </form>
      </IonContent>

      {/* add appointment success */}
      <IonAlert
        isOpen={alertPrompt}
        header="Appointment has successfully added!"
        subHeader="Kindly wait for your turn!"
        // message="This is an alert!"
        buttons={[
          {
            text: 'View Profile',
            handler: () => {
              goToProfile()
            },
          },
          {
            text: 'View Appointment Status',
            handler: () => {
              handleReload()
            },
          },
          // {
          //   text: 'Close',
          //   handler: () => {
          //     setAlertPrompt(false)
          //     handleReload()
          //   },
          // },
        ]}
      ></IonAlert>
    </IonPage>
  )
}
export default MakeAppointmentPage
