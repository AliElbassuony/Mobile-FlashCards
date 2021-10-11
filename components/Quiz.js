import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import { useRoute, useNavigation } from '@react-navigation/native';
import { clearLocalNotification, setLocalNotification} from '../utils/helpers'

const Quiz = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const deckId  = route.params.deckId;
  const {QuestionsList, decks} = props;
  const [increment, setIncrement] = useState(0);
  const [result, setResult] = useState(0);
  const [ value, setValue ] = useState(true);
  const [disable, setDisable ] = useState(false);

  const Questions = QuestionsList.filter(questions => {
  
        if(questions.title === deckId){
          const question = questions.questions
          return question
        }
  }).map(question => (question.questions))

  const len = Questions[0].length;
  const questions = Questions[0];

  const handlePress = () => {
    if(increment === len - 1){
        setResult(result + 1);
        setDisable(true);

        clearLocalNotification()
      .then(setLocalNotification)
        
    } else {
        setIncrement(increment + 1)
        setResult(result + 1);
    } 
  }

  const handleOnPress = () => {
      if(increment === len - 1){
        setDisable(true);
        clearLocalNotification()
      .then(setLocalNotification)
    } else {
        
        setIncrement(increment + 1)
    }
  }

  const handleDefault = () => {
    setResult(0)
    setDisable(false)
    setValue(true)
    setIncrement(0)
  }

    return ( 
        <View>
            <View key={increment + 1}>
              <Text> {increment + 1} / {len} </Text>
              <View style={{alignItems: 'center', margin: 20,padding: 10}}>
              
                  { value ? 
                      <Text> {questions[increment].question } </Text>
                    :
                      <Text> {questions[increment].answer } </Text>
                  }
                
                <Text style={{color:'#f7600e',margin:15}} onPress={() => setValue(!value)}> { value ? 'Answer' : 'Question' } </Text>
                <TouchableOpacity style={styles.button}  onPress={handlePress} disabled={disable}>
                    <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleOnPress} disabled={disable}>
                    <Text> InCorrect </Text>
                </TouchableOpacity>
                {
                  disable ? <Text> Result: {Math.round((result / len)*100)}%</Text> : null  
                }
                {disable ?
                  <Text  
                      style={{color:'#f7600e', margin:10}} 
                      onPress={() => navigation.navigate('Deck',{deckId:deckId})}>
                      Back Home
                  </Text>
                 : null}

                 {disable ? 
                 <Text  
                    style={{color:'#f7600e', margin:10}} 
                    onPress={handleDefault}>
                    Start Over
                  </Text> : null}
              </View>
            </View>
        </View>
     );
}
 
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#00dba0',
    alignSelf: 'center',
    borderRadius: 5,
    margin: 15,
  }
});

const mapStateToProps = (decks) => {
    return {
      QuestionsList: Object.keys(decks).map(deck => ({
        title: decks[deck].title,
        questions: decks[deck].questions
      })),
      decks,
    }
}


export default connect(mapStateToProps)(Quiz);