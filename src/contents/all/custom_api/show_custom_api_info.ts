import { ONES_HOST_KEY, PROJECT_BRANCH_KEY } from '../../../common/constants';

const DOM_SCOPE = 'och__';
const WRAPPER_EL_ID = `och__custom-api-info`;

function createOptionEl({ name, value }: { name: string; value: string }) {
    const optionEl = document.createElement('div');
    optionEl.className = `${DOM_SCOPE}api-info-option`;
    optionEl.textContent = `${name}：${value}`;
    return optionEl;
}

function getInfoOptionElList(): Promise<HTMLElement[]> {
    return new Promise((resolve) => {
        chrome.storage.local.get([ONES_HOST_KEY, PROJECT_BRANCH_KEY], (data) => {

            const onesHost = data[ONES_HOST_KEY];
            const onesHostInfoEL = createOptionEl({
                name: 'API Host',
                value: onesHost || '默认'
            })

            const projectBranch = data[PROJECT_BRANCH_KEY];
            const projectBranchInfoEl = createOptionEl({
                name: 'API 分支',
                value: projectBranch || '默认',
            });
            if(projectBranch) {
                console.log('通过 ONES Chrome Helper 设定分支：', projectBranch)
            }
            resolve([onesHostInfoEL, projectBranchInfoEl]);
        });
    });
}

export async function showCustomApiInfo(): Promise<void> {
    const wrapperEl = document.createElement('div');
    wrapperEl.className = `${DOM_SCOPE}api-info-wrapper`;
    wrapperEl.id = WRAPPER_EL_ID;
    const optionElList = await getInfoOptionElList();
    wrapperEl.append(...optionElList);
    document.body.append(wrapperEl);
}

export async function syncCustomApiInfo(): Promise<void> {
    const wrapperEl = document.querySelector(`#${WRAPPER_EL_ID}`);
    if (wrapperEl) {
        const optionElList = await getInfoOptionElList();
        wrapperEl.innerHTML = '';
        wrapperEl.append(...optionElList);
    }
}
