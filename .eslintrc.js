module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "extends": "fullstack",
  "rules": {
    "semi": 0,
    "new-cap": [1, { "capIsNewExceptions": ["Router"] }],
    "max-statements": 0,
    "complexity": 0,
    "max-depth": "off",
    "id-length": [
      1,
      {
        "exceptions": [
          "x",
          "y",
          "i",
          "j",
          "R"
        ]
      }
    ]
  }
}
