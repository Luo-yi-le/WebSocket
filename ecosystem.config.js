module.exports = {
    apps: [
        // {
        //     name: 'Html_Server',
        //     script: 'src/server/websocket/htmlServer.js',
        //     out_file: "src/assets/pm2_logs/info.log",
        //     error_file: "src/assets/pm2_logs/error.log",
        //     instances: 1,
        //     autorestart: true,
        //     watch: false,
        //     max_memory_restart: '500M',
        //     env: {
        //         NODE_ENV: 'development'
        //     }
        // },
        // {
        //     name: 'ws_Server',
        //     script: 'src/server/websocket/wsServer.js',
        //     out_file: "src/assets/pm2_logs/ws_Server_info.log",
        //     error_file: "src/assets/pm2_logs/ws_Server_error.log",
        //     instances: 1,
        //     autorestart: true,
        //     watch: false,
        //     max_memory_restart: '500M',
        //     env: {
        //         NODE_ENV: 'development'
        //     }
        // },
         {
            name: 'launchJs',
            script: 'src/server/launch.js',
            out_file: "src/assets/pm2_logs/launch_info.log",
            error_file: "src/assets/pm2_logs/launch_error.log",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1024M',
            env: {
                NODE_ENV: 'development'
            }
        }
        ,{
            name: 'src_Server',
            script: 'bin/www.js',
            args: ["-d", "./resource"],
            out_file: "src/assets/pm2_logs/src_Server_info.log",
            error_file: "src/assets/pm2_logs/src_Server_error.log",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '500M',
            env: {
                NODE_ENV: 'development'
            }
        }
    ],

    deploy: {
        production: {
            user: 'node',
            host: '212.83.163.1',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/production',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
        }
    }
};
