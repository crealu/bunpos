let selLoc;
let currentInput;
let inputToConnect;
let connectingString;
let connectingParent;

function checkInputLength() {
  let inp = this.textContent;
  inp.length < 2 ? this.style.width = '20px': this.style.width = 'auto';
}

function checkNewInputLength(input) {
  input.style.width = input.textContent < 2 ? '20px' : 'auto';
}

function setCurrentInput() {
  currentInput = this;
  selLoc = window.getSelection().anchorOffset;
}

function splitSection() {
  let currentParent = currentInput.parentNode;
  let jemTitle = currentParent.previousElementSibling.previousElementSibling.textContent.toLowerCase();
  let theString = currentInput.textContent;
  let halfOne = theString.slice(0, selLoc);
  let halfTwo = theString.slice(selLoc, theString.length);
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

  document.addEventListener('keydown', e => { console.log(e.keyCode) });
}

function onloadFunctions() {
  addListeners();
}

window.onload = onloadFunctions();
