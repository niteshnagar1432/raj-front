import { legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// Initial state
const initialState = {
  sidebarShow: true,
  theme: 'light',
  token: '',
  userId: '',
  userData: null,
  admin: null,
  uploadImages: null,
  addPackage: {},
  updatePackage: {},
}

// Reducer function
const changeState = (state = initialState, action) => {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.payload }
    case 'SET_TOKEN':
      return { ...state, token: action.payload }
    case 'UPDATE_SIDE_BAR':
      return { ...state, sidebarShow: action.payload }
    case 'SET_UPLOAD_IMAGES':
      return { ...state, uploadImages: action.payload }
    case 'SET_PACKAGE_DATA':
      return { ...state, addPackage: { ...state.addPackage, ...action.payload } }
    case 'SET_UPDATE_PACKAGE_DATA':
      return { ...state, updatePackage: { ...state.updatePackage, ...action.payload } }
    case 'SET_USER_ID':
      return { ...state, userId: action.payload }
    default:
      return state
  }
}

// Create the store
const store = createStore(changeState, composeWithDevTools())

// Action creators
export const UpdateSideBar = (val) => ({
  type: 'UPDATE_SIDE_BAR',
  payload: val,
})

export const setUserData = (userData) => ({
  type: 'set',
  payload: { userData },
})

export const setAdminData = (admin) => ({
  type: 'set',
  payload: { admin },
})

export const setToken = (token) => ({
  type: 'SET_TOKEN',
  payload: token,
})

export const setUploadImages = (images) => ({
  type: 'SET_UPLOAD_IMAGES',
  payload: images,
})

// Action creator for updating addPackage data
export const setPackageData = (data) => ({
  type: 'SET_PACKAGE_DATA',
  payload: data,
})

// Action creator for updating addPackage data
export const setUpdatePackageData = (data) => ({
  type: 'SET_UPDATE_PACKAGE_DATA',
  payload: data,
})

export const setUserId = (userId) => ({
  type: 'SET_USER_ID',
  payload: userId,
})

export default store
