import { memo } from "./memo";

export const instagram = memo(
    () =>
        new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.async = true;
            script.src = "//www.instagram.com/embed.js";
            script.onload = () => {
                if (window.instgrm) {
                    resolve(window.instgrm);
                } else {
                    reject(new Error("window.instgrm is undefined"));
                }
            };
            document.body.appendChild(script);
        }),
);

/**
 * Originated from 'utils/fetchApi.js'.
 */
export const fetchInstagram = async (path, opts) => {
    const options = {
        method: opts.method || "GET",
        headers: {
            Accept: "application/json",
            ...opts.headers,
        },
    };

    let url = `https://api.instagram.com/${path}/`;

    if (opts.body) {
        try {
            options.body = JSON.stringify(opts.body);
        } catch (error) {
            console.log(error);
        }
    }

    if (opts.params) {
        url += `?${Object.keys(opts.params)
            .map(e => `${e}=${opts.params[e]}`)
            .join("&")}`;
    }

    const response = await fetch(url, options);
    const body = await response.json();

    if (!response.ok) {
        return Promise.reject(body.error);
    }

    return body;
};
