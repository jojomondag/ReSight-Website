// Seeded random number generator for consistent tree rendering
function seededRandom(seed: number): () => number {
  return function () {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

interface TreeConfig {
  width: number;
  height: number;
  seed: number;
  trunkHeight: number;
  branchProbability: number;
  foliageDensity: number;
}

const DEFAULT_CONFIG: TreeConfig = {
  width: 100,
  height: 70,
  seed: 42,
  trunkHeight: 15,
  branchProbability: 0.7,
  foliageDensity: 0.6,
};

type Grid = string[][];

function createGrid(width: number, height: number): Grid {
  return Array.from({ length: height }, () => Array(width).fill(" "));
}

function setChar(grid: Grid, x: number, y: number, char: string): void {
  if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
    grid[y][x] = char;
  }
}

function drawTrunk(
  grid: Grid,
  startX: number,
  startY: number,
  height: number
): number {
  for (let i = 0; i < height; i++) {
    const y = startY - i;
    setChar(grid, startX, y, "|");
    // Add some trunk texture
    if (i > 2 && i % 3 === 0) {
      setChar(grid, startX - 1, y, ")");
      setChar(grid, startX + 1, y, "(");
    }
  }
  return startY - height;
}

function drawBranch(
  grid: Grid,
  startX: number,
  startY: number,
  direction: 1 | -1,
  length: number,
  random: () => number
): { endX: number; endY: number } {
  let x = startX;
  let y = startY;
  const branchChar = direction === 1 ? "\\" : "/";

  for (let i = 0; i < length; i++) {
    x += direction;
    y -= 1;
    setChar(grid, x, y, branchChar);

    // Occasionally add horizontal segments
    if (random() > 0.7 && i < length - 1) {
      x += direction;
      setChar(grid, x, y, "-");
    }
  }

  return { endX: x, endY: y };
}

function drawFoliage(
  grid: Grid,
  centerX: number,
  centerY: number,
  radius: number,
  density: number,
  random: () => number
): void {
  const foliageChars = ["*", ".", "o", "+", "~", "'"];

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= radius && random() < density * (1 - distance / radius)) {
        const char = foliageChars[Math.floor(random() * foliageChars.length)];
        setChar(grid, centerX + dx, centerY + dy, char);
      }
    }
  }
}

function drawSubBranches(
  grid: Grid,
  x: number,
  y: number,
  depth: number,
  maxDepth: number,
  direction: 1 | -1,
  config: TreeConfig,
  random: () => number
): void {
  if (depth >= maxDepth) {
    // Draw foliage at branch tips
    const foliageRadius = Math.max(2, 5 - depth);
    drawFoliage(grid, x, y, foliageRadius, config.foliageDensity, random);
    return;
  }

  // Continue main branch direction
  if (random() < config.branchProbability) {
    const length = Math.max(2, 6 - depth + Math.floor(random() * 3));
    const { endX, endY } = drawBranch(grid, x, y, direction, length, random);
    drawSubBranches(
      grid,
      endX,
      endY,
      depth + 1,
      maxDepth,
      direction,
      config,
      random
    );
  }

  // Split into opposite direction
  if (random() < config.branchProbability * 0.6) {
    const length = Math.max(2, 4 - depth + Math.floor(random() * 2));
    const oppositeDir = (direction * -1) as 1 | -1;
    const { endX, endY } = drawBranch(grid, x, y, oppositeDir, length, random);
    drawSubBranches(
      grid,
      endX,
      endY,
      depth + 1,
      maxDepth,
      oppositeDir,
      config,
      random
    );
  }

  // Add some foliage along the branch
  if (random() < 0.3) {
    drawFoliage(grid, x, y, 2, config.foliageDensity * 0.5, random);
  }
}

function drawTree(grid: Grid, config: TreeConfig, random: () => number): void {
  const trunkX = Math.floor(config.width * 0.4);
  const trunkStartY = config.height - 1;

  // Draw trunk
  const trunkTopY = drawTrunk(grid, trunkX, trunkStartY, config.trunkHeight);

  // Draw main branches from trunk
  const branchLevels = 5;
  for (let level = 0; level < branchLevels; level++) {
    const branchY = trunkTopY + level * 2 + Math.floor(random() * 2);

    // Left branch
    if (random() < 0.85) {
      const length = Math.max(3, 8 - level + Math.floor(random() * 4));
      const { endX, endY } = drawBranch(
        grid,
        trunkX,
        branchY,
        -1,
        length,
        random
      );
      drawSubBranches(grid, endX, endY, 0, 3, -1, config, random);
    }

    // Right branch
    if (random() < 0.85) {
      const length = Math.max(3, 8 - level + Math.floor(random() * 4));
      const { endX, endY } = drawBranch(
        grid,
        trunkX,
        branchY,
        1,
        length,
        random
      );
      drawSubBranches(grid, endX, endY, 0, 3, 1, config, random);
    }
  }

  // Draw crown foliage at top
  drawFoliage(
    grid,
    trunkX,
    trunkTopY - 5,
    8,
    config.foliageDensity * 0.8,
    random
  );
}

export function generateAsciiTree(
  partialConfig?: Partial<TreeConfig>
): string {
  const config = { ...DEFAULT_CONFIG, ...partialConfig };
  const random = seededRandom(config.seed);
  const grid = createGrid(config.width, config.height);

  drawTree(grid, config, random);

  // Convert grid to string
  return grid.map((row) => row.join("")).join("\n");
}

export type { TreeConfig };
