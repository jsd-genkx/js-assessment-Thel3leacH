"use strict";
// JS Assessment: Find Your Hat //
import promptSync from "prompt-sync";
import clear from "clear-screen";

const prompt = promptSync({ sigint: true });


const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
	constructor(field = [[]]) {
		this.field = field;

		// Replace with your own code //
		// Set the home position at (0, 0) before the game starts
		this.positionRow = 0;
		this.positionCol = 0;
		this.field[this.positionRow][this.positionCol] = pathCharacter;
		this.gameOver = false;
	}

	// Print field //
	print() {
		clear();

		// Replace with your own code //
		for (let row of this.field) {
			console.log(row.join(" "));
		}
	}

	// Your Code //
	moveRight() {
		this.positionCol++;
		this.checkPosition();
	}
	moveLeft() {
		this.positionCol--;
		this.checkPosition();
	}
	moveUp() {
		this.positionRow--;
		this.checkPosition();
	}
	moveDown() {
		this.positionRow++;
		this.checkPosition();
	}

	checkPosition() {
		if (this.positionRow < 0 || this.positionRow >= this.field.length ||
			this.positionCol < 0 || this.positionCol >= this.field[0].length
		) {
			console.log("You out of the field Loser 💀 !!")
			this.gameOver = true;
			return;
		};

		const position = this.field[this.positionRow][this.positionCol];

		if (position === hole) {
			console.log("Loses 💀 by landing on (and falling in) a hole.");
			this.gameOver = true;
			return;
		}
		if (position === hat) {
			console.log("Win, You founded a hat 🎩");
			this.gameOver = true;
			return;
		}
		this.field[this.positionRow][this.positionCol] = pathCharacter;
	}

	static generateField(height, width, percentHole = 0.5) {
		
	}
}


// Game Mode ON
// Remark: Code example below should be deleted and use your own code.
const myGame = new Field([
	["░", "░", "O"],
	["░", "O", "░"],
	["░", "^", "░"],
]);

while (!myGame.gameOver) {
	myGame.print();
	const input = prompt("Which way ? : ");

	switch (input) {
		case "w":
			myGame.moveUp();
			break;
		case "s":
			myGame.moveDown();
			break;
		case "a":
			myGame.moveLeft();
			break;
		case "d":
			myGame.moveRight();
			break;
		default:
			console.log("Invalid input You should use 'w', 'a, 's', 'd'");
			myGame.gameOver = true;
	}
}
