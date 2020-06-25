class HanoiGame {
  constructor(towers = [[3, 2, 1], [], []]) {
    this.towers = towers;
    this.start = (this.towers[0].length === 3) ? 0 : (this.towers[1].length === 3) ? 1 : 2;
  }

  isValidMove(startTowerIdx, endTowerIdx) {

    if (startTowerIdx < 0 || startTowerIdx > 2){
      return false;
    } else if (endTowerIdx < 0 || endTowerIdx > 2){
      return false;
    }

    const startRing = this.towers[startTowerIdx][this.towers[startTowerIdx].length - 1];
    const endRing = this.towers[endTowerIdx][this.towers[endTowerIdx].length - 1];

    if (startTowerIdx === endTowerIdx){
      return false;
    } else if (this.towers[startTowerIdx].length === 0) {
      return false;
    } else if (this.towers[endTowerIdx].length === 0) {
      return true;
    } else if (startRing < endRing){
      return true;
    } else {
      return false;
    }
  }

  move(startTowerIdx, endTowerIdx) {
    const canMove = this.isValidMove(startTowerIdx, endTowerIdx)
    if (canMove) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
    }
    return canMove;
  }

  isWon() {
    if (this.towers[1].length === 3) return true;
    if (this.towers[2].length === 3) return true;
    return false;
  }

  // the below methods are complete and do not need to be modified
  print() {
    // will print our board nicely to our user
    console.log(JSON.stringify(this.towers));
  }

  promptMove(reader, callback) {
    this.print();
    reader.question("Enter a starting tower: ", (start) => {
      const startTowerIdx = parseInt(start);
      reader.question("Enter an ending tower: ", (end) => {
        const endTowerIdx = parseInt(end);
        callback(startTowerIdx, endTowerIdx);
      });
    });
  }

  run(reader, callback) {
    // we will prompt our user to provide a start and stop index using
    // a readline interface
    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
      // if the move is invalid we tell the user
      if (!this.move(startTowerIdx, endTowerIdx)) {
        console.log("Invalid move!");
      }

      if (!this.isWon()) {
        // Continue to play!
        this.run(reader, callback);
      } else {
        this.print();
        console.log("You win!");
        callback();
      }
    });
  }
}

module.exports = HanoiGame;
