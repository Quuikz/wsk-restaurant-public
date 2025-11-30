import React from 'react';
import PropTypes from 'prop-types';


import {useLocation, useNavigate} from 'react-router';

const Single = () =>{
    const {state} = useLocation();
    const item = state.item;

    const navigate = useNavigate();


    if(!item){
        return <p>No item</p>
    }

    return(
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.username}</p>

            {item.media_type.startsWith('image') ? 
            (
                <img src={item.filename} alt={item.title} style={{ width: '100%' }} />
            ) : 
            (
                <video src={item.filename} controls style={{ width: '100%' }} />
            )}

            <button onClick={() => navigate(-1)}>Close</button>


        </div>
    );
}

export default Single;