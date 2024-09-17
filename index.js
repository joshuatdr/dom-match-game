const cards = [...document.getElementsByClassName('card')];

const resetGame = () => {
  cards.forEach((card) => {
    if (card.classList.contains('is-flipped')) {
      card.classList.remove('is-flipped');
    }
  });
  matchedValues = [];
  lastClicked = null;
  match = false;
  wait = false;
  positions = shuffleCards();
  addListeners();
};

const shuffleCards = () => {
  const nums = Array.from({ length: 19 }, (_, i) => i + 1);
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  const selectedNums = nums.slice(0, 8).flatMap((num) => [num, num]);
  for (let i = selectedNums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selectedNums[i], selectedNums[j]] = [selectedNums[j], selectedNums[i]];
  }
  return selectedNums.map((num) => `./assets/${num}.png`);
};

const addListeners = () => {
  cards.forEach((item, index) => {
    item.onclick = () => {
      if (
        !wait &&
        item !== lastClicked &&
        !item.classList.contains('is-flipped')
      ) {
        // console.log('currItem', item);
        // console.log('lastClicked', lastClicked);
        item.classList.toggle('is-flipped');
        item.fruit = positions[index];
        item.children[1].children[0].src = item.fruit;
        if (lastClicked !== null) {
          if (item.fruit === lastClicked.fruit) {
            matchedValues.push(item.fruit);
            // console.log('match', matchedValues);
            match = true;
          }
        }
        if (!match && lastClicked !== null) {
          wait = true;
          setTimeout(() => {
            item.classList.toggle('is-flipped');
            lastClicked.classList.toggle('is-flipped');
            lastClicked = null;
            wait = false;
          }, 1000);
        } else if (match) {
          lastClicked = null;
          if (matchedValues.length === positions.length / 2) {
            // console.log('Game complete, reshuffling...');
            setTimeout(() => {
              resetGame();
            }, 3000);
          }
          match = false;
        } else {
          lastClicked = item;
        }
      }
    };
  });
};

resetGame();
