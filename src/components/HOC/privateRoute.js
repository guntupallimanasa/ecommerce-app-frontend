import React from 'react'
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest})=>{
    return <Route component = {(props)=>{
        const token = window.localStorage.getItem('token');
        if(token){
            return <Component {...props}/>
        }else{
            return <Redirect to = {'/signin'}/>
        }
    }} {...rest}/>
}


export default PrivateRoute;