const fs = require("fs")

function part1() {
	const expenses = fs
		.readFileSync("./expense-report.txt", { encoding: "utf-8" })
		.split("\n")
		.map(x => x.trim())
		.filter(x => x.length > 0)
		.map(x => parseInt(x))

	const expensesLookup = expenses.reduce((value, current) => ({ ...value, [current]: true }), {})

	for (const value in expensesLookup) {
		const remainder = 2020 - value
		if (expensesLookup[remainder] === undefined)
			continue

		return value * remainder
	}
}

function part2() {
	const expenses = fs
		.readFileSync("./expense-report.txt", { encoding: "utf-8" })
		.split("\n")
		.map(x => x.trim())
		.filter(x => x.length > 0)
		.map(x => parseInt(x))

	for (let i = 0; i < expenses.length; i++) {
		for (let j = 0; j < expenses.length; j++) {
			if (i === j)
				continue
			for (let k = 0; k < expenses.length; k++) {
				if (i === k || j === k)
					continue

				const value1 = expenses[i]
				const value2 = expenses[j]
				const value3 = expenses[k]
				if (value1 + value2 + value3 !== 2020)
					continue

				return value1 * value2 * value3
			}
		}
	}
}

console.log(part1())
console.log(part2())
