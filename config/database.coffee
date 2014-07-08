module.exports =
  development:
    driver: "mongoose"
    url: "mongodb://localhost/swally-dev"

  test:
    driver: "mongoose"
    url: "mongodb://localhost/swally-test"

  production:
    driver: "mongoose"
    url: "mongodb://heroku_app12577889_B:4yZIjKCEbnUge0XiVgOW@ds031277.mongolab.com:31277/heroku_app12577889"
