export const state = () => ({
  history: {},
  isFacetOpen: true,
  page: 1,
  id: '',

  //custom
  total: 0,
  totalDB: 0,

  settings: {},

  size: 24,

  sort: '',

  layout: process.env.defaultLayout,

  index: null,
})

export const mutations = {
  setHistory(state, data) {
    state.history = data
  },
  setIsFacetOpen(state, data) {
    state.isFacetOpen = data
  },
  setPage(state, data) {
    state.page = data
  },
  setId(state, data) {
    state.id = data
  },
  setTotal(state, data) {
    state.total = data
  },
  setTotalDB(state, data) {
    state.totalDB = data
  },
  setSettings(state, data) {
    state.settings = data
  },
  setSize(state, data) {
    state.size = data
  },
  setSort(state, data) {
    state.sort = data
  },
  setLayout(state, data) {
    state.layout = data
  },
  setIndex(state, data) {
    state.index = data
  },
}

export const getters = {
  getHistory(state) {
    return state.history
  },
  getIsFacetOpen(state) {
    return state.isFacetOpen
  },
  getPage(state) {
    return state.page
  },
  getId(state) {
    return state.id
  },
  getTotal(state) {
    return state.total
  },
  getTotalDB(state) {
    return state.totalDB
  },
  getSettings(state) {
    return state.settings
  },
  getSize(state) {
    return state.size
  },
  getSort(state) {
    return state.sort
  },
  getLayout(state) {
    return state.layout
  },
  getIndex(state) {
    return state.index
  },
}
