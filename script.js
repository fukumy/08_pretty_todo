document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // ローカルストレージからデータを読み込む
    let todos = JSON.parse(localStorage.getItem('royal-todos')) || [];

    function saveTodos() {
        localStorage.setItem('royal-todos', JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn" aria-label="削除">🌹</button>
            `;

            // タスクの完了切り替え
            li.querySelector('.todo-text').addEventListener('click', () => {
                todo.completed = !todo.completed;
                if (todo.completed) {
                    createSparkle(li);
                }
                saveTodos();
                renderTodos();
            });

            // タスクの削除
            li.querySelector('.delete-btn').addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });

            todoList.appendChild(li);
        });
    }

    function addTodo() {
        const text = todoInput.value.trim();
        if (text === '') return;

        todos.push({
            text: text,
            completed: false
        });

        todoInput.value = '';
        saveTodos();
        renderTodos();
    }

    // きらめき演出
    function createSparkle(element) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = '1.2rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.animation = 'sparkle 0.8s ease-out forwards';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 800);
        }
    }

    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    renderTodos();
});
