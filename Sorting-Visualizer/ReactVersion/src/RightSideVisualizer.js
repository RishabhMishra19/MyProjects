import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import SortingVisualizer from './SortingVisualizer'
import {changeSorting, changeSpeed, changeData} from './dataSlice'
import { executeSorting } from './utils'

const RightSideVisualizer = () => {
  const dataList = useSelector(state => state.data.dataList)
  const speed = useSelector(state => state.data.currentSpeed)
  const algo = useSelector(state => state.data.currentAlgo)
  const dispatch = useDispatch()
  const sorting = useSelector(state=>state.data.sorting)
  const handleOnclick = () => {
    if(sorting){
      dispatch(changeSpeed(speed===90 ? 91 : 90))
    }
    else{
      executeSorting(dataList,algo).then(()=>dispatch(changeSorting()))
    }
    dispatch(changeSorting())
  }

  return (
    <div style={{backgroundColor:'rgba(1,1,1,0.9)',flex:1,display:'flex',flexDirection:'column',alignItems:'center',position:'relative'}}>
        <div onClick={handleOnclick} className='hoverClass' style={{borderRadius:'10px',backgroundColor:sorting ? 'red' : 'green',fontSize:'17px',color:'white',padding:'10px',position:'absolute',right:'3%',top:'1%',cursor:'pointer'}}>{sorting ? 'Stop' : 'Start'} Sorting</div>
        <div style={{color:'deeppink',fontSize:'30px',padding:'10px 0px'}}>Sorting Visualizer</div>
        <hr style={{width:'100%',borderColor:'deeppink'}}/>
        <div style={{padding:'2px 5px',color:'white'}}>This is a sorting algo visualizer where you can control speed by given buttons as well as you can control amount of data .here you may generate random data or may enter your own data and can see where were you making mistakes(if u r a beginner).</div>
        <SortingVisualizer />
    </div>
    )
}

export default RightSideVisualizer