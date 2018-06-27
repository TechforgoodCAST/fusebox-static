/*jslint es6 */

export default {all};

function all(str, keys = []) {
    if (!str) {
        return {};
    }

    const params = {};

    keys.forEach(function (k) {
        const regex = new RegExp('[?&]' + k + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(str);

        if (!results || !results[2]) {
            return;
        }

        params[k] = decodeURIComponent(results[2].replace(/\+/g, " "));
    });

    return params;
}