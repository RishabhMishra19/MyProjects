import {highLightBars,swapBars,turnAllGreen,swapNums,changeBackgroundColor, shiftRange,mergeTransition,modifyIds} from './utils'

export const bSort = (data,i,len) => {
    return new Promise((resolve,_)=>{
        if(len==0){
            resolve()
        }
        else if(i==len-1){
            changeBackgroundColor(i,'purple')
            .then(()=>bSort(data,0,len-1))
            .then(()=>resolve())
        }
        else{
            highLightBars(i,i+1)
            .then(()=>{
                if(data[i]>data[i+1]){
                    swapNums(data,i,i+1)
                    return swapBars(i,i+1)
                }
            })
            .then(()=>bSort(data,i+1,len))
            .then(()=>resolve())
        }
    })
}

export const iSort = (data,i,cur) => {
    return new Promise((resolve,_)=>{
        if(cur==data.length){
            resolve()
        }
        else{
            changeBackgroundColor(cur,'purple')
            .then(()=>{
                if(i==0){
                    if(cur!=0){
                        changeBackgroundColor(cur,'yellow')
                        .then(()=>iSort(data,cur+1,cur+1))
                        .then(()=>resolve())
                    }
                    else{
                        iSort(data,cur+1,cur+1)
                        .then(()=>resolve())
                    }
                }
                else{
                    highLightBars(i,i-1)
                    .then(()=>{
                        if(data[i-1]>data[i]){
                            swapNums(data,i-1,i)
                            swapBars(i-1,i)
                            .then(()=>iSort(data,i-1,cur))
                            .then(()=>resolve())
                        }
                        else{
                            iSort(data,cur+1,cur+1)
                            .then(()=>resolve())
                        }
                    })
                }
            })
        }
    })
}

export const sSort = (data,i,cur,min) => {
        return new Promise((resolve,_)=>{
            if(cur==data.length-1){
                resolve()
            }
            else{
                if(min!=-1) changeBackgroundColor(min,'purple')
                if(i==data.length){
                    if(min!=-1){
                        swapNums(data,min,cur)
                        swapBars(min,cur)
                        .then(()=>changeBackgroundColor(min,'yellow'))
                        .then(()=>sSort(data,cur+2,cur+1,-1))
                        .then(()=>resolve())
                    }
                    else{
                        sSort(data,cur+2,cur+1,-1)
                        .then(()=>resolve())
                    }
                }
                else{
                    highLightBars(i,cur)
                    .then(()=>{
                        if(min==-1 && data[i]<data[cur]){
                            changeBackgroundColor(i,'purple')
                            .then(()=>sSort(data,i+1,cur,i))
                            .then(()=>resolve())
                        }
                        else if(data[min]>data[i]){
                            changeBackgroundColor(min,'yellow')
                            .then(()=>changeBackgroundColor(i,'purple'))
                            .then(()=>sSort(data,i+1,cur,i))
                            .then(()=>resolve())
                        }
                        else{
                            sSort(data,i+1,cur,min)
                            .then(()=>resolve())
                        }
                    })
                }
            }
        })
    }

const merge = (data,L1,R1,L2,R2) => {
    let l1=L1
    let l2=L2
    let r1=R1
    let r2=R2
    return new Promise((resolve,_)=>{
        shiftRange(L1,R1,'blue',50)
        .then(()=>shiftRange(L2,R2,'red',50))
        .then(()=>{
            let mod = []
            let transitions = []
            while(l1<=r1 && l2<=r2){
                if(data[l1]<data[l2]){
                    mod.push(data[l1])
                    transitions.push(l1)
                    l1++
                }
                else{
                    mod.push(data[l2])
                    transitions.push(l2)
                    l2++
                }
            }
            while(l1<=r1){
                mod.push(data[l1])
                transitions.push(l1)
                l1++
            }
            while(l2<=r2){
                mod.push(data[l2])
                transitions.push(l2)
                l2++
            }
            for(let i=L1;i<=R2;i++){
                data[i] = mod[i-L1]
            }
            mergeTransition(transitions,0,L1)
            .then(()=>modifyIds(transitions,L1,R2))
            .then(()=>resolve())
        })
    })
}

export const mSort = (data,l,r) => {
    return new Promise((resolve,_)=>{
        if(l>=r){
            resolve()
        }
        else{
            let mid = l+parseInt((r-l)/2)
            mSort(data,l,mid)
            .then(()=>mSort(data,mid+1,r))
            .then(()=>merge(data,l,mid,mid+1,r))
            .then(()=>resolve())
        }
    })
}

const partitionRecursive = (data,i,pIdx,idx) => {
    return new Promise((resolve,_)=>{
        if(i>pIdx){
            if(pIdx!=idx){
                swapNums(data,pIdx,idx)
                swapBars(pIdx,idx)
                .then(()=>changeBackgroundColor(idx,'yellow'))
                .then(()=>changeBackgroundColor(pIdx,'yellow'))
                .then(()=>resolve(idx))
            }
            else{
                resolve(idx)
            }
        }
        else{
            changeBackgroundColor(idx,'purple')
            .then(()=>changeBackgroundColor(pIdx,'red'))
            .then(()=>changeBackgroundColor(i,'red'))
            .then(()=>{
                if(data[i]<data[pIdx]){
                    if(i!=idx){
                        swapNums(data,i,idx)
                        swapBars(i,idx)
                        .then(()=>changeBackgroundColor(idx,'yellow'))
                        .then(()=>changeBackgroundColor(i,'yellow'))
                        .then(()=>changeBackgroundColor(pIdx,'yellow'))
                        .then(()=>partitionRecursive(data,i+1,pIdx,idx+1))
                        .then((IDX)=>resolve(IDX))
                    }
                    else{
                        changeBackgroundColor(i,'yellow')
                        .then(()=>changeBackgroundColor(pIdx,'yellow'))
                        .then(()=>partitionRecursive(data,i+1,pIdx,idx+1))
                        .then((IDX)=>resolve(IDX))
                    }
                }
                else{
                    changeBackgroundColor(i,'yellow')
                    .then(()=>changeBackgroundColor(pIdx,'yellow'))
                    .then(()=>partitionRecursive(data,i+1,pIdx,idx))
                    .then((IDX)=>resolve(IDX))
                }
            })
        }
    })
}

export const qSort = (data,l,r) => {
    return new Promise((resolve,_)=>{
        if(l>=r){
            resolve()
        }
        else{
            partitionRecursive(data,l,r,l)
            .then((pi)=>{
                qSort(data,l,pi-1)
                .then(()=>qSort(data,pi+1,r))
                .then(()=>resolve())
            })
        }
    })
}
