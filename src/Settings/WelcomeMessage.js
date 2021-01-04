/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { AppContext } from '../App/AppProvider';

export default function ({firstVisit}){
  return(
    <AppContext.Consumer>
      {({firstVisit}) => firstVisit ? <div>
          Welcome to CryptoDash, please select your favorite crypto to start.{' '}
        </div> : null 
      }
    </AppContext.Consumer>
  )
}