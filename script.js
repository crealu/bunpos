var selLoc;
var currentInput;
var inputToConnect;
var connectingString;
var connectingParent;

function checkInputLength() {
  var inp = this.textContent;
  inp.length < 2 ? this.style.width = '20px': this.style.width = 'auto';
}

function checkNewlyMadeInputLength(e) {
  var inp = e.textContent;
  inp.length < 2 ? e.style.width = '20px': e.style.width = 'auto';
}

function assignCurrentInput() {
  currentInput = this;
  selLoc = window.getSelection().anchorOffset;
}

function splitSection() {
  var currentParent = currentInput.parentNode;
  var jemTitle = currentParent.previousElementSibling.previousElementSibling.textContent.toLowerCase();

  var theString = currentInput.textContent;
  var halfOne = theString.slice(0, selLoc);
  var halfTwo = theString.slice(selLoc, theString.length);

  halfOne != '' ? currentInput.textContent = halfOne: null;
  /*if (halfOne != '') {
    currentInput.textContent = halfOne;
  }*/
  if (halfTwo != '') {
    var newInput = createInput(jemTitle);
    newInput.textContent = halfTwo;
    currentInput.insertAdjacentElement('afterend', newInput);
    checkNewlyMadeInputLength(newInput);
  }
}

function setConnectMode() {
  currentInput.style.background = '#ffc3c3';
  inputToConnect = currentInput;
  var currentParent = currentInput.parentNode;
  console.dir(currentParent);
  for (var c = 0; c < currentParent.children.length; c++) {
    currentParent.children[c].addEventListener('click', connectSection);
  }
  connectingString = currentInput.textContent;
}

function connectSection() {
  this.textContent += connectingString;
}

function createInput(title) {
  var newInput = document.createElement("span");
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
  newInput.addEventListener('click', assignCurrentInput);
  return newInput;
}

function addInput() {
  var jemSentence = this.nextElementSibling;
  var jemTitle = this.previousElementSibling.textContent.toLowerCase();

  var newInput = createInput(jemTitle);
  newInput.textContent = ' ';
  jemSentence.appendChild(newInput);
}

function addListeners() {
  const jemButtons = document.getElementsByClassName('jem-add');
  for (var j = 0; j < jemButtons.length; j++) {
    jemButtons[j].addEventListener('click', addInput);
  }

  document.addEventListener('keydown', e => { console.log(e.keyCode) });
}

function onloadFunctions() {
  addListeners();
}

window.onload = onloadFunctions();
