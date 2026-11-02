module.exports = {
  apps: [
    {
      name: 'inventrack-api',
      script: './dist/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      exp_backoff_restart_delay: 100,
      listen_timeout: 10000,
      kill_timeout: 10000,
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};

