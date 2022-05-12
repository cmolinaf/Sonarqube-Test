const config = {
	preset: "react-native",
	verbose: true,
	moduleFileExtensions: [
		"ts",
		"tsx",
		"js",
		"jsx",
		"json",
		"node"
	],
	setupFilesAfterEnv: [
		"<rootDir>/setup-jest.js"
	],
	transformIgnorePatterns: [
		"/node_modules/(?!(@react-native|react-native|@react-navigation|rn-fetch-blob)).*/"
	]
}

module.exports = config