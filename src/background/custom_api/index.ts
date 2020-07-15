import { HeaderCustomer, HeaderCustomerOptions, Headers } from '../utils/header_customer';
import { PROJECT_BRANCH_KEY, ONES_HOST_KEY } from '../../common/constants';
import { customApiService } from '../../service';

function syncApiSetting(headerCustomer: HeaderCustomer) {
    chrome.storage.local.get([ONES_HOST_KEY, PROJECT_BRANCH_KEY], (data) => {
        const headerBuilder: HeaderCustomerOptions['headersBuilder'] = (details) => {
            const headers: Headers = [];
            const customHOST = data[ONES_HOST_KEY];
            if (customHOST) {
                headers.push({
                    name: 'x-ones-api-host',
                    value: customHOST,
                })
            } else {
                const projectBranch = data[PROJECT_BRANCH_KEY];
                if (projectBranch) {
                    const isProjectApi = details.url.includes('/api/project')
                    const prefix = isProjectApi ? '/project' : '/wiki'
                    const value = `${prefix}/${projectBranch}/`
                    headers.push({
                        name: 'x-ones-api-branch-project',
                        value,
                    });
                    headers.push({
                        name: 'x-ones-api-branch-wiki',
                        value,
                    });
                }
            }
            return headers;
        }
        headerCustomer.setHeadersBuilder(headerBuilder);
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
