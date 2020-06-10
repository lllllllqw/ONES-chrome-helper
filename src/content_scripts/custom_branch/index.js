import {
  setProjectCustomApi,
  setWikiCustomApi
} from './setCustomApi'
import { showCustomApiInfo, syncCustomApiInfo } from './showCustomApiInfo'
import { CUSTOM_API_CHANGED } from '../../common/message_type'

const setAllCustomApi = () => Promise.all([
  setProjectCustomApi(),
  setWikiCustomApi()
])

const updateCustomApiInfo = () => setAllCustomApi()
  .then(() => {
    syncCustomApiInfo()
  })

const addEventListeners = () => {
  window.addEventListener('hashchange', () => {
    updateCustomApiInfo()
  })

  chrome.runtime.onMessage.addListener((message) => {
    const type = message ? message.type : null
    if(type === CUSTOM_API_CHANGED) {
      updateCustomApiInfo()
    }
  })
}

export function run() {
  setAllCustomApi()
    .then(() => {
      showCustomApiInfo()
    })

  addEventListeners()
}