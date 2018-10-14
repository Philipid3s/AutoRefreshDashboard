const pkg = require('../package');

module.exports = {
    app: {
        name: pkg.name,
        version: pkg.version,
        
    },
    server: {
        port: process.env.PORT || 3000
    },
    db: {
        user: '',
        password: '',
        server: '',
        database: '',
    
        options: {
            encrypt: false // Use this if you're on Windows Azure
        }
    }
};