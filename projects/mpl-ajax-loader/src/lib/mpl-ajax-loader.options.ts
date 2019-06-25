export interface MplAjaxLoaderVisibilityOptions {
    progress?: boolean;
    error?: boolean;
    success?: boolean;
    cancelled?: boolean;
}

export interface MplAjaxLoaderContentOptions {
    progress?: string;
    error?: string;
    success?: string;
    cancelled?: string;
}

export interface MplAjaxLoaderOptions {
    closeIcon?: MplAjaxLoaderVisibilityOptions;
    loader?: MplAjaxLoaderVisibilityOptions;
    text?: MplAjaxLoaderContentOptions;
    template?: MplAjaxLoaderContentOptions;
    classNames?: string;
}