export const isEmptyObj = (obj) => {
    if(Object.keys(obj).length === 0){
        return true
    }
    else{
        return false
    }
}

export const getCardId = (setId, number) => {
    return setId + "-" + number;
}