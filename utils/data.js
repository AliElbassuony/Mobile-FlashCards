import AsyncStorage from '@react-native-async-storage/async-storage'

export const STORAGE_KEY = '@save_data'

const Data = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}



export function formatDeckResults (results) {
  return results !== null
    ? JSON.parse(results)
    : Data
}

export function getDecks(){
    return AsyncStorage.getItem(STORAGE_KEY).then(formatDeckResults)
}

