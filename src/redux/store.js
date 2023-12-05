import {createStore} from 'redux'
import { rootReducer } from './reducers'

const store =  createStore(rootReducer)
// rootReducer => function cập nhật lại giá trị state trong kho store


export default store