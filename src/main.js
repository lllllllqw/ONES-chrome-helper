initBranchInput()
initBranchButtons()

function initBranchInput() {
  chrome.storage.local.get(['branch'], ({ branch }) => {
    const branchInputEl = document.querySelector('#branch-input')
    branchInputEl.value = branch
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
    branch: branchValue,
  })
}

function clearBranch() {
  setBranch(null)
}
