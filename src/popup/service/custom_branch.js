
import { CUSTOM_API_CHANGED } from "../../common/message_type"
import { getCurrentTab } from "../../common/tabs"

const ENTER_KEY = 13

export function getBranch(branchKey) {
  return new Promise((resolve) => {
    chrome.storage.local.get([branchKey], (data) => {
      const branch = data[branchKey] || null
      resolve(branch)
    })
  })
}

export function setBranch(branchKey, branchValue) {
  return new Promise((resolve) => {
    chrome.storage.local.set({
      [branchKey]: branchValue,
    }, () => {
      getCurrentTab()
        .then((tab) => {
          const { id } = tab
          chrome.tabs.sendMessage(id, {
            type: CUSTOM_API_CHANGED
          })
          resolve()
        })
    })
  })
}
