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

const DOM_SCOPE = 'och__';
const WRAPPER_EL_ID = `och__custom-api-info`;

function addStylesheet() {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .${DOM_SCOPE}api-info-wrapper {
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
  document.body.append(styleEl);
}

function createOptionEl({
  name,
  value
}) {
  const optionEl = document.createElement('div');
  optionEl.className = `${DOM_SCOPE}api-info-option`;
  optionEl.innerText = `${name}：${value}`;
  return optionEl
}

function getInfoOptionElList() {
  const projectBranch = localStorage.getItem(PROJECT_BRANCH_KEY);
  const projectBranchInfoEl = createOptionEl({
    name: 'project api',
    value: projectBranch || '默认'
  });
  return [projectBranchInfoEl]
}

function showCustomApiInfo() {
  addStylesheet();
  const wrapperEl = document.createElement('div');
  wrapperEl.className = `${DOM_SCOPE}api-info-wrapper`;
  wrapperEl.id = WRAPPER_EL_ID;
  const optionElList = getInfoOptionElList();
  wrapperEl.append(...optionElList);
  document.body.append(wrapperEl);
}

function syncCustomApiInfo() {
  const wrapperEl = document.querySelector(`#${WRAPPER_EL_ID}`);
  const optionElList = getInfoOptionElList();
  wrapperEl.innerHTML = '';
  wrapperEl.append(...optionElList);
}

const CUSTOM_API_CHANGED = 'customApiChanged';

const setAllCustomApi = () => Promise.all([
  setProjectCustomApi(),
  setWikiCustomApi()
]);

const updateCustomApiInfo = () => setAllCustomApi()
  .then(() => {
    syncCustomApiInfo();
  });

const addEventListeners = () => {
  window.addEventListener('hashchange', () => {
    updateCustomApiInfo();
  });

  chrome.runtime.onMessage.addListener((message) => {
    const type = message ? message.type : null;
    if(type === CUSTOM_API_CHANGED) {
      updateCustomApiInfo();
    }
  });
};

function run() {
  setAllCustomApi()
    .then(() => {
      showCustomApiInfo();
    });

  addEventListeners();
}

run();
