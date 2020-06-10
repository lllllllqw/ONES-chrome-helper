'use strict';

const PROJECT_BRANCH_KEY = 'customONESApiProjectBranch';

const CUSTOM_API_CHANGED = 'customApiChanged';

function getCurrentTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      const tab = tabs[0];
      if(tab) {
        resolve(tab);
      } else {
        reject(new Error('tab not found'));
      }
    });
  })
}

initBranchInput();
initBranchButtons();

function initBranchInput() {
  chrome.storage.local.get([PROJECT_BRANCH_KEY], (data) => {
    const projectBranch = data[PROJECT_BRANCH_KEY];
    const branchInputEl = document.querySelector('#branch-input');
    branchInputEl.value = projectBranch || '';
    branchInputEl.focus();

    const ENTER_KEY = 13;
    branchInputEl.addEventListener('keydown', (e) => {
      if(e.keyCode === ENTER_KEY) {
        confirmInput();
      }
    });
  });
}

function initBranchButtons() {
  const confirmButtonEl = document.querySelector('#confirm');
  confirmButtonEl.addEventListener('click', () => {
    confirmInput();
  });

  const resetButtonEl = document.querySelector('#reset');
  resetButtonEl.addEventListener('click', () => {
    clearBranch();
  });
}

function confirmInput() {
  const branchInputEl = document.querySelector('#branch-input');
  const branchValue = branchInputEl.value;
  setBranch(branchValue);
}

function setBranch(branchValue) {
  return new Promise((resolve) => {
    chrome.storage.local.set({
      [PROJECT_BRANCH_KEY]: branchValue,
    }, () => {
      return getCurrentTab()
        .then((tab) => {
          const { id } = tab;
          if(id) {
            chrome.tabs.sendMessage(id, {
              type: CUSTOM_API_CHANGED
            });
          }
        })
    });
  })
}

function clearBranch() {
  return setBranch(null)
}
