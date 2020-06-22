export type Headers = chrome.webRequest.HttpHeader[];

// function isLeancloudUrl(url: string) {
//     return url.includes('leancloud.cn');
// }

// function isAliCDNUrl(url: string) {
//     return url.includes('at.alicdn.com');
// }

// function isSentryURL(url: string) {
//     return url.includes('sentry.io');
// }

// function isIgnoreUrl(url: string) {
//     return isLeancloudUrl(url) || isAliCDNUrl(url) || isSentryURL(url);
// }

export class HeaderCustomer {
    private headers: Headers = [];

    private patterns: string[] = [];

    constructor() {
        this.addCustomHeadersListener();
    }

    getHeaders = (): Headers => {
        return this.headers;
    };

    setHeaders = (headers: Headers): void => {
        this.headers = headers;
    };

    getPatterns = (): string[] => {
        return this.patterns;
    };

    setPatterns = (patterns: string[]): void => {
        this.patterns = patterns;
        this.onPatternsChange();
    };

    handleRequest = (
        details: chrome.webRequest.WebRequestHeadersDetails,
    ): chrome.webRequest.BlockingResponse => {
        if (details.requestHeaders) {
            details.requestHeaders.push(...this.getHeaders());
        }
        return { requestHeaders: details.requestHeaders };
    };

    addCustomHeadersListener = (): void => {
        chrome.webRequest.onBeforeSendHeaders.addListener(
            this.handleRequest,
            {
                urls: this.patterns,
            },
            ['blocking', 'requestHeaders'],
        );
    };

    removeCustomHeadersListener = (): void => {
        if (chrome.webRequest.onBeforeSendHeaders.hasListener(this.handleRequest)) {
            chrome.webRequest.onBeforeSendHeaders.removeListener(this.handleRequest);
        }
    };

    onPatternsChange = (): void => {
        this.removeCustomHeadersListener();
        this.addCustomHeadersListener();
    };
}
