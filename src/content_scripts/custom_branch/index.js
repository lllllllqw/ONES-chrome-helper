import {
  setProjectCustomApi,
  setWikiCustomApi
} from './setCustomApi'
import { showCustomApiInfo } from './showCustomApiInfo'

export function run() {
  Promise.all([
    setProjectCustomApi(),
    setWikiCustomApi()
  ])
    .then(() => {
      showCustomApiInfo()
    })
}