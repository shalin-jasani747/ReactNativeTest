import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, ActivityIndicator, Text} from 'react-native'
import styles from './Styles/SpinnerStyle'

export default class Spinner extends Component {
  // // Prop type warnings
  static propTypes = {
    show: PropTypes.bool
  }
  //
  // // Defaults for props
  static defaultProps = {
    show: false
  }

  render () {
    if(this.props.show) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator
            color="#4191FF"
            size="large"
          />
        </View>
      )
    }

    return (
      <View>
      </View>
    )
  }
}
