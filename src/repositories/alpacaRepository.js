import axios from 'axios'
import store from '../store'

const baseDomain = 'https://paper-api.alpaca.markets'
const APCAAPIKEYID = 'PK9BX1UFFNEF2HHPVBF6'
const APCAAPISECRETKEY = 'D4T7Vse6DvI4BDhU0k4Lcr5xKILXKSJt4xGxkcSS'
const accountBase = '/v2/account'
const assetBase = '/v2/assets'
const orderBase = '/v2/orders'
const positionsBase = 'v2/positions'
const deletePositionBase = 'v2/positions' // path to your Vuex store

const Repository = axios.create({
  baseURL: baseDomain,
  timeout: 1000,
  headers: {
    'APCA-API-KEY-ID': APCAAPIKEYID,
    'APCA-API-SECRET-KEY': APCAAPISECRETKEY,
    paper: true }
})

Repository.interceptors.request.use(function (config) {
  if (config.url !== 'v2/positions') {
    store.commit('loading', true)
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default {

  getAccount () {
    return Repository.get(`${accountBase}`)
  },

  getAssetInfo (symbol) {
    return Repository.get(`${assetBase}/${symbol}`)
  },

  getPositions () {
    return Repository.get(`${positionsBase}`)
  },

  deletePosition (symbol) {
    return Repository.delete(`${deletePositionBase}/${symbol}`)
  },

  postOrder (payload) {
    return Repository.post(`${orderBase}`, payload)
  }

}
