const fs = require("fs")

function part1() {
	const passwords = fs
		.readFileSync("./passwords.txt", { encoding: "utf-8" })
		.split("\n")
		.map(x => x.trim())
		.filter(x => x.length > 0)

	function isPasswordValid(passwordRow) {
		const rowRegex = /(?<low>\d+)-(?<high>\d+) (?<character>\w): (?<password>.+)/
		const match = rowRegex.exec(passwordRow)

		const lowerLimit = parseInt(match.groups.low)
		const higherLimit = parseInt(match.groups.high)
		const character = match.groups.character
		const password = match.groups.password

		const characterCount = password.split("").reduce((value, current) => current === character ? value + 1 : value, 0)
		return characterCount >= lowerLimit && characterCount <= higherLimit
	}

	return passwords.reduce((value, current) => isPasswordValid(current) ? value + 1 : value, 0)
}

function part2() {
	const passwords = fs
		.readFileSync("./passwords.txt", { encoding: "utf-8" })
		.split("\n")
		.map(x => x.trim())
		.filter(x => x.length > 0)

	function isPasswordValid(passwordRow) {
		const rowRegex = /(?<first>\d+)-(?<second>\d+) (?<character>\w): (?<password>.+)/
		const match = rowRegex.exec(passwordRow)

		const firstIndex = parseInt(match.groups.first) - 1
		const secondIndex = parseInt(match.groups.second) - 1
		const character = match.groups.character
		const password = match.groups.password

		return password[firstIndex] === character && password[secondIndex] !== character
			|| password[firstIndex] !== character && password[secondIndex] === character
	}

	return passwords.reduce((value, current) => isPasswordValid(current) ? value + 1 : value, 0)
}

console.log(part1())
console.log(part2())
