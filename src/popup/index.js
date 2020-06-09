import { PROJECT_BRANCH_KEY } from "../common/constants"

initBranchInput()
initBranchButtons()

function initBranchInput() {
  chrome.storage.local.get([PROJECT_BRANCH_KEY], (data) => {
    const projectBranch = data[PROJECT_BRANCH_KEY]
    const branchInputEl = document.querySelector('#branch-input')
    branchInputEl.value = projectBranch || ''
    branchInputEl.focus()

    const ENTER_KEY = 13
    branchInputEl.addEventListener('keydown', (e) => {
      if(e.keyCode === ENTER_KEY) {
        confirmInput()
      }
    })
  })
}

function initBranchButtons() {
  const confirmButtonEl = document.querySelector('#confirm')
  confirmButtonEl.addEventListener('click', () => {
    confirmInput()
  })

  const resetButtonEl = document.querySelector('#reset')
  resetButtonEl.addEventListener('click', () => {
    clearBranch()
    window.close()
  })
}

function confirmInput() {
  const branchInputEl = document.querySelector('#branch-input')
  const branchValue = branchInputEl.value
  setBranch(branchValue)
  window.close()
}

function setBranch(branchValue) {
  chrome.storage.local.set({
    [PROJECT_BRANCH_KEY]: branchValue,
  })
}

function clearBranch() {
  setBranch(null)
}
