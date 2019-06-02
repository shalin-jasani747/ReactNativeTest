import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  searchView: {
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    marginBottom: 10
  },
  searchIcon: {
    color: '#8D8D8D',
    marginLeft: 10,
    marginTop: 3,
    fontSize: 20
  },
  iOsSearch: {
    color: '#000000',
    fontSize: 12,
    lineHeight: 0,
    paddingLeft: 10,
    width: Metrics.screenWidth - 150
  },
  androidSearch: {
    color: '#000000',
    fontSize: 12,
    paddingLeft: 10,
    width: Metrics.screenWidth - 150,
    marginTop: 0
  }
})
