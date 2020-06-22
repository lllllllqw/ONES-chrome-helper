import { HeaderCustomer, Headers } from '../utils/header_customer';
import { PROJECT_BRANCH_KEY, WIKI_BRANCH_KEY } from '../../common/constants';
import { customApiService } from '../../popup/service';

function syncApiSetting(headerCustomer: HeaderCustomer) {
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

async function syncPatterns(headerCustomer: HeaderCustomer) {
    const customApiData = await customApiService.getCustomApi();
    const { customApiPatterns } = customApiData;
    const patterns: string[] = customApiPatterns
        .filter((patternConfig) => {
            return patternConfig.enable;
        })
        .map((patternConfig) => {
            return patternConfig.pattern;
        });
    headerCustomer.setPatterns(patterns || []);
}

export function customApi(): void {
    const headerCustomer = new HeaderCustomer();
    syncApiSetting(headerCustomer);
    syncPatterns(headerCustomer);

    chrome.storage.onChanged.addListener(() => {
        syncApiSetting(headerCustomer);
        syncPatterns(headerCustomer);
    });
}
