module.exports = {
  apps: [
    {
      name: "MONITOR-PPPOE",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 4111,
      },
    },
  ],
};
