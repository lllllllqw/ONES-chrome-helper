import { PROJECT_BRANCH_KEY } from "../../common/constants"
const DOM_SCOPE = 'och__'
const WRAPPER_EL_ID = `och__custom-api-info`

function addStylesheet() {
  const styleEl = document.createElement('style')
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
  `
  document.body.append(styleEl)
}

function createOptionEl({
  name,
  value
}) {
  const optionEl = document.createElement('div')
  optionEl.className = `${DOM_SCOPE}api-info-option`
  optionEl.innerText = `${name}：${value}`
  return optionEl
}

function getInfoOptionElList() {
  const projectBranch = localStorage.getItem(PROJECT_BRANCH_KEY)
  const projectBranchInfoEl = createOptionEl({
    name: 'project api',
    value: projectBranch || '默认'
  })
  return [projectBranchInfoEl]
}

export function showCustomApiInfo() {
  addStylesheet()
  const wrapperEl = document.createElement('div')
  wrapperEl.className = `${DOM_SCOPE}api-info-wrapper`
  wrapperEl.id = WRAPPER_EL_ID
  const optionElList = getInfoOptionElList()
  wrapperEl.append(...optionElList)
  document.body.append(wrapperEl)
}

export function syncCustomApiInfo() {
  const wrapperEl = document.querySelector(`#${WRAPPER_EL_ID}`)
  const optionElList = getInfoOptionElList()
  wrapperEl.innerHTML = ''
  wrapperEl.append(...optionElList)
}