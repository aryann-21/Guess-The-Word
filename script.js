const words = ["Apple", "House", "Brave", "Smile", "Chair", "Light", "Dream", "Water", "Peace", "Happy"];
let ans = words[Math.floor(Math.random() * 10)].toLowerCase();

let attempt = 0;

function checkAns() {
  const wordleContainer = document.getElementById('wordle-container');
  const rows = wordleContainer.querySelectorAll('.grid');
  if (attempt >= rows.length) {
    return;
  }

  const inputs = rows[attempt].querySelectorAll('input');
  let userWord = '';
  inputs.forEach(input => {
    userWord += input.value.toLowerCase();
  });

  if (userWord.length < 5) {
    return;
  }

  const resultDiv = document.getElementById('result');
  if (userWord === ans) {
    resultDiv.textContent = 'Correct!';
    resultDiv.classList.add('text-green-500');
  }

  const ansArray = ans.split('');
  userWord.split('').forEach((letter, index) => {
    if (letter === ansArray[index]) {
      inputs[index].classList.add('bg-[#538d4d]');
    } else if (ansArray.includes(letter)) {
      inputs[index].classList.add('bg-[#b59f3b]');
    } else {
      inputs[index].classList.add('bg-[#3a3a3c]');
    }
  });

  inputs.forEach(input => input.disabled = true);

  attempt++;
  if (attempt < rows.length) {
    const nextRowInputs = rows[attempt].querySelectorAll('input');
    nextRowInputs.forEach(input => {
      input.disabled = false;
    });
    nextRowInputs[0].focus();
  }
}

const wordleContainer = document.getElementById('wordle-container');
const inputs = wordleContainer.querySelectorAll('input');

const firstRowInputs = wordleContainer.querySelector('.grid').querySelectorAll('input');
firstRowInputs.forEach(input => {
  input.disabled = false;
});
firstRowInputs[0].focus();

inputs.forEach((input, index) => {
  input.addEventListener('input', (event) => {
    if (event.target.value.length === 1) {
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    }
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
      const currentRow = Array.from(input.closest('.grid').querySelectorAll('input'));
      if (currentRow.indexOf(input) === 0 && input.value.length === 0 && attempt > 0) {
        event.preventDefault();
      } else if (input.value.length === 0 && index > 0) {
        inputs[index - 1].focus();
      } else if (input.closest('.grid').querySelectorAll('input').every(input => input.disabled)) {
        event.preventDefault();
      }
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    checkAns();
  }
});
