import React from 'react'
import styled, {css} from 'styled-components'
import {AppContext} from './AppProvider'

const Logo = styled.div`
   font-size: 1.5rem; 
`
const Bar = styled.div`
    display: grid;
    margin-bottom: 40px;
    grid-template-columns: 180px auto 100px 100px;
`

const ControlButtonElem = styled.div`
    cursor: pointer;
    ${props => props.active && css`
        text-shadow: 0 0 3px yellow;
    `}
`
function toProperCase(lower){
    return lower.charAt(0).toUpperCase() + lower.substr(1);
}

function ControlButton({name}){
    return (
    <AppContext.Consumer>
        {({page, setPage})  => (
        <ControlButtonElem 
            active={page === name}
            onClick={() => setPage(name)}
        >
            {toProperCase(name)}
        </ControlButtonElem>
        )}
    </AppContext.Consumer>
    )
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function(){
    return (
    <Bar>
        <Logo>CryptoDask</Logo>
        <div/>
        <ControlButton active name="dashboard"/>
        <ControlButton name="settings"/>
    </Bar>
    )
}

