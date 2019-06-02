import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native'
import styles from './Styles/StoreListStyle'
import { Icon, Left, List, ListItem, Right, Text } from 'native-base'
import _ from 'lodash'

export default class StoreList extends Component {
  // Prop type warnings
  static propTypes = {
    stores: PropTypes.array.isRequired,
    storeDetails: PropTypes.func.isRequired
  }

  // Defaults for props
  static defaultProps = {
    stores: []
  }

  constructor (props) {
    super(props)
    this._renderItem = this._renderItem.bind(this)
  }

  _keyExtractor = (item, index) => `'${index}'`;

  storeDetail (storeId) {
    this.props.storeDetails(storeId)
  }

  _renderItem ({item}) {
    return (
      <List>
        <ListItem onPress={() => this.storeDetail(item.storeId)}>
          <Left style={styles.leftView}>
            <Text style={styles.storeText}>Trading Name: {_.capitalize(item.tradingName)}</Text>
            <Text style={styles.storeText}>Status: {_.capitalize(item.status)}</Text>
          </Left>
          <Right>
            <Icon name='arrow-forward' />
          </Right>
        </ListItem>
      </List>
    )
  }

  render () {
    return (
      <FlatList
        data={this.props.stores}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ListEmptyComponent={
          <View style={styles.noRecords}>
            <Text>No Stores Found!</Text>
          </View>
        }
      />
    )
  }
}
