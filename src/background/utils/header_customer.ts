export type Headers = chrome.webRequest.HttpHeader[];

function isLeancloudUrl(url: string) {
    return url.includes('leancloud.cn');
}

function isAliCDNUrl(url: string) {
    return url.includes('at.alicdn.com');
}

function isIgnoreUrl(url: string) {
    return isLeancloudUrl(url) || isAliCDNUrl(url);
}

function addCustomHeadersListener(getHeaders: () => Headers): void {
    chrome.webRequest.onBeforeSendHeaders.addListener(
        (details) => {
            if (details.requestHeaders && !isIgnoreUrl(details.url)) {
                details.requestHeaders.push(...getHeaders());
            }
            return { requestHeaders: details.requestHeaders };
        },
        {
            urls: ['http://*/*', 'https://*/*'],
        },
        ['blocking', 'requestHeaders'],
    );
}

export class HeaderCustomer {
    private headers: Headers = [];

    constructor(headers: Headers) {
        this.headers = headers;
        addCustomHeadersListener(this.getHeaders);
    }

    getHeaders = (): Headers => {
        return this.headers;
    };

    setHeaders = (headers: Headers): void => {
        this.headers = headers;
    };
}
