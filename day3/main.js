const fs = require("fs")

function part1() {
	const map = fs
		.readFileSync("./map.txt", { encoding: "utf-8" })
		.split("\n")
		.map(row => row.trim())
		.filter(row => row.length > 0)
		.map(row => row.split("").map(column => ({ isTree: column === "#" })))

	let step = 0
	let treesEncountered = 0
	while (true) {
		const column = step * 3
		const row = step

		if (row >= map.length)
			break

		if (map[row][column % map[row].length].isTree)
			treesEncountered++

		step++
	}

	return treesEncountered
}

function part2() {
	const map = fs
		.readFileSync("./map.txt", { encoding: "utf-8" })
		.split("\n")
		.map(row => row.trim())
		.filter(row => row.length > 0)
		.map(row => row.split("").map(column => ({ isTree: column === "#" })))

	function getTreesEncountered(stepsRight, stepsDown) {
		let step = 0
		let treesEncountered = 0
		while (true) {
			const column = step * stepsRight
			const row = step * stepsDown

			if (row >= map.length)
				break

			if (map[row][column % map[row].length].isTree)
				treesEncountered++

			step++
		}

		return treesEncountered
	}

	return [
		getTreesEncountered(1, 1),
		getTreesEncountered(3, 1),
		getTreesEncountered(5, 1),
		getTreesEncountered(7, 1),
		getTreesEncountered(1, 2),
	].reduce((value, current) => value * current, 1)
}

console.log(part1())
console.log(part2())
