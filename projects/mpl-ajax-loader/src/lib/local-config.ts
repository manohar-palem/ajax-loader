import { MplAjaxLoaderVisibilityOptions, MplAjaxLoaderContentOptions, MplAjaxLoaderOptions } from './mpl-ajax-loader.options';

export const DEFAULT_CLOSE_ICON_VISIBILITY_OPTIONS: MplAjaxLoaderVisibilityOptions = {
    progress: false,
    error: true,
    cancelled: true,
    success: true
};

export const DEFAULT_LOADER_VISIBILITY_OPTIONS: MplAjaxLoaderVisibilityOptions = {
    progress: true,
    error: true,
    cancelled: true,
    success: false
};

export const DEFAULT_LOADER_TEXT_OPTIONS: MplAjaxLoaderContentOptions = {
    progress: 'Please wait, request is in progress... ',
    error: 'Unknown Error in API call... ',
    success: 'API Call is processed successfully... ',
    cancelled: 'API call is cancelled'
};

export const DEFAULT_LOADER_TEMPLATE_OPTIONS: MplAjaxLoaderContentOptions = {
    progress: `
        <div class="progress pos-abs v-center h-center">
            <span>Please wait, request is in progress...</span>
        </div>
    `,
    error: `
        <div class="error pos-abs v-center h-center">
            <span>Error in API call</span>
        </div>
    `,
    success: `
        <div class="error pos-abs v-center h-center">
            <span>API call is success</span>
        </div>
    `,
    cancelled: `
        <div class="cencelled pos-abs v-center h-center">
            <span>API call is cancelled</span>
        </div>
    `
};

export const DEFAULT_OPTIONS: MplAjaxLoaderOptions = {
    closeIcon: DEFAULT_CLOSE_ICON_VISIBILITY_OPTIONS,
    loader: DEFAULT_LOADER_VISIBILITY_OPTIONS,
    text: DEFAULT_LOADER_TEXT_OPTIONS,
    template: DEFAULT_LOADER_TEMPLATE_OPTIONS
};

export function updateDefaultOptions(options: MplAjaxLoaderOptions) {
    DEFAULT_OPTIONS.closeIcon = {
        ...DEFAULT_OPTIONS.closeIcon,
        ...options.closeIcon
    };
    DEFAULT_OPTIONS.loader = {
        ...DEFAULT_OPTIONS.loader,
        ...options.loader
    };
    DEFAULT_OPTIONS.text = {
        ...DEFAULT_OPTIONS.text,
        ...options.text
    };
    DEFAULT_OPTIONS.template = {
        ...DEFAULT_OPTIONS.template,
        ...options.template
    };
}