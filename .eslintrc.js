module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "extends": "fullstack",
  "rules": {
    "no-mixed-requires": 0,
    "semi": 0,
    "new-cap": [1, { "capIsNewExceptions": ["Router"] }],
    "max-statements": 0,
    "complexity": 0,
    "max-depth": "off",
    "no-unused-vars": 0,
    "no-return-assign": 0,
    "no-shadow": 0,
    "guard-for-in": 0,
    "no-unused-expressions": 0,
    "react/display-name": 0,
    "id-length": [
      1,
      {
        "exceptions": [
          "x",
          "y",
          "i",
          "j",
          "R",
          "m",
          "t"
        ]
      }
    ]
  }
}
