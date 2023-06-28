import {configureStore} from '@reduxjs/toolkit'
  import { Clientreduser } from './client'
 import { persistStore, persistReducer } from 'redux-persist';
 import storage from 'redux-persist/lib/storage';




const persistConfig = {
  key: 'admin', 
  storage,
};


const persistedClientReducer = persistReducer(persistConfig, Clientreduser);






export const store=configureStore({
    reducer:{
        Client:persistedClientReducer
    }
})


export const persistor = persistStore(store);