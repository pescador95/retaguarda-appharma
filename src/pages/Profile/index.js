import React, { useState, useEffect } from 'react';

import { Conteiner, ButtomArea, SingOut, BodyArea } from './styled';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useApi from '../../Helpers/AppharmaApi'



function Profile() {
    const dispatch = useDispatch();
    const history = useHistory()

    const handleClick = () => {
        dispatch({
            type: 'CLEAR_AUTH'
        })
        history.push('/')
    }


    return (
        <Conteiner>
            <BodyArea>
                <ButtomArea onClick={handleClick}>
                    <SingOut>Logout</SingOut>
                </ButtomArea>
            </BodyArea>
        </Conteiner>
    )
}

export default Profile;