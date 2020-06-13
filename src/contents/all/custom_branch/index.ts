import './index.scss'

import { setProjectCustomApi, setWikiCustomApi } from './set_custom_api';
import { showCustomApiInfo, syncCustomApiInfo } from './show_custom_api_info';
import { BranchSettingChange } from '../../../common/message_type';
import { getBranchSetting } from '../../../popup/service/branch_setting';

const setAllCustomApi = () => Promise.all([setProjectCustomApi(), setWikiCustomApi()]);

const updateCustomApiInfo = () =>
    setAllCustomApi().then(() => {
        syncCustomApiInfo();
    });

const addEventListeners = () => {
    window.addEventListener('hashchange', () => {
        updateCustomApiInfo();
    });

    chrome.runtime.onMessage.addListener((message) => {
        const type = message ? message.type : null;
        if (type === BranchSettingChange) {
            updateCustomApiInfo();
        }
    });

    // chrome.tabs.getCurrent((tab) => {
    //     const id = tab?.id
    //     if(id) {
    //         chrome.tabs.onActivated.addListener((activeTab) => {
    //             if(activeTab.tabId === id) {
    //                 updateCustomApiInfo()
    //             }
    //         })
    //     }
    // })
};

export function run(): void {
    setAllCustomApi().then(async () => {
        const branchSetting = await getBranchSetting()
        if(branchSetting.showBranchInfo) {
            showCustomApiInfo();
        }
    });

    addEventListeners();
}
