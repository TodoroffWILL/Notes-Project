const createNoteBtn = document.querySelector('.create-btn');
const formDiv = document.querySelector('.form');
const noteContainer = document.querySelector('.container');
const checkBox = document.querySelector('input[type=checkbox]');
const backToIconBtn = document.querySelector('.backToIcon');

createNoteBtn.addEventListener('click', showForm);
formDiv.addEventListener('submit', onSubmit);
checkBox.addEventListener('change', onChange);
backToIconBtn.addEventListener('click', backToIcon);

function showForm(e) {
  e.currentTarget.style.display = 'none';
  formDiv.style.display = 'block';
}
function backToIcon(e) {

  e.currentTarget.parentElement.style.display = 'none';
  createNoteBtn.style.display = 'block';
}
function onSubmit(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));

  if (data.title == '' || data.textarea == '') {
    alert('All fields are required!');
    return;
  }

  let div = document.createElement('div');
  div.classList.add('grid-item');
  div.dataset.timestamp = Date.now();
  let h3Title = document.createElement('h3');
  h3Title.textContent = data.title;
  let pTextarea = document.createElement('p');
  pTextarea.textContent = data.textarea;
  let delBtn = document.createElement('button');
  delBtn.classList.add('delete');
  let delImg = document.createElement('img');
  delImg.src = '/img/thenounproject.png';
  let divDate = document.createElement('div');
  divDate.classList.add('date');
  divDate.textContent = new Date().toLocaleTimeString('bg');

  delBtn.appendChild(delImg);

  div.appendChild(h3Title);
  div.appendChild(pTextarea);
  div.appendChild(delBtn);
  div.appendChild(divDate);
  noteContainer.appendChild(div);

  delBtn.onclick = function (e) {
    e.currentTarget.parentNode.remove();
  };

  e.target.reset();
  e.currentTarget.style.display = 'none';
  createNoteBtn.style.display = 'block';
}

function onChange(e) {
  const parentElement = document.querySelector('.container');
  const gridItems = [...document.querySelectorAll('.grid-item')];

  if (gridItems.length == 0) {
    checkBox.checked = false;
    checkBox.disabled = true;
    if (e.target.click) {
      alert(
        'Please create couple of notes first,to be able to sort them by time added.'
      );
    }
  }

  if (e.target.checked) {
    gridItems.sort((a, b) => b.dataset.timestamp - a.dataset.timestamp);
    gridItems.forEach((gridItem) => parentElement.appendChild(gridItem));
    console.log(e);
  } else {
    gridItems.sort((a, b) => a.dataset.timestamp - b.dataset.timestamp);
    gridItems.forEach((gridItem) => parentElement.appendChild(gridItem));
  }
}
