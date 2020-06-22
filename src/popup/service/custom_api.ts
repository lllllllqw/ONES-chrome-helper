import { CustomApiChange } from '../../common/message_type';
import { getCurrentTab } from '../../common/tabs';
import {
    ONES_HOST_KEY,
    PROJECT_BRANCH_KEY,
    WIKI_BRANCH_KEY,
    SHOW_BRANCH_INFO,
    CUSTOM_API_PATTERNS,
} from '../../common/constants';

export interface PatternConfig {
    enable: boolean;
    pattern: string;
}

export interface BranchData {
    [ONES_HOST_KEY]: Nullable<string>
    [PROJECT_BRANCH_KEY]: Nullable<string>;
    [WIKI_BRANCH_KEY]: Nullable<string>;
    [SHOW_BRANCH_INFO]: boolean;
    [CUSTOM_API_PATTERNS]: PatternConfig[];
}

const defaultPatterns: PatternConfig[] = [
    {
        enable: true,
        pattern: 'https://dev.myones.net/*',
    },
    {
        enable: true,
        pattern: 'http://dev.localhost:3000/*',
    },
];

export function getCustomApi(): Promise<BranchData> {
    return new Promise((resolve) => {
        chrome.storage.local.get(
            [ONES_HOST_KEY, PROJECT_BRANCH_KEY, WIKI_BRANCH_KEY, SHOW_BRANCH_INFO, CUSTOM_API_PATTERNS],
            (data) => {
                const branchData: BranchData = {
                    ...data,
                    [CUSTOM_API_PATTERNS]: data[CUSTOM_API_PATTERNS] || defaultPatterns,
                } as BranchData;
                resolve(branchData);
            },
        );
    });
}

export function saveCustomApi(branchData: Partial<BranchData>): Promise<void> {
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
