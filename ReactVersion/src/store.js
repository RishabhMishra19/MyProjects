import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './dataSlice'

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store