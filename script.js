'use strict';
document.addEventListener('DOMContentLoaded', function() {
const modal = document.getElementById('modal-outside');
const todosByDate = {};

// トグルモーダル
function modalPop (selectedDate) {
  const title = modal.querySelector('#modal-title');
  if (title) {
    title.textContent = `・${selectedDate}日のトド`;
  }
  // 日付ごとのモーダルを表示するためのロジック
  const content = modal.querySelector('#modal-content');
      //  content.innerHTML='';で前のTodo項目をクリア
      // todosByDateに日付に対応するリストを格納する
  content.innerHTML = '';
  const todos = todosByDate[selectedDate] || [];
  todos.forEach((todo, index) => {
    const todoElement = document.createElement('div');
    todoElement.textContent = todo;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
    deleteTodo(selectedDate, index);
  };
    todoElement.appendChild(deleteButton);
    content.appendChild(todoElement);
  });
  modal.style.display = 'block';
}

function deleteTodo(date, index) {
  todosByDate[date].splice(index, 1);
  modalPop(date);
}
// currentSelectedDateにユーザーが選択した日を保持する
let currentSelectedDate = '';
function move() {
const selectDay = document.querySelectorAll('td');
selectDay.forEach(day => {
  day.addEventListener('click', function() {
    const selectedDate = this.textContent;
    currentSelectedDate = selectedDate;
    modalPop(selectedDate);
  });
});

}
  const close = document.querySelector('#modal-close');
  close.addEventListener('click', function() {
    modal.style.display = 'none'; 
});



// Todo追加フォーム//

const form = document.getElementById('modal-form');
const content = document.getElementById('modal-title');
form.addEventListener('submit', function(event) {
  event.preventDefault();
       // フォームのデフォルト送信を防ぐ
  const input = document.getElementById('modal-input');
  if (input.value.trim() !== ''){
       // 入力が空でない場合のみ送信する
      //  入力された文字列をtodosByDateオブジェクトに追加し表示
  const newTodo = input.value.trim()
  if (!todosByDate[currentSelectedDate]) {
    todosByDate[currentSelectedDate] = [];
  }
  todosByDate[currentSelectedDate].push (newTodo);
  modalPop(currentSelectedDate);
  input.value = ('');
  }
});

move();
});