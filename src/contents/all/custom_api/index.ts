import './index.scss';

import { showCustomApiInfo, syncCustomApiInfo } from './show_custom_api_info';
import { CustomApiChange } from '../../../common/message_type';
import { getCustomApi } from '../../../popup/service/custom_api';

const addEventListeners = () => {
    window.addEventListener('hashchange', () => {
        syncCustomApiInfo();
    });

    chrome.runtime.onMessage.addListener((message) => {
        const type = message ? message.type : null;
        if (type === CustomApiChange) {
            syncCustomApiInfo();
        }
    });
};

export async function showCustomApi(): Promise<void> {
    const branchSetting = await getCustomApi();
    if (branchSetting.showBranchInfo) {
        showCustomApiInfo();
    }
    addEventListeners();
}
