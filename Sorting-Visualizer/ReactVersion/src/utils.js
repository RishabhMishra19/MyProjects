import {bSort, iSort, mSort, sSort, qSort} from './algos'

const swapIds = (bar1,bar2) => {
    let tmp = bar1.id
    bar1.id = bar2.id
    bar2.id = tmp
}

export const swapNums = (nums,i,j) => {
    let tmp = nums[i]
    nums[i] = nums[j]
    nums[j] = tmp
}

export const transitionBar = (elm,changeObj) => {
    return new Promise((resolve,_)=>{
        elm.addEventListener('transitionend',function handler(e){
            e.target.removeEventListener('transitionend',handler)
            resolve()
        })
        Object.assign(elm.style,changeObj)
    })
} 

export const swapBars = (barNum1,barNum2) => {
    const bar1 = document.getElementById(`line-${barNum1}`)
    const bar2 = document.getElementById(`line-${barNum2}`)
    let barLeft1 = bar1.style.left
    let barLeft2 = bar2.style.left
    let barColor1 = bar1.style.backgroundColor
    let barColor2 = bar2.style.backgroundColor
    let audio = new Audio('/TransitionSound.mp3')
    return new Promise((resolve,_)=>{
        audio.play()
        transitionBar(bar1,{backgroundColor:'blue'})
        .then(() => transitionBar(bar2,{backgroundColor:'blue'}))
        .then(() => transitionBar(bar1,{left:barLeft2}))
        .then(() => transitionBar(bar2,{left:barLeft1}))
        .then(() => transitionBar(bar1,{backgroundColor:barColor2}))
        .then(() => transitionBar(bar2,{backgroundColor:barColor1}))
        .then(() => {
            audio.pause()
            swapIds(bar1,bar2)
            resolve()
        })
    })
}

export const highLightBars = (barNum1,barNum2) => {
    const bar1 = document.getElementById(`line-${barNum1}`)
    const bar2 = document.getElementById(`line-${barNum2}`)
    return new Promise((resolve,_)=>{
        transitionBar(bar1,{backgroundColor:'red'})
        .then(() => transitionBar(bar2,{backgroundColor:'red'}))
        .then(() => transitionBar(bar1,{backgroundColor:'yellow'}))
        .then(() => transitionBar(bar2,{backgroundColor:'yellow'}))
        .then(() => {
            resolve()
        })
    })
}

export const changeBackgroundColor = (barNum,color) => {
    const bar = document.getElementById(`line-${barNum}`)
    let audio = new Audio('/TransitionSound.mp3')
    return new Promise((resolve,_)=>{
        if(bar.style.backgroundColor==color){
            resolve()
        }
        else{
            audio.play()
            transitionBar(bar,{backgroundColor:color})
            .then(()=>{
                audio.play()
                resolve()
            })
        }
    })
}

export const shiftElmBottom = (barNum,color,bottomPercentage) => {
    const bar = document.getElementById(`line-${barNum}`)
    let audio = new Audio('/TransitionSound.mp3')
    return new Promise((resolve,_)=>{
        audio.play()
        transitionBar(bar,{backgroundColor:color,bottom:`${bottomPercentage}%`})
        .then(()=>{
            audio.pause()
            resolve()
        })
    })
}

export const shiftRange = (l,r,color,bottomPercentage) => {
    return new Promise((resolve,_)=>{
        if(l>r){
            resolve()
        }
        else{
            shiftElmBottom(l,color,bottomPercentage)
            .then(()=>shiftRange(l+1,r,color,bottomPercentage))
            .then(()=>resolve())
        }
    })
}

export const shiftElmBottomAndLeft = (barNum,color,bottomPercentage,leftPercentage) => {
    const bar = document.getElementById(`line-${barNum}`)
    let audio = new Audio('/TransitionSound.mp3')
    return new Promise((resolve,_)=>{
        audio.play()
        transitionBar(bar,{backgroundColor:color,bottom:`${bottomPercentage}%`,left:`${leftPercentage}%`})
        .then(()=>{
            audio.pause()
            resolve()
        })
    })
}

export const mergeTransition = (transitions,i,offset) => {
    return new Promise((resolve,_)=>{
        if(i==transitions.length){
            resolve()
        }
        else{
            let shiftBarNum = transitions[i]
            let shiftToPosition = i+offset
            let elm = document.getElementById(`line-${shiftBarNum}`)
            let widthStr = elm.style.width
            let widthNum = parseFloat(widthStr.substring(0,widthStr.length-1))
            let leftPercentage = widthNum*shiftToPosition
            shiftElmBottomAndLeft(shiftBarNum,'yellow',0,leftPercentage)
            .then(()=>mergeTransition(transitions,i+1,offset))
            .then(()=>resolve())
        }
    })
}

export const modifyIds = (transitions,l,r) => {
    return new Promise((resolve,_)=>{
        let bars = []
        for(let i=l;i<=r;i++){
            bars.push(document.getElementById(`line-${transitions[i-l]}`))
        }
        for(let i=0;i<bars.length;i++){
            bars[i].id = `line-${l+i}`
        }
        resolve()
    })
}

export const turnAllGreen = (len) => {
    return new Promise((resolve,_)=>{
        if(len==0) resolve()
        else{
            changeBackgroundColor(len-1,'green')
            .then(()=>turnAllGreen(len-1))
            .then(()=>resolve())
        }
    })
}

export const executeSorting = ([...data],algo) => {
    return new Promise((resolve,_)=>{
        switch(algo){
            case 'MERGE SORT':{
                mSort(data,0,data.length-1).then(()=>turnAllGreen(data.length)).then(()=>resolve())
                break;
            }
            case 'BUBBLE SORT':{
                bSort(data,0,data.length).then(()=>turnAllGreen(data.length)).then(()=>resolve())
                break;
            }
            case 'INSERTION SORT':{
                iSort(data,0,0).then(()=>turnAllGreen(data.length)).then(()=>resolve())
                break;
            }
            case 'SELECTION SORT':{
                sSort(data,1,0,-1).then(()=>turnAllGreen(data.length)).then(()=>resolve())
                break;
            }
            case 'QUICK SORT':{
                qSort(data,0,data.length-1).then(()=>turnAllGreen(data.length)).then(()=>resolve())
                break;
            }
            default : {
                console.log('Invalid Algo!!')
                resolve()
            }
        }
    })
}


