import { createSelector, createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../actions/apiActions'
import { getLanguageJsonDataApi, getLanguagesApi } from '../../utils/api'
import { store } from '../store'
import moment from 'moment'

const initialState = {
  list: [],
  loading: false,
  lastFetch: null,
  currentLanguage: {
    id: null,
    code: null,
    name: null,
    displayName: null
  },
  currentLanguageLabels: {
    loading: true,
    data: {},
    lastFetch: null
  }
}

export const languageSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    languagesRequested: (languages, action) => {
      languages.loading = true
    },
    languagesReceived: (languages, action) => {
      languages.list = action.payload.data
      languages.loading = false
      languages.lastFetch = Date.now()
    },
    languagesRequestFailed: (languages, action) => {
      languages.loading = false
    },
    languageChanged: (languages, action) => {
      languages.currentLanguage.code = action.payload.code
      languages.currentLanguage.name = action.payload.name
      languages.currentLanguage.id = action.payload.id
      languages.currentLanguage.displayName = action.payload.display_name
    },
    languageLabelRequested: (languages, action) => {
      languages.currentLanguageLabels.loading = true
    },
    languageLabelsReceived: (languages, action) => {
      languages.currentLanguageLabels.data = action.payload.data
      languages.currentLanguageLabels.loading = false
      languages.currentLanguageLabels.lastFetch = Date.now();
    },
    languageLabelRequestFailed: (languages, action) => {
      languages.currentLanguageLabels.loading = true
    }
  }
})

export const {
  languagesRequested,
  languagesReceived,
  languagesRequestFailed,
  languageChanged,
  languageLabelRequested,
  languageLabelsReceived,
  languageLabelRequestFailed
} = languageSlice.actions
export default languageSlice.reducer

// API Calls
export const loadLanguages = ({
  limit = '',
  offset = '',
  onSuccess = () => { },
  onError = () => { },
  onStart = () => { } }) => {
  const { lastFetch, Lang } = store.getState().languages ?? {};
  const diffInMinutes = lastFetch ? moment().diff(moment(lastFetch), 'minutes') : process.env.NEXT_PUBLIC_LOAD_MIN + 1
  // // If API data is fetched within last 10 minutes then don't call the API again
  // if (diffInMinutes < process.env.NEXT_PUBLIC_LOAD_MIN) {
    store.dispatch(
      apiCallBegan({
        ...getLanguagesApi(limit, offset),
        displayToast: false,
        onStartDispatch: languagesRequested.type,
        onSuccessDispatch: languagesReceived.type,
        onErrorDispatch: languagesRequestFailed.type,
        onStart,
        onSuccess,
        onError
      })
    )
  // }
}

// Helper function to check if the page has been manually refreshed or not
const isManualRefresh = () => {
  const manualRefresh = sessionStorage.getItem("manualRefresh");
  sessionStorage.removeItem("manualRefresh");
  return manualRefresh === "true";
};

// Event listener to set manualRefresh flag when page is manually refreshed
if (typeof window !== 'undefined') {
  window.addEventListener("load", () => {
    if (navigator.userAgent.includes("Mozilla")) {
      // This is likely a manual refresh
      sessionStorage.setItem("manualRefresh", "true");
    } else {
      // This is the initial page load
      sessionStorage.removeItem("manualRefresh");
    }
  });
}


export const loadLanguageLabels = ({
  code = "",
  onSuccess = () => { },
  onError = () => { },
  onStart = () => { } }) => {
  const { lastFetch, Lang } = store.getState().languages ?? {};
  const diffInMinutes = lastFetch ? moment().diff(moment(lastFetch), 'minutes') : 0
  // // If API data is fetched within last 10 minutes then don't call the API again
  // if (diffInMinutes < process.env.NEXT_PUBLIC_LOAD_MIN) return false
  store.dispatch(
    apiCallBegan({
      ...getLanguageJsonDataApi(code),
      displayToast: false,
      onStartDispatch: languageLabelRequested.type,
      onSuccessDispatch: languageLabelsReceived.type,
      onErrorDispatch: languageLabelRequestFailed.type,
      onStart,
      onSuccess,
      onError
    })
  )
}

export const setCurrentLanguage = (name, code, id, display_name) => {
  store.dispatch(languageChanged({ name, code, id, display_name }))
}

// Selector Functions
export const selectLanguages = createSelector(
  state => state.languages,
  languages => languages?.list
)

export const selectCurrentLanguage = createSelector(
  state => state.languages?.currentLanguage,
  languages => languages
)

export const selectCurrentLanguageLabels = createSelector(
  state => state.languages?.currentLanguageLabels?.data,
  languages => languages
)
