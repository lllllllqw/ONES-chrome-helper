'use strict';

const PROJECT_BRANCH_KEY = 'customONESApiProjectBranch';
const WIKI_BRANCH_KEY = 'customONESApiWikiBranch';

function setCustomApi(storageKey, prefix) {
  return new Promise((resolve) => {
    chrome.storage.local.get([storageKey], (data) => {
      const branch = data[storageKey];
      if(branch) {
        console.log(`set ${storageKey}`, branch);
        localStorage.setItem(storageKey, `${prefix}/${branch}/`);
      } else {
        localStorage.removeItem(storageKey);
      }
      resolve();
    });
  })
}

function setProjectCustomApi() {
  return setCustomApi(PROJECT_BRANCH_KEY, '/project')
}

function setWikiCustomApi() {
  return setCustomApi(WIKI_BRANCH_KEY, '/wiki')
}

const CLS_PREFIX = 'och__';

function addStylesheet() {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .${CLS_PREFIX}api-info-wrapper {
      position: fixed;
      right: 10px;
      bottom: 10px;
      padding: 5px 10px;
      background-color: yellow;
      opacity: 0.4;
      pointer-events: none;
      z-index: 999;
      border-radius: 5px;
    }
  `;
  document.body.appendChild(styleEl);
}

function createOptionEl({
  name,
  value
}) {
  const optionEl = document.createElement('div');
  optionEl.className = `${CLS_PREFIX}api-info-option`;
  optionEl.innerText = `${name}：${value}`;
  return optionEl
}

function showCustomApiInfo() {
  addStylesheet();
  const wrapperEl = document.createElement('div');
  wrapperEl.className = `${CLS_PREFIX}api-info-wrapper`;
  const projectBranch = localStorage.getItem(PROJECT_BRANCH_KEY);
  const projectBranchInfoEl = createOptionEl({
    name: 'project api',
    value: projectBranch || '默认'
  });
  wrapperEl.appendChild(projectBranchInfoEl);
  document.body.appendChild(wrapperEl);
}

function run() {
  Promise.all([
    setProjectCustomApi(),
    setWikiCustomApi()
  ])
    .then(() => {
      showCustomApiInfo();
    });
}

run();
