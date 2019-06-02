import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View } from 'react-native'
import styles from './Styles/ProductStyle'
import { Icon, List, ListItem, Right, CheckBox, Text } from 'native-base'
import _ from 'lodash'
import { isValueInObject, renderIf } from '../Services/helpers'

export default class Product extends Component {
  // Prop type warnings
  static propTypes = {
    item: PropTypes.object.isRequired,
    selectedProducts: PropTypes.array.isRequired,
    addProduct: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired,
  }

  // Defaults for props
  static defaultProps = {
    item: {},
    selectedProducts: []
  }

  constructor (props) {
    super(props)

    this.state = {
      section: false
    }
  }

  openSection () {
    this.setState(previousState => {
      return {
        section: !previousState.section
      }
    })
  }

  addRemoveProduct () {
    let { item, selectedProducts, addProduct, removeProduct } = this.props
    let checked = isValueInObject(selectedProducts, '_id', item._id)
    if (!checked) {
      addProduct(item)
    } else {
      removeProduct(item)
    }
  }

  render () {
    let { section } = this.state
    let { item, selectedProducts} = this.props
    let icon = (!section) ? 'arrow-up' : 'arrow-down'
    let checked = isValueInObject(selectedProducts, '_id', item._id)

    return (
      <List>
        <ListItem style={styles.productListItem} onPress={() => this.openSection()}>
          <View style={styles.listView}>
            <View style={styles.checkbox}>
              <CheckBox
                checked={checked}
                onPress={(item) => this.addRemoveProduct(item)}
                />
            </View>
            <View style={styles.productDesc}>
              <Text style={styles.productText}>Product Name: {_.capitalize(item.name)}</Text>
              <Text style={styles.productText}>Description: {_.capitalize(item.description)}</Text>
            </View>
            <Right>
              <Icon name={icon} />
            </Right>
          </View>
          {
            renderIf(section)(
              <View style={styles.hideProductView}>
                <Text style={styles.productText} >Category: {_.capitalize(item.category)}</Text>
                <Text style={styles.productText} >Price Bux: {_.capitalize(item.priceBux)}</Text>
                <Text style={styles.productText} >Gain Bux: {_.capitalize(item.gainBux)}</Text>
                <Text style={styles.productText} >Price Cash: {_.capitalize(item.priceCash)}</Text>
              </View>
            )
          }
        </ListItem>
      </List>
    )
  }
}
