module.exports = {
    bootstrap: {
        path: 'index.js'
    },
    moduleTypes: {
        animation: {
            path: '**/animations/*.js',
            casing: 'paramCase'
        },
        constant: {
            path: '**/constants/*.js',
            casing: 'constant'
        },
        controller: {
            path: '**/controllers/*.js',
            casing: 'pascalCase',
            suffix: 'Ctrl'
        },
        directive: {
            path: '**/directives/*.js',
            casing: 'camelCase'
        },
        factory: {
            path: '**/factories/*.js',
            casing: 'pascalCase'
        },
        filter: {
            path: '**/filters/*.js',
            casing: 'camelCase'
        },
        provider: {
            path: '**/providers/*.js',
            casing: 'camelCase'
        },
        service: {
            path: '**/services/*.js',
            casing: 'camelCase'
        },
        value: {
            path: '**/values/*.js',
            casing: 'camelCase'
        },
        // config modules are pulled in like this: app.config(require('./path/to-config'))
        config: {
            path: '**/*-config.js'
        }
    }
};
