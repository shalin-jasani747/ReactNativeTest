/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to Sagas/index.js
*  - This template uses the api declared in Sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import StoreActions from '../Redux/StoreRedux'
import { NavigationActions } from 'react-navigation'

export function * getAllStores (api, action) {
  // make the call to the api
  const response = yield call(api.getAllStores)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(StoreActions.getAllStoresSuccess(response.data.stores))
  } else {
    yield put(StoreActions.getAllStoresFailure())
  }
}

export function * searchStores (api, action) {
  let { keyword } = action
  // make the call to the api
  const response = yield call(api.searchStores, keyword)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(StoreActions.searchStoreSuccess(response.data.stores))
  } else {
    yield put(StoreActions.searchStoreFailure())
  }
}

export function * getStoreDetail (api, action) {
  let { store_id } = action
  // make the call to the api
  const response = yield call(api.getStoreDetails, store_id)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(StoreActions.getStoreDetailsSuccess(response.data.store))
    yield put(NavigationActions.navigate({ routeName: 'StoreDetailsScreen' }))
  } else {
    yield put(StoreActions.getStoreDetailsFailure())
  }
}

export function * getStoreProducts (api, action) {
  let { store_id } = action
  // make the call to the api
  const response = yield call(api.getStoreProducts, store_id)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(StoreActions.getStoreProductsSuccess(response.data.products))
    // yield put(NavigationActions.navigate({ routeName: 'StoreDetailsScreen' }))
  } else {
    yield put(StoreActions.getStoreProductsFailure())
  }
}

export function * getProductDetails (api, action) {
  let { product_id } = action
  // make the call to the api
  const response = yield call(api.getStoreProductDetails, product_id)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(StoreActions.getProductDetailsSuccess(response.data.product))
    // yield put(NavigationActions.navigate({ routeName: 'StoreDetailsScreen' }))
  } else {
    yield put(StoreActions.getProductDetailsFailure())
  }
}
