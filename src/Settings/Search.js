/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import styled from 'styled-components'
import {backgroundColor2, fontSize2} from '../Shared/Styles'
import {AppContext} from '../App/AppProvider'
import _ from 'lodash'
import fuzzy from 'fuzzy'


const SearchGrid = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    
`

const SearchInput = styled.input`
    ${backgroundColor2};
    color: #1163c9;
    ${fontSize2};
    border: 1px solid;
    height: 25px;
    place-self: center left;

`

const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
    // console.log(inputValue)
    //Get all the coin symbol
    let coinSymbols = Object.keys(coinList)
    // Get all the coin names, map symbo to name
    let coinNames = coinSymbols.map(sym => coinList[sym].CoinName)
    // Combine
    let allStringsToSearch = coinSymbols.concat(coinNames)
    let fuzzyResults = fuzzy
        .filter(inputValue, allStringsToSearch, {})
        .map(result => result.string)

    let filteredCoins = _.pickBy(coinList, (result, symKey) => {
        let coinName = result.CoinName
        return (_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName))
    })
    console.log(filteredCoins)
    setFilterCoins(filteredCoins)
}, 500)

function filterCoins(e, setFilteredCoins, coinList){
    let inputValue = e.target.value
    if(!inputValue){
        setFilteredCoins(null)
        return
    }
    handleFilter(inputValue, coinList, setFilteredCoins)
}

export default function(){
    return (
        <AppContext.Consumer>
            {({setFilteredCoins, coinList}) => 
            <SearchGrid> 
                <h2>Search all coins</h2> 
                <SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}/>
            </SearchGrid>
        }
        </AppContext.Consumer>
    )
}
