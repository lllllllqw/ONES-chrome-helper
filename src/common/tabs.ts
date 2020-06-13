import get from 'lodash/get';

export function getCurrentTab(): Promise<chrome.tabs.Tab> {
    return new Promise<chrome.tabs.Tab>((resolve, reject) => {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true,
            },
            (tabs) => {
                const tab = get(tabs, [0]);
                if (tab) {
                    resolve(tab);
                } else {
                    reject(new Error('tab not found'));
                }
            },
        );
    });
}
