import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    maxSize: 500,
    minSize: 2,
    currentSize: 5,
    minSpeed: 1,
    maxSpeed: 100,
    currentSpeed: 90,
    algoList: ['MERGE SORT','QUICK SORT','BUBBLE SORT','SELECTION SORT','INSERTION SORT'],
    currentAlgo: 'MERGE SORT',
    dataString:'1 5 3 7 4',
    dataList: [1,5,3,7,4],
    sorting: false,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    changeSpeed: (state, action) => {
      state.currentSpeed = action.payload
    },
    changeSize: (state, action) => {
      state.currentSize = action.payload
    },
    changeAlgo: (state,action) => {
        state.currentAlgo = action.payload
    },
    changeDataString: (state,action) => {
        state.dataString = action.payload
    },
    changeData: (state,action) => {
        state.dataList = action.payload.dataList
        state.currentSize = action.payload.dataList.length
        state.dataString = action.payload.dataList.join(' ')
    },
    randomData: (state,action) => {
        state.dataList = action.payload.dataList
        state.dataString = action.payload.dataString
    },
    changeSorting: state => {
      state.sorting = !state.sorting
    }
  }
})

export default dataSlice.reducer
export const { changeAlgo, changeData, changeSpeed, changeSize, randomData, changeDataString, changeSorting } = dataSlice.actions