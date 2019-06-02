import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import { Container, Content, Header, Segment, Icon, Button, Text } from 'native-base'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import SearchInput, { createFilter } from 'react-native-search-filter'
import { isEmpty } from '../Services/helpers'

// Styles
import styles from './Styles/StoreListScreenStyles'

// Redux
import StoreAction from '../Redux/StoreRedux'

// Component
import StoreList from '../Components/StoreList'

const KEYS_TO_FILTERS = ['tradingName']
const platform = Platform.OS

class StoreListScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      status: 'all_stores',
      searchText: ''
    }
    this.getStoreDetails = this.getStoreDetails.bind(this)
  }

  filterStores (status) {
    this.setState({
      status
    })
  }

  setKeyword (searchTerm) {
    this.setState({ searchText: searchTerm }, () => {
      let storesData = this.getStoreForList()

      if (isEmpty(storesData) && searchTerm.length > 3) {
        this.props.searchStore(searchTerm)
      }
    })
  }

  getStoreForList () {
    let { status } = this.state
    let { stores } = this.props.storeData

    let storesWithoutTradingName = _.filter(stores, (store) => typeof store.tradingName !== 'undefined')

    const newStores = storesWithoutTradingName.filter(createFilter(this.state.searchText, KEYS_TO_FILTERS))
    let storesData = (status !== 'all_stores') ? _.filter(newStores, (store) => store.status === status) : newStores

    return storesData
  }

  getStoreDetails (storeId) {
    this.props.getStoreDetail(storeId)
  }

  render () {
    let storesData = this.getStoreForList()
    let { status } = this.state
    let inputStyle = platform === 'ios' ? styles.iOsSearch : styles.androidSearch
    let inputViewStyle = platform === 'ios' ? {} : {height: 50}
    return (
      <Container>
        <Header searchBar rounded>
          <View style={styles.searchView}>
            <Icon name='search' style={styles.searchIcon} />
            <SearchInput
              onChangeText={(value) => this.setKeyword(value)}
              placeholderTextColor='#8D8D8D'
              value={this.state.searchText}
              placeholder='Search for store'
              style={inputStyle}
              inputViewStyles={inputViewStyle}
              autoCorrect={false}
              fuzzy
              underlineColorAndroid='transparent'
            />
          </View>
        </Header>
        <Segment>
          <Button first active={status === 'all_stores'} onPress={() => this.filterStores('all_stores')}>
            <Text>All Stores</Text>
          </Button>
          <Button active={status === 'verified'} onPress={() => this.filterStores('verified')}>
            <Text>Verified</Text>
          </Button>
          <Button active={status === 'pending'} last onPress={() => this.filterStores('pending')}>
            <Text>Pending</Text>
          </Button>
        </Segment>
        <Content>
          <StoreList stores={storesData} storeDetails={(storeId) => this.getStoreDetails(storeId)} />
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
    searchStore: (keyword) => dispatch(StoreAction.searchStoreRequest(keyword)),
    getStoreDetail: (storeId) => dispatch(StoreAction.getStoreDetailsRequest(storeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreListScreen)
