document.addEventListener('DOMContentLoaded', () => {
    // Select all span elements
    const spans = document.querySelectorAll('.same');

    // Loop through each span and apply setTimeout to delay its display
    spans.forEach((span, index) => {
        // Adding delay for each span based on its index
        setTimeout(() => {
            // Apply textShadow to the individual span
            span.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.5)';

            // Make the letter visible
            span.style.opacity = 1;

            setTimeout(() => {
                span.style.color = 'black';
                span.style.textShadow = '';

                setTimeout(() => {
                    span.style.color = '';

                    // Apply textShadow to the individual span
                    span.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.5)';

                    // Make the letter visible
                    span.style.opacity = 1;
                }, index * 100)

            }, index * 150);
        }, index * 400); // Adjust the multiplier (200ms) for delay between letters
    });




    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.value, task.completed));
});

function inputValue() {
    const input = document.getElementById('inputValue');
    const errorMessage = document.getElementById('errorMessage');  // Get the error message element
    const value = input.value.trim();

    // Add error class if input is empty
    if (!value) {
        input.classList.add('error');  // Add the error class to input field
        errorMessage.style.display = 'block';  // Show the error message
        setTimeout(() => {
            input.classList.remove('error'); // Remove the error class after 1 second
            errorMessage.style.display = 'none';  // Hide the error message after 1 second
        }, 2000);
        return;
    }

    // Proceed with task creation if input is not empty
    input.classList.remove('error');  // Ensure no error class is present
    errorMessage.style.display = 'none';  // Hide the error message if input is valid
    addTask(value, false);
    saveToStorage();
    input.value = '';
}

function addTask(value, completed = false) {
    const container = document.getElementById('valueStore');

    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    const circleBtn = document.createElement('span');
    circleBtn.className = 'circle-btn';
    if (completed) circleBtn.classList.add('completed'); // Add completed class if task is already completed
    circleBtn.innerHTML = completed ? '✔️' : '⭕';  // Show checkmark if completed, else show circle
    circleBtn.onclick = () => toggleTaskCompletion(taskText, circleBtn);

    const taskText = document.createElement('div');
    taskText.className = 'text';
    taskText.textContent = value;
    if (completed) taskText.classList.add('completed');
    taskText.onclick = () => toggleTaskCompletion(taskText, circleBtn);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.onclick = () => editTask(taskText);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.onclick = () => {
        taskDiv.remove();
        saveToStorage();
    };

    actions.append(editBtn, deleteBtn);
    taskDiv.append(circleBtn, taskText, actions);
    container.appendChild(taskDiv);
    saveToStorage();
}

function toggleTaskCompletion(taskText, circleBtn) {
    taskText.classList.toggle('completed');
    if (taskText.classList.contains('completed')) {
        circleBtn.innerHTML = '✔️';  // Checkmark when completed
        circleBtn.classList.add('completed');
    } else {
        circleBtn.innerHTML = '⭕';  // Circle when not completed
        circleBtn.classList.remove('completed');
    }
    saveToStorage();
}

function editTask(taskText) {
    const input = document.createElement('input');
    input.className = 'task-edit-input';
    input.type = 'text';
    input.value = taskText.textContent;
    taskText.replaceWith(input);
    input.focus();

    input.addEventListener('blur', () => saveEdit(input, taskText));
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveEdit(input, taskText);
    });
}

function saveEdit(input, textDiv) {
    const newValue = input.value.trim();
    if (!newValue) return;
    textDiv.textContent = newValue;
    input.replaceWith(textDiv);
    saveToStorage();
}

function saveToStorage() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
        const value = task.querySelector('.text')?.textContent || '';
        const completed = task.querySelector('.text')?.classList.contains('completed');
        if (value) tasks.push({ value, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function errorMessageHidden() {
    document.getElementById('errorMessage').style.display = 'none';
}


