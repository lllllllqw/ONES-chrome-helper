'use strict';

const PROJECT_BRANCH_KEY = 'customONESApiWikiBranch';
const WIKI_BRANCH_KEY = 'customONESApiWikiBranch';

function setCustomApi(storageKey, prefix) {
  chrome.storage.local.get([storageKey], (data) => {
    const branch = data[storageKey];
    if(branch) {
      console.log(`set ${storageKey}`, branch);
      localStorage.setItem(storageKey, `${prefix}/${branch}/`);
    } else {
      localStorage.removeItem(storageKey);
    }
  });
}

function setProjectCustomApi() {
  setCustomApi(PROJECT_BRANCH_KEY, '/project');
}

function setWikiCustomApi() {
  setCustomApi(WIKI_BRANCH_KEY, '/wiki');
}

function run() {
  setProjectCustomApi();
  setWikiCustomApi();
}

run();
