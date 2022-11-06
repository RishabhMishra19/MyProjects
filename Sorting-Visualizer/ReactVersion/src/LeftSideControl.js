import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {changeAlgo, changeData, changeSpeed, changeSize, randomData, changeDataString} from './dataSlice'

const LeftSideControl = () => {
    const dispatch = useDispatch();
    const state = useSelector(currentState => currentState.data);

    const processData = (dataString) => {
        let currentData  = []
        for(let i=0;i<dataString.length;i++){
            if(dataString[i]<'0' || dataString[i]>'9'){
                if(dataString[i]!=' '){
                    alert('Incorrect Data Enter space seperated positive numbers between (1,1000)!');
                    return currentData;
                }
            }
        }
        let dataStringList = dataString.split(' ');
        if(dataStringList.length<state.minSize || dataStringList.length>state.maxSize){
            alert(`Incorrect Data The Size of List Must lie between (${state.minSize},${state.maxSize})!`);
            return currentData;
        }
        for(let i=0;i<dataStringList.length;i++){
            currentData.push(parseInt(dataStringList[i]));
        }
        for(let i=0;i<currentData.length;i++){
            if(currentData[i]<1 || currentData[i]>1000){
                alert(`Incorrect Data The value of Each element Must lie between (1,1000)!`);
                return currentData;
            }
        }
        return currentData;
    }

    const onRandom = (size) => {
	    let dataList=[];
        for(let i=0;i<size;i++){
            let randomNum = 1 + Math.floor(Math.random()*10000)%(1000);
            dataList.push(randomNum);
        }
        dispatch(randomData({dataList,dataString:dataList.join(' ')}))
    }

    const onSubmit = () => {
        let processedData = processData(state.dataString.trim());
        dispatch(changeData({dataList:processedData}))
    }


    return (
        <div style={{position:'relative',backgroundColor:'rgba(1,1,1,1)',width:'400px',display:'flex',flexDirection:'column',alignItems:'center'}}>
            {state.sorting && <div style={{position:'absolute',height:'100%',width:'100%',backgroundColor:'rgba(1,1,1,0.3)'}}></div>}
            <div style={{color:'green',fontSize:'30px',padding:'10px 0px'}}>Control Panel</div>
            <hr style={{width:'100%',borderColor:'green'}}/>
            <div style={{width:'100%',flex:1,display:'flex',flexDirection:'column'}}>
                <SingleController 
                    minValue={state.minSize}
                    maxValue={state.maxSize}
                    currentValue={state.currentSize}
                    name = 'Size'
                    onChange={newValue => {dispatch(changeSize(newValue));onRandom(newValue)}}
                 />
                 <SingleController 
                    minValue={state.minSpeed}
                    maxValue={state.maxSpeed}
                    currentValue={state.currentSpeed}
                    name = 'Speed'
                    onChange={newValue => dispatch(changeSpeed(newValue))}
                 />
                <AlgoController 
                    name={'Algo'}
                    currentValue = {state.currentAlgo}
                    options = {state.algoList}
                    onChange = {newValue => dispatch(changeAlgo(newValue))}
                />
                <DataController 
                    name={'Data'}
                    dataString = {state.dataString}
                    onChange = {newValue=>dispatch(changeDataString(newValue))}
                    onSubmit = {onSubmit}
                    onRandom = {()=>onRandom(state.currentSize)}
                />
            </div>
            <hr style={{width:'100%',borderColor:'orange'}}/>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',color:'orange',paddingBottom:'15px',paddingTop:'10px'}}>
                <div>Created By - Rishabh Mishra</div>
                <div>NIT Kurukshetra</div>
            </div>
        </div>
    )
}

const DataController = ({name,dataString,onChange,onSubmit,onRandom}) => (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1,width:'100%',}}>
        <div style={{display:'flex',color:'yellow',width:'90%',padding:'5px 10px',fontSize:'14px',textAlign:'center',marginBottom:'5px'}}>
            <div style={{color:'violet',fontSize:'25px',flex:1}}>{name}</div>
            <div className='hoverClass' style={{flex:1,margin:'0px 5px',fontSize:'15px',color:'white',borderRadius:'10px',backgroundColor:'green',cursor:'pointer',textAlign:'center',paddingTop:'5px'}} onClick={onSubmit}>Submit</div>
            <div className='hoverClass' style={{flex:1,margin:'0px 5px',fontSize:'15px',color:'white',borderRadius:'10px',backgroundColor:'green',cursor:'pointer',textAlign:'center',paddingTop:'5px'}} onClick={onRandom}>Random</div>
        </div>
        <textarea type='text' value={dataString} onChange={e=>onChange(e.target.value)} style={{borderRadius:'10px',width:'85%',height:'80%',backgroundColor:'transparent',border:'0.5px solid white',outline:'none',color:'yellow',fontSize:'13px',padding:'10px'}} />
    </div>
)

const AlgoController = ({name,currentValue,onChange,options}) => (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',paddingTop:'10px'}}>
        <div style={{display:'flex',width:'90%',justifyContent:'center',flexWrap:'wrap'}}>
            {
                options.map((option,i)=>(
                    <div className='hoverClass' onClick={()=>onChange(option)} key={i+'option'} style={{fontSize:'13px',borderRadius:'10px',padding:'5px 10px',margin:'5px',backgroundColor:option===currentValue ? 'green' : 'yellow',color:option!=currentValue ? 'green' : 'yellow',marginBottom:'10px',cursor:'pointer'}}>
                        {option}
                    </div>
                ))
            }
        </div>
        <div style={{display:'flex',color:'yellow',width:'90%',padding:'5px 10px',fontSize:'14px',textAlign:'center'}}>
            <div style={{flex:1,fontSize:'16px'}}>Algo</div>
            <div style={{flex:1}}>:</div>
            <div style={{flex:1}}>{currentValue}</div>
        </div>
        <hr style={{width:'90%',borderColor:'gray',marginTop:'15px'}} />
    </div>
)

const SingleController = ({minValue,maxValue,currentValue,onChange,name}) => (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',paddingTop:'10px'}}>
        <input type="range" min={minValue} max={maxValue} value={currentValue} onChange={e=>onChange(e.target.value)} style={{width:'80%',margin:'10px 10px'}}/>
        <div style={{display:'flex',color:'yellow',width:'90%',padding:'5px 10px',fontSize:'17px',textAlign:'center'}}>
            <div style={{flex:1}}>{name}</div>
            <div style={{flex:1}}>:</div>
            <div style={{flex:1}}>{currentValue}</div>
        </div>
        <hr style={{width:'90%',borderColor:'gray',marginTop:'15px'}} />
    </div>
)

export default LeftSideControl