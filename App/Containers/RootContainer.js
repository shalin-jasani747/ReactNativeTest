import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import Spinner from '../Components/Spinner'
import { Root } from "native-base";

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    let { storeData } = this.props
    return (
      <Root>
        <View style={styles.applicationView}>
          <StatusBar barStyle='light-content' />
          <ReduxNavigation />
          <Spinner show={storeData.fetching} />
        </View>
      </Root>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    storeData: state.store
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
