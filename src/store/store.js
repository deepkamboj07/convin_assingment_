import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import listRedux from './listRedux'
import themeRedux from './themeRedux'
import alertRedux from './alertRedux'
import selectRedux from './selectRedux'
import selectedDelete from './selectedDelete'
const store= configureStore({
    reducer:{
        theme:themeRedux,
        lists:listRedux,
        alert:alertRedux,
        select:selectRedux,
        delete:selectedDelete
    },
    middleware:[thunk]
})


export default store