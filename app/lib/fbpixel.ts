export const FB_PIXEL_ID = '1414284940077637';

declare global {
    interface Window {
        fbq: (...args: any[]) => void;
    }
}

export const pageview = () => {
    window.fbq("track", "PageView");
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: any, options = {}) => {
    window.fbq("track", name, options);
};
