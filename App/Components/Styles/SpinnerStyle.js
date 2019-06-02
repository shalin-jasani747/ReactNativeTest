import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')


export default StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    position: 'absolute',
    height: height,
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:10000
  }
})
