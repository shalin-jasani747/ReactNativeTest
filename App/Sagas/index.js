import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { StoreTypes } from '../Redux/StoreRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getAllStores, searchStores, getStoreDetail, getStoreProducts, getProductDetails } from './StoreSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(StoreTypes.GET_ALL_STORES_REQUEST, getAllStores, api),
    takeLatest(StoreTypes.SEARCH_STORE_REQUEST, searchStores, api),
    takeLatest(StoreTypes.GET_STORE_DETAILS_REQUEST, getStoreDetail, api),
    takeLatest(StoreTypes.GET_STORE_DETAILS_REQUEST, getStoreProducts, api),
    takeLatest(StoreTypes.GET_PRODUCT_DETAILS_REQUEST, getProductDetails, api)
  ])
}
