import {
  IonTabs,
  IonTabBar,
  IonRouterOutlet,
  IonIcon,
  IonTabButton,
  IonText,
  IonFab,
  IonFabButton,
  IonFabList,
} from '@ionic/react'
import { Redirect, Route, Switch, useHistory } from 'react-router'
import ProtectedRoute from '../../components/ProtectedRoute'
import HomePage from '../../pages/tabs/HomePage'
import SettingPage from '../../pages/tabs/SettingPage'
import PatientPage from '../../pages/main/patient/PatientPage'
import AddPatientPage from '../../pages/main/patient/AddPatientPage'
import EditPatientDetailPage from '../../pages/main/patient/EditPatientDetailPage'
import DoctorPage from '../../pages/main/doctor/DoctorPage'
import AddDoctorPage from '../../pages/main/doctor/AddDoctorPage'
import DepartmentPage from '../../pages/main/department/DepartmentPage'
import EditDepartmentDetailPage from '../../pages/main/department/EditDepartmentDetailPage'
import AddNewDepartmentPage from '../../pages/main/department/AddNewDepartmentPage'
import EditDoctorDetailPage from '../../pages/main/doctor/EditDoctorDetailPage'
import DoctorDetailPage from '../../pages/main/doctor/DoctorDetailPage'
import NursePage from '../../pages/main/nurse/NursePage'
import AddNursePage from '../../pages/main/nurse/AddNursePage'
import EditNurseDetailPage from '../../pages/main/nurse/EditNurseDetailPage'
import NurseDetailPage from '../../pages/main/nurse/NurseDetailPage'
import UpdatePasswordPage from '../../pages/tabs/UpdatePasswordPage'
import MedCatListPage from '../../pages/main/medicineCategory/MedCatListPage'
import MedicineListPage from '../../pages/main/medicine/MedicineListPage'
import MedicineDetailPage from '../../pages/main/medicine/MedicineDetailPage'
import AddMedicinePage from '../../pages/main/medicine/AddMedicinePage'
import EditMedicineDetailPage from '../../pages/main/medicine/EditMedicineDetailPage'
import AppointmentPage from '../../pages/main/appointment/AppointmentPage'
import { calendar, home, personCircleOutline, time } from 'ionicons/icons'
import TimetablePage from '../../pages/main/timetable/TimetablePage'
import AppointmentDetailPage from '../../pages/main/appointment/AppointmentDetailPage'
import { userInfo } from 'os'
import { useAppSelector } from '../../app/hooks'

const PrivateRoutes = () => {
  const navInfo = useAppSelector((state) => state.navBar)
  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Switch>
            <IonRouterOutlet>
              <ProtectedRoute exact path="/home" component={HomePage} />
              <ProtectedRoute exact path="/setting" component={SettingPage} />
              <ProtectedRoute
                exact
                path="/updatePassword"
                component={UpdatePasswordPage}
              />

              {/* medicine route */}
              <ProtectedRoute
                exact
                path="/medicine"
                component={MedicineListPage}
              />
              <ProtectedRoute
                exact
                path="/medicine/detail/:id"
                component={MedicineDetailPage}
              />
              <ProtectedRoute
                exact
                path="/medicine/add"
                component={AddMedicinePage}
              />
              <ProtectedRoute
                exact
                path="/medicine/edit/:id"
                component={EditMedicineDetailPage}
              />

              {/* medicine category */}
              <ProtectedRoute
                exact
                path="/medicineCategory"
                component={MedCatListPage}
              />

              {/* patient route */}
              <ProtectedRoute exact path="/patient" component={PatientPage} />
              <ProtectedRoute
                exact
                path="/patient/add"
                component={AddPatientPage}
              />
              <ProtectedRoute
                exact
                path="/patient/edit/:id"
                component={EditPatientDetailPage}
              />

              {/* doctor route */}
              <ProtectedRoute exact path="/doctor" component={DoctorPage} />
              <ProtectedRoute
                exact
                path="/doctor/add"
                component={AddDoctorPage}
              />
              <ProtectedRoute
                exact
                path="/doctor/edit/:id"
                component={EditDoctorDetailPage}
              />
              <ProtectedRoute
                exact
                path="/doctor/detail/:id"
                component={DoctorDetailPage}
              />

              {/* nurse route */}
              <ProtectedRoute exact path="/nurse" component={NursePage} />
              <ProtectedRoute
                exact
                path="/nurse/add"
                component={AddNursePage}
              />
              <ProtectedRoute
                exact
                path="/nurse/edit/:id"
                component={EditNurseDetailPage}
              />
              <ProtectedRoute
                exact
                path="/nurse/detail/:id"
                component={NurseDetailPage}
              />

              {/* department route */}
              <ProtectedRoute
                exact
                path="/department"
                component={DepartmentPage}
              />
              <ProtectedRoute
                exact
                path="/department/add"
                component={AddNewDepartmentPage}
              />
              <ProtectedRoute
                exact
                path="/department/edit/:id"
                component={EditDepartmentDetailPage}
              />

              {/* appointment  */}
              <ProtectedRoute
                exact
                path="/appointment"
                component={AppointmentPage}
              />

              <ProtectedRoute
                exact
                path="/appointment/:id"
                component={AppointmentDetailPage}
              />

              {/* timetable */}
              <ProtectedRoute
                exact
                path="/timetable"
                component={TimetablePage}
              />

              <Route>
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
          </Switch>
        </IonRouterOutlet>

        {navInfo.showNav === true ? (
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
              <IonText>Home</IonText>
            </IonTabButton>

            <IonTabButton tab="timetable" href="/timetable">
              <IonIcon icon={calendar} />
              <IonText>Timetable</IonText>
            </IonTabButton>

            <IonTabButton>{/* Add the FAB button */}</IonTabButton>

            <IonTabButton tab="appointment" href="/appointment">
              <IonIcon icon={time} />
              <IonText>Appointment</IonText>
            </IonTabButton>

            <IonTabButton tab="timetable" href="/timetable">
              <IonIcon icon={calendar} />
              <IonText>Timetable</IonText>
            </IonTabButton>
          </IonTabBar>
        ) : (
          <IonTabBar></IonTabBar>
        )}
      </IonTabs>
      {navInfo.showNav === true && (
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton>
            <IonIcon icon={personCircleOutline} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton color="primary" href="/doctor">
              <IonText className="ion-padding">Doctor</IonText>
            </IonFabButton>
            <IonFabButton color="primary" href="/patient">
              <IonText className="ion-padding">Patient</IonText>
            </IonFabButton>
            <IonFabButton color="primary" href="/nurse">
              <IonText className="ion-padding">Nurse</IonText>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      )}
    </>
  )
}

export default PrivateRoutes
