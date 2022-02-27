console.log('START THE GAME');

// Поле 100X100
const firstGeneration = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let currentGeneration = 0;

/**
 * Игра "Жизнь"
 * @param {Array<Array<0|1>>} lastUniverse
 */
function theGameOfLife(lastUniverse) {
  // Показываем текущее поколение
  console.log(`\nПоколение ${currentGeneration}`);

  let nextUniverse = [];

  // Создаем копию крайней вселенной и показываем текущее состояние вселенной
  for (let u = 0; u < lastUniverse.length; u++) {
    nextUniverse[u] = JSON.parse(JSON.stringify(lastUniverse[u]));
    // console.log(lastUniverse[u].toString().replace(/,/ig, '   '));
  }

  // Пробежимся по всем клеткам вселенной
  for (let i = 0; i < lastUniverse.length; i++) {
    for (let j = 0; j < lastUniverse[i].length; j++) {
      // Количество живых соседей
      let countLivingNeighbors = 0;

      // Подсчитываем живых соседей
      countLivingNeighbors = lastUniverse[i - 1]?.[j - 1] === 1 ? countLivingNeighbors + 1 : countLivingNeighbors;
      countLivingNeighbors = lastUniverse[i - 1]?.[j] === 1 ? countLivingNeighbors + 1 : countLivingNeighbors;
      countLivingNeighbors = lastUniverse[i - 1]?.[j + 1] === 1 ? countLivingNeighbors + 1 : countLivingNeighbors;
      countLivingNeighbors = lastUniverse[i]?.[j + 1] === 1 ? countLivingNeighbors + 1 : countLivingNeighbors;
      countLivingNeighbors = lastUniverse[i + 1]?.[j + 1] === 1 ? countLivingNeighbors + 1 : countLivingNeighbors;
      countLivingNeighbors = lastUniverse[i + 1]?.[j] === 1 ? countLivingNeighbors + 1 : countLivingNeighbors;
      countLivingNeighbors = lastUniverse[i + 1]?.[j - 1] === 1 ? countLivingNeighbors + 1 : countLivingNeighbors;
      countLivingNeighbors = lastUniverse[i]?.[j - 1] === 1 ? countLivingNeighbors + 1 : countLivingNeighbors;

      // Если текущая клетка мертвая и у нее есть 3 живых соседа
      if (lastUniverse[i][j] === 0 && countLivingNeighbors === 3) {
        nextUniverse[i][j] = 1; // в следующем поколении зарождается жизнь
      }

      // Если текущая клетка живая, но с соседями "беда"
      if (lastUniverse[i][j] === 1 && (countLivingNeighbors < 2 || countLivingNeighbors > 3)) {
        nextUniverse[i][j] = 0; // в следующем поколении жизнь в данной клетке умирает
      }
    }
  }

  // Если в предыдущем и новом поколении нет изменений
  if (lastUniverse.toString() === nextUniverse.toString()) {
    // Завершаем игру
    console.log(`\nЖизнь во вселенной стабилизировалась в ${currentGeneration} поколении`);
    for (let u = 0; u < lastUniverse.length; u++) {
      // console.log(nextUniverse[u].toString().replace(/,/ig, '   '));
    }
    console.log('Использовано ОЗУ: ' + process.memoryUsage().heapTotal);
    console.log('THE GAME THE END');
  } else {
    currentGeneration++;
    return theGameOfLife(nextUniverse);
  }
}

theGameOfLife(firstGeneration);
