import {
  setProjectCustomApi,
  setWikiCustomApi
} from './setCustomApi'
import { showCustomApiInfo, syncCustomApiInfo } from './showCustomApiInfo'

export function run() {
  const setAllCustomApi = () => Promise.all([
    setProjectCustomApi(),
    setWikiCustomApi()
  ])
  
  setAllCustomApi()
    .then(() => {
      showCustomApiInfo()
    })

  window.addEventListener('hashchange', () => {
    setAllCustomApi()
      .then(() => {
        syncCustomApiInfo()
      })
  })
}