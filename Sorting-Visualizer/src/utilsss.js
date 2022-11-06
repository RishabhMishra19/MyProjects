const swapBarsIfNeeded = (barId1,barId2,next) => {
    console.log('swap')
    const bar1 = document.getElementById(barId1)
    const bar2 = document.getElementById(barId2)
    /*
    process
    first set z index of bar1 as 10 and of bar2 as 5
    then move bar1 horizontaly to position of bar2
    then move bar2 horizontaly to potition of bar1
    then swap their ids
    add transitions then do delays and so on
    */
    const barLeft1 = bar1.style.left
    const barLeft2 = bar2.style.left
    const swapNeeded = parseInt(bar1.innerText) > parseInt(bar2.innerText)
    bar1.style.zIndex = 10
    bar2.style.zIndex = 5
    bar1.addEventListener('transitionend',function handler(e){
        let propertyName = e.propertyName
        let propertyValue = e.target.style[propertyName]
        if(propertyName==='background-color' && propertyValue==='blue'){
            //means need to swap if needed
            if(swapNeeded) bar1.style.left = barLeft2
            else bar1.style.backgroundColor = 'yellow'
        }
        else if(propertyName==='left'){
            //means swap took place
            bar1.style.backgroundColor = 'yellow'
        }
        else{
            //means this swapIfNeededis done and bar are at final position with final colors
            e.target.removeEventListener('transitionend',handler)
        }
    })
    bar2.addEventListener('transitionend',function handler(e){
        let propertyName = e.propertyName
        let propertyValue = e.target.style[propertyName]
        if(propertyName==='background-color' && propertyValue==='blue'){
            //means need to swap if needed
            if(swapNeeded) {
                bar2.style.left = barLeft1
                bar1.id = 'bar1'
                bar2.id = 'bar2'
                bar1.id = barId2
                bar2.id = barId1
                bar1.zIndex=0
                bar2.zIndex=0
            }
            else bar2.style.backgroundColor = 'yellow'
        }
        else if(propertyName==='left'){
            //means swap took place
            bar2.style.backgroundColor = 'yellow'
        }
        else{
            //means this swapIfNeededis done
            e.target.removeEventListener('transitionend',handler)
            next()
        }
    })
    bar1.style.backgroundColor = 'blue'
    bar2.style.backgroundColor = 'blue'
}

const swapLeftProperty = (bar1,bar2) => {
    let tmp = bar1.style.left
    bar1.style.left = bar2.style.left
    bar2.style.left = tmp
}

const swapIds = (bar1,bar2) => {
    let tmp = bar1.id
    bar1.id = bar2.id
    bar2.id = tmp
}

const swapNums = (nums,i,j) => {
    console.log({name:'num',i,j})
    let tmp = nums[i]
    nums[i] = nums[j]
    nums[j] = tmp
}

const transition = (elm,changeObj) => {
    console.log([elm,changeObj])
    return new Promise((resolve,_)=>{
        elm.addEventListener('transitionend',function handler(e){
            e.target.removeEventListener('transitionend',handler)
            resolve()
        })
        Object.assign(elm.style,changeObj)
    })
} 

const swapBars = (barNum1,barNum2) => {
    const bar1 = document.getElementById(`line-${barNum1}`)
    const bar2 = document.getElementById(`line-${barNum2}`)
    let barLeft1 = bar1.style.left
    let barLeft2 = bar2.style.left
    return new Promise((resolve,_)=>{
        transition(bar1,{transition:'background-color 1s,left 1s',backgroundColor:'blue'})
        .then(() => transition(bar2,{transition:'background-color 1s,left 1s',backgroundColor:'blue'}))
        .then(() => transition(bar1,{left:barLeft2}))
        .then(() => transition(bar2,{left:barLeft1}))
        .then(() => transition(bar1,{backgroundColor:'yellow'}))
        .then(() => transition(bar2,{backgroundColor:'yellow'}))
        .then(() => {
            bar1.style.transition = ''
            bar2.style.transition = ''
            swapIds(bar1,bar2)
            resolve()
        })
    })
}

const highlightBars = (barNum1,barNum2,unitTime,onCompletion) => {
    console.log({name:'hoi',barNum1,barNum2})
    const bar1 = document.getElementById(`line-${barNum1}`)
    const bar2 = document.getElementById(`line-${barNum2}`)
    bar1.addEventListener('transitionend',function handler(e){
        console.log('first event listener')
        e.target.removeEventListener('transitionend',handler)
        bar2.addEventListener('transitionend',function handler(e){
            console.log('second event listener')
            e.target.removeEventListener('transitionend',handler)
            Object.assign(bar1.style,{backgroundColor:'yellow',transition:''})
            Object.assign(bar2.style,{backgroundColor:'yellow',transition:''})
            onCompletion()
        })
        Object.assign(bar2.style,{backgroundColor:'red',transition:`background-color ${unitTime}ms`})
    })
    Object.assign(bar1.style,{backgroundColor:'red',transition:`background-color ${unitTime}ms`})
}

export const bubbleSortRecursive = (data,itr,cur,unitTime) => {
    console.log({itr,cur,data})
    if(itr==data.length){
        for(let i=0;i<data.length;i++){
            document.getElementById(`line-${i+1}`).style.backgroundColor = 'green'
        }
    }
    else{
        highlightBars(cur,cur+1,unitTime,()=>{
            if(data[cur]>data[cur+1]){
                console.log('if')
                swapNums(data,cur,cur+1)
                swapBars(cur,cur+1,unitTime,()=>{
                    bubbleSortRecursive(data,cur==data.length-2 ? itr+1 : itr, cur==data.length-2 ? 0 : cur+1)
                })
            }
            else{
                console.log('else')
                bubbleSortRecursive(data,cur==data.length-2 ? itr+1 : itr, cur==data.length-2 ? 0 : cur+1)
            }
        })
    }
}



export const bubbleSort = ([...data],unitTime) => {
    swapBars(0,1)
    .then(()=>swapBars(1,2))
    .then(()=>swapBars(2,3))
    .then(()=>swapBars(3,4))

    // swapBars(document.getElementById('line-1'),document.getElementById('line-2'),unitTime,()=>{console.log('done')})
    // bubbleSortRecursive(data,0,0,unitTime)
    // for(let i=0;i<data.length-1;i++){
    //     highlightBars(document.getElementById(`line-${i+1}`),document.getElementById(`line-${i+2}`),unitTime,()=>{console.log('done')})
    // }
    // console.log(data,data.length)
    // for(let i=0;i<data.length;i++){
    //     for(let j=0;j<data.length-i-1;j++){
    //             let bar1 = document.getElementById(`line-${j+1}`)
    //             let bar2 = document.getElementById(`line-${j+2}`)
    //             bar1.style.backgroundColor = 'red'
    //             bar2.style.backgroundColor = 'red'
    //             if(data[j]>data[j+1]){
    //                 swapNums(data,j,j+1)
    //                 let interval = setInterval(()=>{},10)
    //                 swapBars(bar1,bar2,unitTime)
    //             }   
    //             else{
    //                 bar1.style.backgroundColor = 'yellow'
    //                 bar2.style.backgroundColor = 'yellow'
    //             }
    //     }
    // }
}

const selectionSortTransition = (barId1,barId2,barMinId,currentMin,next) => {
    console.log('selection')
    const bar1 = document.getElementById(barId1)
    const bar2 = document.getElementById(barId2)
    const barMin = document.getElementById(barMinId)
    bar1.addEventListener('transitionend',function handler(e){
        let propertyName = e.propertyName
        let propertyValue = e.target.style[propertyName]
        if(propertyName==='background-color' && propertyValue==='purple'){
            //means it is just been highlighted
            bar1.style.backgroundColor = 'yellow'
        }
        else{
            //means it is being processed and now next transition will happen
            e.target.removeEventListener('transitionend',handler)
        }
    })
    bar2.addEventListener('transitionend',function handler(e){
        let propertyName = e.propertyName
        let propertyValue = e.target.style[propertyName]
        if(propertyName==='background-color' && propertyValue==='purple'){
            //means it is just been highlighted
            bar2.style.backgroundColor = 'yellow'
            console.log('if')
        }
        else{
            //means it is being processed and now next transition will happen
            e.target.removeEventListener('transitionend',handler)
            if(currentMin){
                console.log({barMin,barMinId})
                if(barMin) barMin.style.backgroundColor='yellow'
                bar2.style.backgroundColor='red'
            }
            console.log('next else')
            next()
        }
    })
    bar1.style.backgroundColor = 'purple'
    bar2.style.backgroundColor = 'purple'
}

export const executeBubbleSort = (data) => {
    let transitions = []
    for(let i=0;i<data.length-1;i++){
        for(let j=0;j<data.length-1-i;j++){
            transitions.push([j+1,j+2])
        }
    }
    swapBarsIfNeeded('line-1','line-2',()=>{console.log('done')})
    // executeTransitions(transitions,()=>{
    //     for(let i=0;i<data.length;i++){
    //         document.getElementById(`line-${i+1}`).style.backgroundColor='green'
    //     }
    // })
}

export const executeInsertionSort = (datat) => {
    let transitions = []
    let data = [...datat]
    for(let i=1;i<data.length;i++){
        let j=i;
        transitions.push([j,j+1])
        while(j>0 && data[j]<data[j-1]){
            let tmp = data[j]
            data[j] = data[j-1]
            data[j-1] = tmp
            j--
            if(j>0 && data[j]<data[j-1]) transitions.push([j,j+1])
        }
    }
    executeTransitions(transitions,()=>{
        for(let i=0;i<data.length;i++){
            document.getElementById(`line-${i+1}`).style.backgroundColor='green'
        }
    })
}

export const executeSelectionSort = (datat) => {
    let transitions = []
    let data = [...datat]
    for(let i=0;i<data.length-1;i++){
        let j=i+1
        let min = -1
        for(;j<data.length;j++){
            if(data[j]<data[i]){
                if(min==-1){
                    transitions.push([i+1,j+1,min==-1 ? min : min+1,1])
                    min = j
                }
                else if(min!=-1 && data[min]>data[j]){
                    transitions.push([i+1,j+1,min==-1 ? min : min+1,1])
                    min = j
                }
                else{
                    transitions.push([i+1,j+1,min==-1 ? min : min+1,0])
                }
            }
            else{
                transitions.push([i+1,j+1,min==-1 ? min : min+1,0])
            }
        }
        if(min!=-1){
            transitions.push([i+1,min+1])
            let tmp = data[i]
            data[i] = data[min]
            data[min] = tmp
        }
    }
    console.log({data,transitions})
    executeSelectionTransitions(transitions,()=>{
        for(let i=0;i<data.length;i++){
            document.getElementById(`line-${i+1}`).style.backgroundColor='green'
        }
    })
}

const executeSelectionTransitions = (transitions,callback,i=0) => {
    if(i<transitions.length)    console.log(transitions[i])
    if(i==transitions.length) callback()
    else if(transitions[i].length==2) swapBarsIfNeeded(`line-${transitions[i][0]}`,`line-${transitions[i][1]}`,()=>executeSelectionTransitions(transitions,callback,i+1))
    else selectionSortTransition(`line-${transitions[i][0]}`,`line-${transitions[i][1]}`,`line-${transitions[i][2]}`,transitions[i][3],()=>executeSelectionTransitions(transitions,callback,i+1))
}

const executeTransitions = (transitions,callback,i=0) => {
    if(i==transitions.length) callback()
    else swapBarsIfNeeded(`line-${transitions[i][0]}`,`line-${transitions[i][1]}`,()=>executeTransitions(transitions,callback,i+1))
}

// export const turnAllGreen = (len) => {
//     return new Promise((resolve,_)=>{
//         if(len==0) resolve()
//         else{
//             changeBackgroundColor(len-1,'green')
//             .then(()=>turnAllGreen(len-1))
//             .then(()=>resolve())
//         }
//     })
// }

// export const bSort = (data,i,len) => {
//     return new Promise((resolve,_)=>{
//         if(len==0){
//             turnAllGreen(data.length)
//             .then(()=>resolve())
//         }
//         else if(i==len-1){
//             changeBackgroundColor(i,'purple')
//             .then(()=>bSort(data,0,len-1))
//             .then(()=>resolve())
//         }
//         else{
//             highLightBars(i,i+1)
//             .then(()=>{
//                 if(data[i]>data[i+1]){
//                     swapNums(data,i,i+1)
//                     return swapBars(i,i+1)
//                 }
//             })
//             .then(()=>bSort(data,i+1,len))
//             .then(()=>resolve())
//         }
//     })
// }

// export const sSort = (data,i,cur,min) => {
//     return new Promise((resolve,_)=>{
//         if(cur==data.length-1){
//             resolve()
//         }
//         else{
//             if(min!=-1) changeBackgroundColor(min,'purple')
//             if(i==data.length){
//                 if(min!=-1){
//                     swapNums(data,min,cur)
//                     swapBars(min,cur)
//                     .then(()=>changeBackgroundColor(min,'yellow'))
//                     .then(()=>sSort(data,cur+2,cur+1,-1))
//                     .then(()=>resolve())
//                 }
//                 else{
//                     sSort(data,cur+2,cur+1,-1)
//                     .then(()=>resolve())
//                 }
//             }
//             else{
//                 highLightBars(i,cur)
//                 .then(()=>{
//                     if(min==-1 && data[i]<data[cur]){
//                         changeBackgroundColor(i,'purple')
//                         .then(()=>sSort(data,i+1,cur,i))
//                         .then(()=>resolve())
//                     }
//                     else if(data[min]>data[i]){
//                         changeBackgroundColor(min,'yellow')
//                         .then(()=>changeBackgroundColor(i,'purple'))
//                         .then(()=>sSort(data,i+1,cur,i))
//                         .then(()=>resolve())
//                     }
//                     else{
//                         sSort(data,i+1,cur,min)
//                         .then(()=>resolve())
//                     }
//                 })
//             }
//         }
//     })
// }