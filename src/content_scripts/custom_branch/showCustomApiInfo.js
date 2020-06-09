import { PROJECT_BRANCH_KEY } from "../../common/constants"
const CLS_PREFIX = 'och__'

function addStylesheet() {
  const styleEl = document.createElement('style')
  styleEl.innerHTML = `
    .${CLS_PREFIX}api-info-wrapper {
      position: fixed;
      top: 10px;
      left: 50%;
      padding: 10px;
      background-color: yellow;
      opacity: 0.4;
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 999;
      border-radius: 5px;
    }
  `
  document.body.appendChild(styleEl)
}

function createOptionEl({
  name,
  value
}) {
  const optionEl = document.createElement('div')
  optionEl.className = `${CLS_PREFIX}api-info-option`
  optionEl.innerText = `${name}：${value}`
  return optionEl
}

export function showCustomApiInfo() {
  addStylesheet()
  const wrapperEl = document.createElement('div')
  wrapperEl.className = `${CLS_PREFIX}api-info-wrapper`
  const projectBranch = localStorage.getItem(PROJECT_BRANCH_KEY)
  const projectBranchInfoEl = createOptionEl({
    name: 'project api',
    value: projectBranch
  })
  wrapperEl.appendChild(projectBranchInfoEl)
  document.body.appendChild(wrapperEl)
}