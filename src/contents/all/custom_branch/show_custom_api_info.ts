import { PROJECT_BRANCH_KEY, WIKI_BRANCH_KEY } from '../../../common/constants';

const DOM_SCOPE = 'och__';
const WRAPPER_EL_ID = `och__custom-api-info`;


function createOptionEl({ name, value }: { name: string; value: string }) {
    const optionEl = document.createElement('div');
    optionEl.className = `${DOM_SCOPE}api-info-option`;
    optionEl.textContent = `${name}：${value}`;
    return optionEl;
}

function getInfoOptionElList() {
    const projectBranch = localStorage.getItem(PROJECT_BRANCH_KEY);
    const projectBranchInfoEl = createOptionEl({
        name: 'Project API',
        value: projectBranch || '默认',
    });
    const wikiBranch = localStorage.getItem(WIKI_BRANCH_KEY);
    const wikiBranchInfoEl = createOptionEl({
        name: 'Wiki API',
        value: wikiBranch || '默认',
    });
    return [projectBranchInfoEl, wikiBranchInfoEl];
}

export function showCustomApiInfo(): void {
    const wrapperEl = document.createElement('div');
    wrapperEl.className = `${DOM_SCOPE}api-info-wrapper`;
    wrapperEl.id = WRAPPER_EL_ID;
    const optionElList = getInfoOptionElList();
    wrapperEl.append(...optionElList);
    document.body.append(wrapperEl);
}

export function syncCustomApiInfo(): void {
    const wrapperEl = document.querySelector(`#${WRAPPER_EL_ID}`);
    if (wrapperEl) {
        const optionElList = getInfoOptionElList();
        wrapperEl.innerHTML = '';
        wrapperEl.append(...optionElList);
    }
}
