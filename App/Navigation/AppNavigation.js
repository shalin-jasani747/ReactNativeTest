import { createStackNavigator, createAppContainer } from 'react-navigation'
import StoreProductsScreen from '../Containers/StoreProductsScreen'
import StoreDetailsScreen from '../Containers/StoreDetailsScreen'
import StoreListScreen from '../Containers/StoreListScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  StoreProductsScreen: { screen: StoreProductsScreen },
  StoreDetailsScreen: { screen: StoreDetailsScreen },
  StoreListScreen: { screen: StoreListScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'StoreListScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
