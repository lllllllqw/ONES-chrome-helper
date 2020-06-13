import { BranchSettingChange } from '../../common/message_type';
import { getCurrentTab } from '../../common/tabs';
import { PROJECT_BRANCH_KEY, WIKI_BRANCH_KEY, SHOW_BRANCH_INFO } from '../../common/constants';

export interface BranchData {
    [PROJECT_BRANCH_KEY]: Nullable<string>,
    [WIKI_BRANCH_KEY]: Nullable<string>,
    [SHOW_BRANCH_INFO]: boolean
}

export function getBranchSetting(): Promise<BranchData> {
    return new Promise((resolve) => {
        chrome.storage.local.get([PROJECT_BRANCH_KEY, WIKI_BRANCH_KEY, SHOW_BRANCH_INFO], (data) => {
            resolve(data as BranchData);
        });
    });
}

export function saveBranchSetting(branchData: BranchData): Promise<void> {
    return new Promise<void>((resolve) => {
        chrome.storage.local.set(
            branchData,
            () => {
                getCurrentTab().then((tab) => {
                    const { id } = tab;
                    if (id) {
                        chrome.tabs.sendMessage(id, {
                            type: BranchSettingChange,
                        });
                    }
                    resolve();
                });
            },
        );
    });
}
