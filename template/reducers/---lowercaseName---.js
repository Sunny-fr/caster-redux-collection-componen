/* GENERATED WITH CASTER */
/* <%= uppercaseName %> REDUCER STRUCTURE */

const defaultModel = {
    metas: {loaded: false, fetching: false, valid: false, saving: false, deleting: false, forward: false},
    model: {}
}

const defaultState = {
    collection: {},
    temp: {metas: {...defaultModel.metas, loaded: true}, model: {...defaultModel.model}},
    fetching: false,
    fetched: false,
    error: null,
}

function mapModels(list) {
    return list.reduce((prev, current) => {
        prev[current.id] = Object.assign({}, defaultModel, {
            model: current,
            metas: {...defaultModel.metas, loaded: true, valid: true}
        })
        return prev
    }, {})
}

function interpolate(str, params) {
    const keys = Object.keys(params);
    return keys.reduce((prev, current) => {
        return prev.replace(new RegExp('{' + current + '}'), params[current])
    }, str || keys.map(v => '{' + v + '}').join(':'))
}

function keyGen(params) {
    return params ? interpolate(null, params) : null
}


export default function reducer(state = defaultState, action) {

    function previousItem(key) {
        const collection = {...state.collection}
        return collection[key]
    }

    function update(item, key) {
        const collection = {...state.collection}
        collection[key] = item
        return collection
    }


    switch (action.type) {

        case "RESET_<%= uppercaseName %>S" : {
            return {...defaultState}
        }

        case "FETCH_<%= uppercaseName %>S": {
            return {...state, fetching: true}
        }

        case "FETCH_<%= uppercaseName %>S_FULFILLED": {
            return {...state, fetching: false, fetched: true, collection: mapModels(action.payload.data)}
        }

        case "FETCH_<%= uppercaseName %>S_REJECTED": {
            return {...state, fetching: false, fetched: false, error: action.payload.error}
        }

        case "FETCH_<%= uppercaseName %>": {
            const collection = {...state.collection}
            const key = keyGen(action.payload.params)
            if (!state.collection[key]) {
                collection[key] = {...defaultModel, metas: {...defaultModel.metas, fetching: true}}
            } else {
                collection[key] = Object.assign({}, collection[key], {
                    metas: {
                        ...defaultModel.metas,
                        fetching: true
                    }
                })
            }
            return {
                ...state,
                collection
            }
        }

        case "FETCH_<%= uppercaseName %>_REJECTED": {
            const collection = {...state.collection}
            const key = keyGen(action.payload.params)
            collection[key] = {
                metas: {loaded: false, fetching: false, valid: false, error: action.payload.error},
                model: {...defaultModel.model}
            }
            return {
                ...state,
                collection
            }
        }

        case "FETCH_<%= uppercaseName %>_FULFILLED": {
            const collection = {...state.collection}
            const key = keyGen(action.payload.params)
            collection[key] = {metas: {loaded: true, fetching: false, valid: true}, model: action.payload.data}
            return {
                ...state,
                collection
            }
        }

        case "RESET_TEMP" : {
            return {...state, temp: {metas: {...defaultModel.metas, loaded: true}, model: {...defaultModel.model}}}
        }

        case "EDIT_<%= uppercaseName %>": {
            const key = keyGen(action.payload.params)
            if (!key) {
                //model is new
                return {
                    ...state,
                    temp: {...state.temp, model: action.payload.data}
                }
            } else {
                const collection = {...state.collection}
                collection[key].model = action.payload.data
                return {
                    ...state,
                    collection
                }
            }
        }

        case "SAVE_<%= uppercaseName %>": {
            const key = keyGen(action.payload.params)
            const prev = !key ? state.temp : previousItem(key)
            const updated = {...prev, metas: {...prev.metas, saving: true}}
            if (!key) {
                //model is new
                return {...state, temp: updated}
            } else {
                const collection = update(updated, key)
                return {...state, collection}
            }
        }

        case "SAVE_<%= uppercaseName %>_REJECTED": {
            const key = keyGen(action.payload.params)
            const prev = !key ? state.temp : previousItem(key)
            const updated = {...prev, metas: {...prev.metas, error: action.payload.error, saving: false}}
            if (!key) {
                //model is new
                return {...state, temp: updated}
            } else {
                const collection = update(updated, key)
                return {
                    ...state,
                    collection
                }
            }
        }

        case "SAVE_<%= uppercaseName %>_FULFILLED": {
            const key = keyGen(action.payload.params)
            const prev = !key ? state.temp : previousItem(key)
            const updated = {...prev, metas: {...prev.metas, saving: false, forward: !key}, model: action.payload.data}
            if (!key) {
                //model is new
                return {...state, temp: updated}
            } else {
                const collection = update(updated, key)
                return {
                    ...state,
                    collection
                }
            }
        }

        case "DELETE_<%= uppercaseName %>": {
            const key = keyGen(action.payload.params)
            const prev = previousItem(key)
            const updated = {...prev, metas: {...prev.metas, deleting: true}}
            const collection = update(updated, key)
            return {...state, collection}
        }

        case "DELETE_<%= uppercaseName %>_REJECTED": {
            const key = keyGen(action.payload.params)
            const prev = previousItem(key)
            const updated = {...prev, metas: {...prev.metas, error: action.payload.error, deleting: false}}
            const collection = update(updated, key)
            return {
                ...state,
                collection
            }
        }

        case "DELETE_<%= uppercaseName %>_FULFILLED": {
            const key = keyGen(action.payload.params)
            const collection = {...state.collection}
            delete collection[key]
            return {
                ...state,
                collection
            }
        }


        default:
            return state

    }

}
