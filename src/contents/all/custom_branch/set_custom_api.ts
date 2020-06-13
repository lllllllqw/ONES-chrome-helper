import { PROJECT_BRANCH_KEY, WIKI_BRANCH_KEY } from '../../../common/constants';

function setCustomApi(storageKey: string, prefix: string) {
    return new Promise<void>((resolve) => {
        chrome.storage.local.get([storageKey], (data) => {
            const branch = data[storageKey];
            if (branch) {
                console.log(`set ${storageKey}`, branch);
                localStorage.setItem(storageKey, `${prefix}/${branch}/`);
            } else {
                localStorage.removeItem(storageKey);
            }
            resolve();
        });
    });
}

export function setProjectCustomApi(): Promise<void> {
    return setCustomApi(PROJECT_BRANCH_KEY, '/project');
}

export function setWikiCustomApi(): Promise<void> {
    return setCustomApi(WIKI_BRANCH_KEY, '/wiki');
}