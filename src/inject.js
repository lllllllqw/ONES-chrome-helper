chrome.storage.local.get(['branch'], ({branch}) => {
  if(branch) {
    localStorage.setItem('customONESApiProjectBranch', `/project/${branch || defaultBranch}/`)
  } else {
    localStorage.removeItem('customONESApiProjectBranch')
  }
})