module.exports = {
    "env": {
        "browser": true,
		"node": true,
		"es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
	"parserOptions": {
		"sourceType": "module"
	}
};