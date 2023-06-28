import {createSlice} from '@reduxjs/toolkit'

export const ClientAuth= createSlice({
     name:'Client',
     initialState:{
        Token:null,
        Displayname:null,
        adminToken:null,
        adminname:null
     },
     reducers:{
        clientLogin(state,action){
            state.Token=action.payload.token
            state.Displayname=action.payload.username
        }
        ,clientLogout(state,action){
            state.Token=''
        },
        adminlogin(state,action){
            state.adminToken = action.payload.admintoken
            state.adminname = action.payload.adminname
        },
        adminlogout(state,action){
            state.adminToken=''
        }
     }
})
export const {clientLogin,clientLogout,adminlogin,adminlogout}=ClientAuth.actions
export const Clientreduser= ClientAuth.reducer