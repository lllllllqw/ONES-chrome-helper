console.log('popup load!')

const branchInputEl = document.querySelector('#branch-input')
branchInputEl.addEventListener('change', (e) => {
  const branchValue = e.target.value
  chrome.storage.local.set({
    'branch': branchValue || null,
  })
})

