import React from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { fetchDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import DeckList from './DeckList'

class List extends React.Component {

    componentDidMount () {
        const { dispatch } = this.props
        fetchDecks()
        .then( decks => dispatch(receiveDecks(decks)))
    }

    render(){
        const { decks, deckIds } = this.props;

    return ( 
           <DeckList decks={decks} deckId={deckIds}/>
    )}
}
 
const mapStateToProps = (decks) => {
    return {
      deckList: Object.keys(decks).map(deck => ({
        title: decks[deck].title,
        number: decks[deck].questions.length
      })),
      decks,
    }
}

export default connect(mapStateToProps)(List);