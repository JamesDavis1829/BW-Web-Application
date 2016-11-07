import { HttpSoftAP } from "./HttpSoftAP.js";

var defaultPortMapping = {
    http: 80
};

function SoftAPSetup(options) {
    var opts = {
        host: '192.168.0.1',
        keepAlive: true,
        timeout: 2000,
        noDelay: true,
        channel: 6,
        protocol: 'http'
    };
    if (options && typeof options == 'object') {
        Object.keys(options).forEach(function _loadOpts(key) {
            opts[key] = options[key];
        });
    }

    if (!opts.port) {
        opts.port = defaultPortMapping[opts.protocol];
    }

    if (opts.protocol === 'http') {
        return new HttpSoftAP(opts);
    } else {
        throw new Error('unknown protocol');
    }
}

export { SoftAPSetup };