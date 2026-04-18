module.exports = {
  apps: [
    {
      name: 'bold-whatsapp-bot',
      cwd: '/home/dev/bold-whatsapp-bot',
      script: 'dist/index.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
