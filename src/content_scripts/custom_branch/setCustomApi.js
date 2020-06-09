import { PROJECT_BRANCH_KEY, WIKI_BRANCH_KEY } from "../../common/constants"

function setCustomApi(storageKey, prefix) {
  chrome.storage.local.get([storageKey], (data) => {
    const branch = data[storageKey]
    if(branch) {
      console.log(`set ${storageKey}`, branch)
      localStorage.setItem(storageKey, `${prefix}/${branch}/`)
    } else {
      localStorage.removeItem(storageKey)
    }
  })
}

export function setProjectCustomApi() {
  setCustomApi(PROJECT_BRANCH_KEY, '/project')
}

export function setWikiCustomApi() {
  setCustomApi(WIKI_BRANCH_KEY, '/wiki')
}