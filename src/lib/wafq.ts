export function generateWafq(order: number, targetSum: number): number[][] | null {
  let matrix: number[][] = [];
  if (order % 2 !== 0) {
    matrix = generateOddMagicSquare(order);
  } else if (order % 4 === 0) {
    matrix = generateDoublyEvenMagicSquare(order);
  } else {
    matrix = generateSinglyEvenMagicSquare(order);
  }

  // Adjust to target sum if possible
  if (targetSum > 0) {
    const magicConstant = (order * (order * order + 1)) / 2;
    if (targetSum >= magicConstant) {
      const diff = targetSum - magicConstant;
      const baseOffset = Math.floor(diff / order);
      const remainder = diff % order;
      
      for (let r = 0; r < order; r++) {
        for (let c = 0; c < order; c++) {
          matrix[r][c] += baseOffset;
          // Extremely basic remainder distribution (usually added to the highest value cells)
          if (matrix[r][c] > (order * order) - remainder) {
             matrix[r][c] += 1;
          }
        }
      }
    }
  }

  return matrix;
}

function generateOddMagicSquare(n: number): number[][] {
  const matrix: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
  
  let i = Math.floor(n / 2);
  let j = n - 1;

  for (let num = 1; num <= n * n; ) {
    if (i === -1 && j === n) {
      j = n - 2;
      i = 0;
    } else {
      if (j === n) j = 0;
      if (i < 0) i = n - 1;
    }
    if (matrix[i][j] !== 0) {
      j -= 2;
      i++;
      continue;
    } else {
      matrix[i][j] = num++;
    }
    j++;
    i--;
  }

  return matrix;
}

function generateDoublyEvenMagicSquare(n: number): number[][] {
  const matrix: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
  let i, j;

  // fill array with their index-value
  for (i = 0; i < n; i++)
    for (j = 0; j < n; j++)
      matrix[i][j] = (n * i) + j + 1;

  // change value of Array elements at fix location as per rule
  for (i = 0; i < n / 4; i++)
    for (j = 0; j < n / 4; j++)
      matrix[i][j] = (n * n + 1) - matrix[i][j];

  for (i = 0; i < n / 4; i++)
    for (j = 3 * (n / 4); j < n; j++)
      matrix[i][j] = (n * n + 1) - matrix[i][j];

  for (i = 3 * (n / 4); i < n; i++)
    for (j = 0; j < n / 4; j++)
      matrix[i][j] = (n * n + 1) - matrix[i][j];

  for (i = 3 * (n / 4); i < n; i++)
    for (j = 3 * (n / 4); j < n; j++)
      matrix[i][j] = (n * n + 1) - matrix[i][j];

  for (i = n / 4; i < 3 * (n / 4); i++)
    for (j = n / 4; j < 3 * (n / 4); j++)
      matrix[i][j] = (n * n + 1) - matrix[i][j];

  return matrix;
}

function generateSinglyEvenMagicSquare(n: number): number[][] {
  const matrix: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
  const halfN = n / 2;
  const subSquareSize = halfN * halfN;
  const subSquare = generateOddMagicSquare(halfN);

  for (let r = 0; r < halfN; r++) {
    for (let c = 0; c < halfN; c++) {
      matrix[r][c] = subSquare[r][c]; // Top-Left
      matrix[r + halfN][c + halfN] = subSquare[r][c] + subSquareSize; // Bottom-Right
      matrix[r][c + halfN] = subSquare[r][c] + 2 * subSquareSize; // Top-Right
      matrix[r + halfN][c] = subSquare[r][c] + 3 * subSquareSize; // Bottom-Left
    }
  }

  const k = (n - 2) / 4;

  for (let r = 0; r < halfN; r++) {
    for (let c = 0; c < k; c++) {
      let cToSwap = c;
      if (r === Math.floor(halfN / 2)) {
        cToSwap = c + 1;
      }
      const temp = matrix[r][cToSwap];
      matrix[r][cToSwap] = matrix[r + halfN][cToSwap];
      matrix[r + halfN][cToSwap] = temp;
    }
  }

  for (let c = n - k + 1; c < n; c++) {
    for (let r = 0; r < halfN; r++) {
      const temp = matrix[r][c];
      matrix[r][c] = matrix[r + halfN][c];
      matrix[r + halfN][c] = temp;
    }
  }

  return matrix;
}
