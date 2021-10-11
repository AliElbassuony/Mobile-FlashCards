import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

const NOTIFICATION_KEY = 'UdaciCards:notifications'

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Log your stats!',
    body: "👋 don't forget to log your stats for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification(){
  AsyncStorage.getItem( NOTIFICATION_KEY )
      .then(JSON.parse)
      .then( data => {
          if ( !data ){
              Notifications.requestPermissionsAsync()
                  .then( ({ status }) => {
                      console.log('Notification permissions status:',status);
                      if ( status === 'granted' ){
                          Notifications.cancelAllScheduledNotificationsAsync()
                              .catch(console.error);

                          Notifications.scheduleNotificationAsync({
                                  content: createNotification(),
                                  trigger: {
                                      hour: 20,
                                      minute: 0,
                                      repeats: true
                                  }
                              })
                              .catch(console.error);

                          Notifications.setNotificationHandler({
                              handleNotification: async () => ({
                                  shouldShowAlert: true,
                                  shouldPlaySound: false,
                                  shouldSetBadge: false,
                              })
                          })

                          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                      }
                  })
          }
      })
}
