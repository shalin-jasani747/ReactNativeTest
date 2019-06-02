import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  openingHour: {marginLeft: 0},
  starView: {flex: 0.4},
  starButton: {color: '#87838B'},
  productView: {fontSize: 18, padding: 10}
})
