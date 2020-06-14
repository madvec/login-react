import React from 'react';
import './Button.css'

const button = (props) => {    
    return(
        <button className='btn btn-login btn-success' 
        disabled={props.disabled}>
            {props.children}
        </button>
    )
}

export default button