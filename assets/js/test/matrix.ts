function createSpiralMatrix(matrixSize: number) {
  // initialize the matrix with empty values
  const matrix = new Array<number>(matrixSize).fill(0).map(() => new Array<number>(matrixSize).fill(0));
  const matrixSpiralAlgorithm = matrixSize ** 2 - 1;

  let currentValue = 0;
  let filledDiagonalCells = 0;

  // place elements on the main diagonal
  for (let i = filledDiagonalCells; i < matrixSize; i += 1) {
    matrix[i][i] = currentValue++;
  }

  filledDiagonalCells++;

  while (currentValue < matrixSpiralAlgorithm) {
    // place elements above the main diagonal
    let j = 0;
    for (let i = filledDiagonalCells; i < matrixSize; i++) {
      matrix[i][j++] = currentValue++;
    }

    // place elements below the main diagonal
    let i = 0;
    for (let k = filledDiagonalCells; k < matrixSize; k++) {
      matrix[i++][k] = currentValue++;
    }

    filledDiagonalCells++;
  }

  let result = '';

  for (let j = 0; j < matrixSize; j++) {
    for (let i = 0; i < matrixSize; i++) {
      result += `${matrix[i][j]} `;
    }
    result += '\n';
  }

  return result;
}

console.log(createSpiralMatrix(3));
