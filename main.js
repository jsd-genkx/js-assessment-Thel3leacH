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

	// Your Code : Move method //
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
		// Move out of the field condition
		if (this.positionRow < 0 || this.positionRow >= this.field.length ||
			this.positionCol < 0 || this.positionCol >= this.field[0].length
		) {
			console.log("You out of the field Loser 💀 !!")
			this.gameOver = true;
			return;
		};

		// Move to hole and hat condition
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
		this.field[this.positionRow][this.positionCol] = pathCharacter; //Current position
	}

	static generateField(height, width, percentHole = 0.3) {
		const field = []

		for (let i = 0; i < height ; i++) {
			const row = [];
		for (let j = 0; j < width ; j++) {
			const isHole = Math.random() < percentHole;
			row.push(isHole ? hole : fieldCharacter);
		}
			field.push(row);
		}

		// Player position
		field[0][0] = pathCharacter;

		let hatX;
		let hatY;
		do { hatX = Math.floor(Math.random() * width);
			hatY = Math.floor(Math.random() * height);
		} while (hatX === 0 && hatY === 0)
			field[hatX][hatY] = hat
			return field;
	}
}


// Game Mode ON
// Remark: Code example below should be deleted and use your own code.
// const myGame = new Field([
// 	["░", "░", "O"],
// 	["░", "O", "░"],
// 	["░", "^", "░"],
// ]);

const height = 5;
const width = 5;
const percentHole = 0.3;

const generateMap = Field.generateField(height, width, percentHole);
const myGame = new Field(generateMap);

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
