module.exports = {
  apps : [{
    name: "Chatroom_Backend",
    script: "./bin/www",
    exec_mode: 'cluster',
    instances: 1 ,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}