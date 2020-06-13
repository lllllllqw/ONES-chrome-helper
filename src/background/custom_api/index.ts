import { HeaderCustomer, Headers } from '../utils/header_customer';
import { PROJECT_BRANCH_KEY, WIKI_BRANCH_KEY } from '../../common/constants';

export function customApi(): void {
    const headerCustomer = new HeaderCustomer([]);

    function syncApiSetting() {
        const headers: Headers = [];
        chrome.storage.local.get([PROJECT_BRANCH_KEY, WIKI_BRANCH_KEY], (data) => {
            const projectBranch = data[PROJECT_BRANCH_KEY];
            if (projectBranch) {
                headers.push({
                    name: 'x-ones-api-branch-project',
                    value: `/project/${projectBranch}/`,
                });
            }
            const wikiBranch = data[WIKI_BRANCH_KEY];
            if (wikiBranch) {
                headers.push({
                    name: 'x-ones-api-branch-wiki',
                    value: `/wiki/${wikiBranch}/`,
                });
            }
            headerCustomer.setHeaders(headers);
        });
    }

    syncApiSetting();

    chrome.storage.onChanged.addListener(() => {
        syncApiSetting();
    });
}
