import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getAllStoresRequest: [],
  getAllStoresSuccess: ['stores'],
  getAllStoresFailure: null,

  searchStoreRequest: ['keyword'],
  searchStoreSuccess: ['stores'],
  searchStoreFailure: null,

  getStoreDetailsRequest: ['store_id'],
  getStoreDetailsSuccess: ['store'],
  getStoreDetailsFailure: null,

  getStoreProductsRequest: ['store_id'],
  getStoreProductsSuccess: ['products'],
  getStoreProductsFailure: null,

  getProductDetailsRequest: ['productId'],
  getProductDetailsSuccess: ['product'],
  getProductDetailsFailure: null,

  addProduct: ['product'],
  removeProduct: ['product'],
  removeAllProducts: null
})

export const StoreTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  stores: [],
  storeDetails: [],
  storeProducts: [],
  productDetails: [],
  selectedProducts: [],
  error: false
})

/* ------------- Get Stores Reducers ------------- */

// request the data from an api
export const getStoreRequest = (state) =>
  state.merge({ fetching: true, error: false })

// successful api lookup
export const getStoreSuccess = (state, { stores }) => {
  return state.merge({ fetching: false, error: false, stores })
}

// Something went wrong somewhere.
export const getStoreFailure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Search Stores Reducers ------------- */

// request the data from an api
export const searchStoreRequest = (state, { keyword }) =>
  state.merge({ fetching: true, error: false, keyword })

// successful api lookup
export const searchStoreSuccess = (state, { stores }) => {
  return state.merge({ fetching: false, error: false, stores: _.union(state.stores, stores) })
}

// Something went wrong somewhere.
export const searchStoreFailure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Get Store Details Reducers ------------- */

// request the data from an api
export const getStoreDetailsRequest = (state, { store_id }) =>
  state.merge({ fetching: true, error: false, store_id })

// successful api lookup
export const getStoreDetailsSuccess = (state, { store }) => {
  return state.merge({ fetching: false, error: false, storeDetails: store })
}

// Something went wrong somewhere.
export const getStoreDetailsFailure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Get Store Product Reducers ------------- */

// request the data from an api
export const getStoreProductsRequest = (state, { store_id }) =>
  state.merge({ fetching: true, error: false, store_id, storeProducts: [] })

// successful api lookup
export const getStoreProductsSuccess = (state, { products }) => {
  return state.merge({ fetching: false, error: false, storeProducts: products })
}

// Something went wrong somewhere.
export const getStoreProductsFailure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Get Product Details Reducers ------------- */

// request the data from an api
export const getProductDetailsRequest = (state, { store_id }) =>
  state.merge({ fetching: true, error: false, store_id })

// successful api lookup
export const getProductDetailsSuccess = (state, { products }) => {
  return state.merge({ fetching: false, error: false, productDetails: products })
}

// Something went wrong somewhere.
export const getProductDetailsFailure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Add Product Reducers ------------- */

export const addProduct = (state, { product }) =>
  state.merge({ selectedProducts: [...state.selectedProducts, product] })

/* ------------- Remove Product Reducers ------------- */

export const removeProduct = (state, { product }) =>
  state.merge({ selectedProducts: _.reject(state.selectedProducts, product) })

/* ------------- Remove All Product Reducers ------------- */

export const removeAllProduct = (state) =>
  state.merge({ selectedProducts: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ALL_STORES_REQUEST]: getStoreRequest,
  [Types.GET_ALL_STORES_SUCCESS]: getStoreSuccess,
  [Types.GET_ALL_STORES_FAILURE]: getStoreFailure,

  [Types.SEARCH_STORE_REQUEST]: searchStoreRequest,
  [Types.SEARCH_STORE_SUCCESS]: searchStoreSuccess,
  [Types.SEARCH_STORE_FAILURE]: searchStoreFailure,

  [Types.GET_STORE_DETAILS_REQUEST]: getStoreDetailsRequest,
  [Types.GET_STORE_DETAILS_SUCCESS]: getStoreDetailsSuccess,
  [Types.GET_STORE_DETAILS_FAILURE]: getStoreDetailsFailure,

  [Types.GET_STORE_PRODUCTS_REQUEST]: getStoreProductsRequest,
  [Types.GET_STORE_PRODUCTS_SUCCESS]: getStoreProductsSuccess,
  [Types.GET_STORE_PRODUCTS_FAILURE]: getStoreProductsFailure,

  [Types.GET_PRODUCT_DETAILS_REQUEST]: getProductDetailsRequest,
  [Types.GET_PRODUCT_DETAILS_SUCCESS]: getProductDetailsSuccess,
  [Types.GET_PRODUCT_DETAILS_FAILURE]: getProductDetailsFailure,

  [Types.ADD_PRODUCT]: addProduct,
  [Types.REMOVE_PRODUCT]: removeProduct,
  [Types.REMOVE_ALL_PRODUCTS]: removeAllProduct
})
