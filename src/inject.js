setProjectCustomApi()
setWikiCustomApi()

function setProjectCustomApi() {
  chrome.storage.local.get(['projectBranch'], ({projectBranch}) => {
    console.log("setProjectCustomApi：", projectBranch)
    if(projectBranch) {
      localStorage.setItem('customONESApiProjectBranch', `/project/${projectBranch}/`)
    } else {
      localStorage.removeItem('customONESApiProjectBranch')
    }
  })
}

function setWikiCustomApi() {
  chrome.storage.local.get(['wikiBranch'], ({wikiBranch}) => {
    console.log("setWikiCustomApi：", wikiBranch)
    if(wikiBranch) {
      localStorage.setItem('customONESApiWikiBranch', `/wiki/${wikiBranch}/`)
    } else {
      localStorage.removeItem('customONESApiWikiBranch')
    }
  })
}