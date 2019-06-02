import React, { Component } from 'react'
import { Container, Header, Left, Body, Right, Toast, Button, Icon, Title, Content, Card, CardItem, Text } from 'native-base'
import { connect } from 'react-redux'
import _ from 'lodash'
import { renderIf } from '../Services/helpers'

// Styles
import styles from './Styles/StoreDetailsScreenStyle'

// Component
import ProductList from '../Components/ProductList'

// Redux
import StoreAction from '../Redux/StoreRedux'

class StoreDetailsScreen extends Component {
  goBack () {
    this.props.removeAllProduct()
    this.props.navigation.goBack()
  }

  goToProductsScreen () {
    let { selectedProducts } = this.props.storeData

    if (selectedProducts.length === 0) {
      Toast.show({text: 'Please select the product first!',
        duration: 2500,
        position: 'bottom',
        textStyle: {textAlign: 'center'}
      })
    } else {
      this.props.navigation.navigate('StoreProductsScreen')
    }
  }

  render () {
    let { storeDetails, storeProducts, selectedProducts } = this.props.storeData
    let storeName = (typeof _.get(storeDetails, 'billingContactDetails') !== 'undefined') ? _.get(_.get(storeDetails, 'billingContactDetails'), 'fullName') : ''
    let storeEmail = (typeof _.get(storeDetails, 'billingContactDetails') !== 'undefined') ? _.get(_.get(storeDetails, 'billingContactDetails'), 'emailAddress') : ''
    let openingHour = (typeof _.get(_.get(storeDetails, 'openingHour'), '0') !== 'undefined') ? _.get(_.get(storeDetails, 'openingHour'), '0') : {}
    let startTime = _.get(openingHour,'startTime')
    let endTime = _.get(openingHour,'endTime')

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Store Details</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.goToProductsScreen()} >
              <Icon name='arrow-forward' />
            </Button>
          </Right>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>
                Name: { storeName }
                </Text>
                <Text>
                Trading Name: { storeDetails.tradingName }
                </Text>
                <Text>
                Suburb: { storeDetails.suburb }
                </Text>
                <Text>
                Email: { storeEmail }
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Text style={styles.openingHour}>
                  Opening Hours: {(typeof startTime !== 'undefined' && typeof endTime !== 'undefined') ? ` ${startTime} - ${endTime} ` : 'Not Available'}
                </Text>
              </Left>
              <Right style={styles.starView}>
                <Button transparent textStyle={styles.starButton}>
                  <Icon name='star' />
                  <Text>{storeDetails.review.length} stars</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>

          <Text style={styles.productView}>
            Products
          </Text>

          <ProductList products={storeProducts} selectedProducts={selectedProducts} productAdd={(product) => this.props.addProduct(product)} productRemove={(product) => this.props.removeProduct(product)} />

        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    storeData: state.store
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => dispatch(StoreAction.addProduct(product)),
    removeProduct: (product) => dispatch(StoreAction.removeProduct(product)),
    removeAllProduct: () => dispatch(StoreAction.removeAllProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetailsScreen)
