import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import styles from './Styles/StoreListStyle'
import { Text } from 'native-base'

// Component
import Product from './Product'

export default class ProductList extends Component {
  // Prop type warnings
  static propTypes = {
    products: PropTypes.array.isRequired,
    selectedProducts: PropTypes.array.isRequired
  }

  // Defaults for props
  static defaultProps = {
    products: [],
    selectedProducts: []
  }

  _keyExtractor = (item) => item._id

  constructor (props) {
    super(props)
    this._renderItem = this._renderItem.bind(this)
  }

  _renderItem ({item}) {
    return (
      <Product item={item} selectedProducts={this.props.selectedProducts}
        addProduct={(product) => this.props.productAdd(product)}
        removeProduct={(product) => this.props.productRemove(product)} />
    )
  }

  render () {
    return (
      <FlatList
        data={this.props.products}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ListEmptyComponent={
          <View style={styles.noRecords}>
            <Text>No Products Found!</Text>
          </View>
        }
      />
    )
  }
}
