import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_KEY, formatDeckResults } from './data'

export function fetchDecks () {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(formatDeckResults)
}

export function saveDeck (deck) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [deck]: { 
        title: deck,
        questions: []
     },
  }))
}

export function addCardToDeck (deck, card) {
  return AsyncStorage.getItem(STORAGE_KEY).
    then( results => {
        const data = JSON.parse(results);
        data[deck] = {
                        ...data[deck],
                        questions: [...data[deck].questions, card]
                    }
        return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    })
    
}