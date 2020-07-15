export type Headers = chrome.webRequest.HttpHeader[];

export interface HeaderCustomerOptions {
    headersBuilder: (details: chrome.webRequest.WebRequestDetails) => Headers;
}

export class HeaderCustomer {
    
    private patterns: string[] = [];
    
    options: HeaderCustomerOptions = {
        headersBuilder: () => []
    }

    constructor() {
        this.addCustomHeadersListener();
    }

    buildHeaders = (details: chrome.webRequest.WebRequestDetails): Headers => {
        return this.options.headersBuilder ? this.options.headersBuilder(details) : [];
    };

    setHeadersBuilder = (headersBuilder: HeaderCustomerOptions['headersBuilder']): void => {
        this.options.headersBuilder = headersBuilder;
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
            details.requestHeaders.push(...this.buildHeaders(details));
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
