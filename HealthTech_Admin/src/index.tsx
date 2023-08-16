import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { factory } from './app/store'
import { IonSpinner } from '@ionic/react'
import { PersistGate } from 'redux-persist/integration/react'
const { store, persistor } = factory()

ReactDOM.render(
  // <React.StrictMode>
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // </React.StrictMode>,
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<IonSpinner />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister()
serviceWorkerRegistration.register({
  // skipWaiting: true,
  onSuccess: () => {
    console.log('success')
  },
  onUpdate: () => {
    console.log('updating')
  },
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
