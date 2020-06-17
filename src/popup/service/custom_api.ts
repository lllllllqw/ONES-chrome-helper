import { CustomApiChange } from '../../common/message_type';
import { getCurrentTab } from '../../common/tabs';
import { PROJECT_BRANCH_KEY, WIKI_BRANCH_KEY, SHOW_BRANCH_INFO, ONES_HOST_KEY } from '../../common/constants';

export interface BranchData {
    [ONES_HOST_KEY]: Nullable<string>
    [PROJECT_BRANCH_KEY]: Nullable<string>;
    [WIKI_BRANCH_KEY]: Nullable<string>;
    [SHOW_BRANCH_INFO]: boolean;
}

export function getCustomApi(): Promise<BranchData> {
    return new Promise((resolve) => {
        chrome.storage.local.get(
            [ONES_HOST_KEY, PROJECT_BRANCH_KEY, WIKI_BRANCH_KEY, SHOW_BRANCH_INFO],
            (data) => {
                resolve(data as BranchData);
            },
        );
    });
}

export function saveCustomApi(branchData: BranchData): Promise<void> {
    return new Promise<void>((resolve) => {
        chrome.storage.local.set(branchData, () => {
            getCurrentTab().then((tab) => {
                const { id } = tab;
                if (id) {
                    chrome.tabs.sendMessage(id, {
                        type: CustomApiChange,
                    });
                }
                resolve();
            });
        });
    });
}
