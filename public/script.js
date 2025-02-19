let cursorLocation;
let currentInput;
let inputToConnect;
let connectingString;
let connectingParent;

let keysDown = [];

function checkInputLength() {

  let inp = this.textContent;
  inp.length < 2 ? this.style.width = '20px': this.style.width = 'auto';
}

function checkNewInputLength(input) {
  input.style.width = input.textContent < 2 ? '20px' : 'auto';
}

function setCurrentInput() {
  currentInput = this;
  cursorLocation = window.getSelection().anchorOffset;
}

function splitSection() {
  let currentParent = currentInput.parentNode;
  let jemTitle = currentParent.previousElementSibling.previousElementSibling.textContent.toLowerCase();
  let theString = currentInput.textContent;
  let halfOne = theString.slice(0, cursorLocation);
  let halfTwo = theString.slice(cursorLocation, theString.length);
  currentInput = halfOne != '' ? halfOne : '';
  if (halfTwo != '') {
    let newInput = createInput(jemTitle);
    newInput.textContent = halfTwo;
    currentInput.insertAdjacentElement('afterend', newInput);
    checkNewlyMadeInputLength(newInput);
  }
}

function setConnectMode() {
  currentInput.style.background = '#ffc3c3';
  inputToConnect = currentInput;
  let currentParent = currentInput.parentNode;
  console.dir(currentParent);
  for (let c = 0; c < currentParent.children.length; c++) {
    currentParent.children[c].addEventListener('click', connectSection);
  }
  connectingString = currentInput.textContent;
}

function connectSection() {
  this.textContent += connectingString;
}

function createInput(title) {
  let newInput = document.createElement("span");
  newInput.classList.add('jem-input');
  newInput.setAttribute('contenteditable', 'true');

  const btnColors = {
    j: 'green',
    r: 'blue',
    m: 'orange',
    e: 'purple'
  }

  newInput.style.border = '3px solid var(--btn-' + btnColors[title] + ')';
  newInput.addEventListener('input', checkInputLength);
  newInput.addEventListener('keyup', e => {
    console.log(window.getSelection().anchorOffset);
  });
  newInput.addEventListener('click', setCurrentInput);
  return newInput;
}

function addInput() {
  let jemSentence = this.nextElementSibling;
  let jemTitle = this.previousElementSibling.textContent.toLowerCase();
  let newInput = createInput(jemTitle);
  newInput.textContent = ' ';
  jemSentence.appendChild(newInput);
}

function addListeners() {
  const jemButtons = document.getElementsByClassName('jem-add');
  for (let j = 0; j < jemButtons.length; j++) {
    jemButtons[j].addEventListener('click', addInput);
  }

  document.addEventListener('keydown', (event) => {

    if (keysDown.length == 2) {
      keysDown = [];
      keysDown[0] = event.key;
    } else {
      keysDown.push(event.key);
    }

    if (keysDown[0] == 's' && keysDown[1] == 's') {
      splitSection();
      keysDown = [];
    }
    console.log(event.key);
  });

}

function onloadFunctions() {
  addListeners();
}

window.onload = onloadFunctions();
