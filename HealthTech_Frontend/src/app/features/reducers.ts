import { AnyAction, combineReducers } from 'redux'
import { RootState } from '../store'
import { Reducer } from '@reduxjs/toolkit'
import { Plugins } from '@capacitor/core'

//SlicePage
import authSlice from '../auth/authSlice'
import navBarSlice from '../auth/navBarSlice'

export const combinedReducer = combineReducers({
  auth:authSlice,
  navBar:navBarSlice,
})

export const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  // if (action.type === 'auth/logoutUser') {
  //   const { App } = Plugins;
  //   App.removeAllListeners();
  //   state = {} as RootState
  // }

  return combinedReducer(state, action)
}