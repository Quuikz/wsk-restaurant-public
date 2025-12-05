module.exports = {
  apps: [
    {
      name: "wsk-restaurant",
      script: "./server/src/index.js",
      instances: 1,
      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    }
  ]
};

