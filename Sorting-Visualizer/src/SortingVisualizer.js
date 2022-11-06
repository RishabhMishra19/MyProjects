import React,{useEffect} from 'react'
import {useSelector} from 'react-redux'

const SortingVisualizer = () => {
    const dataList = useSelector(state => state.data.dataList)
    const speed = useSelector(state => (state.data.currentSpeed/100)-0.01)
    const algo = useSelector(state => state.data.currentAlgo)
    const dataLmt = useSelector(state=>{
        let maxElement = Math.max(...(state.data.dataList))
        let tmp=[]
        for(let i=0;i-50<maxElement;i+=50){
            tmp.push(i)
        }
        if(state.data.currentAlgo==='MERGE SORT'){
            let more = tmp.length
            for(let i=0;i<more;i++){
                tmp.push(tmp[tmp.length-1]+50)
            }
        }
        tmp.reverse()
        return tmp;
    })

    useEffect(()=>{
        let barsWrapper = document.getElementById('barsWrapper')
        barsWrapper.innerHTML=""
        dataList.map((data,i)=>{
            let heightPercentage = 100*data/dataLmt[0]
            let widthPercentage = 100/dataList.length
            let div = document.createElement('div')
            div.setAttribute('id',`line-${i}`)
            div.innerText = data
            div.style.border = '1px solid black'
            div.style.backgroundColor='yellow'
            div.style.height=`${heightPercentage}%`
            div.style.width=`${widthPercentage}%`
            div.style.position='absolute'
            div.style.bottom='0%'
            div.style.left=`${widthPercentage*i}%`
            div.style.fontSize='0px'
            div.style.zIndex=0
            div.style.transition = `background-color ${(1-speed)*0.5}s, left ${(1-speed)*0.1}s, bottom ${(1-speed)*1}s`
            barsWrapper.appendChild(div)
        })
    },[dataList,speed,algo])
    
    return (
        <div style={{width:'90%',height:'80%',marginTop:'2%',display:'flex'}}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',textAlign:'center'}}>
                {
                    dataLmt.map((sdata,i)=>(
                        <div key={'num'+i} style={{color:'yellow',fontSize:'15px',fontWeight:'bold',padding:'0px 5px'}}>{sdata}</div>
                    ))
                }
            </div>
            <div id='barsWrapper' style={{flex:1,backgroundColor:'black',display:'flex',alignItems:'flex-end',width:'100%',position:'relative'}}></div>
        </div>
    )
}

export default SortingVisualizer