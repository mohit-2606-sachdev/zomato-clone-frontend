 const reducer = (state,action )=>{
    if(action.type==='INCREMENT'){
        return state = state + action.payload
    }
    if(action.type==='DECREMENT'){
        return state = state - action.payload
    }
    if(action.type==='RESET'){
        return state = 0
    }
    return state
}

export default reducer