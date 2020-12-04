const fs = require("fs")

function part1() {
	const passports = fs
		.readFileSync("./passports.txt", { encoding: "utf-8" })
		.split(/(\r?\n){2}/)
		.map(x => x.replace(/\r?\n/g, " ").trim())
		.filter(x => x.length > 0)

	const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

	let validPassports = 0
	for (const passport of passports) {
		if (requiredFields.every(requiredField => passport.includes(`${requiredField}:`)))
			validPassports++
	}

	return validPassports
}

function part2() {
	const passports = fs
		.readFileSync("./passports.txt", { encoding: "utf-8" })
		.split(/(\r?\n){2}/)
		.map(x => x.replace(/\r?\n/g, " ").trim())
		.filter(x => x.length > 0)

	function isPassportValid(passport) {
		return [
			isPassportValueValid(passport, "byr", /^19[2-9][0-9]|200[0-2]$/),
			isPassportValueValid(passport, "iyr", /^201[0-9]|2020$/),
			isPassportValueValid(passport, "eyr", /^202[0-9]|2030$/),
			isPassportValueValid(passport, "hgt", /^((1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in)$/),
			isPassportValueValid(passport, "hcl", /^#[0-9a-f]{6}$/),
			isPassportValueValid(passport, "ecl", /^amb|blu|brn|gry|grn|hzl|oth$/),
			isPassportValueValid(passport, "pid", /^\d{9}$/),
		].every(x => x)
	}

	function isPassportValueValid(passport, key, valueRegex) {
		const matches = new RegExp(`${key}:(?<value>\\S+)`).exec(passport)
		if (!matches || matches.length === 0 || !matches.groups)
			return false

		return !!matches.groups.value.match(valueRegex)
	}

	return passports.reduce((validPassports, passport) => isPassportValid(passport) ? validPassports + 1 : validPassports, 0)
}

console.log(part1())
console.log(part2())
