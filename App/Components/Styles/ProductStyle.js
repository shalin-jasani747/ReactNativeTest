import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  productListItem: {
    flex: 1,
    flexDirection: 'column'
  },
  listView: {
    flex: 1,
    flexDirection: 'row'
  },
  checkbox: {
    flex: 0.15
  },
  productDesc: {
    flex: 1
  },
  productText: {
    alignSelf: 'flex-start'
  },
  hideProductView: {
    flex: 1,
    alignSelf: 'flex-start',
    paddingLeft: 35
  }
})
