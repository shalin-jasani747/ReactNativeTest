import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Body, Button, Container, Content, Header, Icon, Left, Right, Title } from 'native-base'

// Component
import ProductList from '../Components/ProductList'

// Redux
import StoreAction from '../Redux/StoreRedux'

class StoreProductsScreen extends Component {
  goBack () {
    this.props.navigation.goBack()
  }

  render () {
    let {selectedProducts} = this.props.storeData

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Products</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <ProductList products={selectedProducts} selectedProducts={selectedProducts}
            productAdd={(product) => this.props.addProduct(product)}
            productRemove={(product) => this.props.removeProduct(product)} />
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
    removeProduct: (product) => dispatch(StoreAction.removeProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreProductsScreen)
