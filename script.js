// 1. Проверка на палиндром
function isPalindrome(str) {
    const cleanedStr = str.toLowerCase().replace(/[^a-zа-я0-9]/gi, '');
    return cleanedStr === cleanedStr.split('').reverse().join('');
}
console.log(isPalindrome("А роза упала на лапу Азора")); 
console.log(isPalindrome("Привет")); 

// 2. FizzBuzz
function fizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        // Проверяем, делится ли число на 3 и 5
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

fizzBuzz();


// 3. Разбиение массива на части
function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 2)); 
console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3)); 

// -------------------------------------------------------------


// Задание 2 

const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const todoList = document.getElementById("todo-list");
const filterButtons = document.getElementById("filter-buttons");


function createTask(taskText) {
    const li = document.createElement("li");
    li.className = "todo-item";

    const span = document.createElement("span");
    span.textContent = taskText;


    const completeButton = document.createElement("button");
    completeButton.textContent = "Завершить";
    completeButton.className = "complete-task";
    completeButton.addEventListener("click", () => {
        li.classList.toggle("completed");
    });


    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.addEventListener("click", () => {
        const confirmDelete = confirm("Вы уверены, что хотите удалить задачу?");
        if (confirmDelete) {
            li.remove();
        }
    });

    li.appendChild(span);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);

    return li;
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = createTask(taskText);
        todoList.appendChild(newTask);
        taskInput.value = "";
    }
}

addTaskButton.addEventListener("click", addTask);


taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});


filterButtons.addEventListener("click", (event) => {
    const filter = event.target.dataset.filter;
    const tasks = todoList.querySelectorAll(".todo-item");

    tasks.forEach(task => {
        switch (filter) {
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
            case "uncompleted":
                task.style.display = task.classList.contains("completed") ? "none" : "flex";
                break;
        }
    });
});

// -------------------------------------------------------------


// Задание 3


const userList = document.getElementById("user-list");
const loadingIndicator = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const carouselImagesContainer = document.querySelector(".carousel-images");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentIndex = 0;
let imageUrls = [];

async function fetchRandomUsers() {
    try {
        loadingIndicator.classList.remove("hidden");
        errorMessage.classList.add("hidden");

        const response = await fetch('https://randomuser.me/api/?results=10&nat=US');
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();

  
        userList.innerHTML = "";
        data.results.forEach(user => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <img src="${user.picture.thumbnail}" alt="${user.name.first}">
                <strong>${user.name.first} ${user.name.last}</strong><br>
                <a href="mailto:${user.email}">${user.email}</a>
            `;
            userList.appendChild(listItem);
        });


        imageUrls = data.results.map(user => user.picture.large);
        displayImage(currentIndex);

        setInterval(() => {
            currentIndex = (currentIndex + 1) % imageUrls.length;
            displayImage(currentIndex);
        }, 3000);

    } catch (error) {
        console.error("Ошибка:", error);
        errorMessage.classList.remove("hidden");
    } finally {
        loadingIndicator.classList.add("hidden");  
    }
}

function displayImage(index) {
    carouselImagesContainer.innerHTML = `<img src="${imageUrls[index]}" alt="User image">`;
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    displayImage(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    displayImage(currentIndex);
});

// Запускаем функцию для получения данных
fetchRandomUsers();


// -------------------------------------------------------------


// Задание 4

class Calculator {
    constructor() {
        
    }

    
    add(a, b) {
        return a + b;
    }


    subtract(a, b) {
        return a - b;
    }


    multiply(a, b) {
        return a * b;
    }


    divide(a, b) {
        if (b === 0) {
            return "Ошибка: деление на ноль!";
        }
        return a / b;
    }
}
const calculator = new Calculator();

console.log(calculator.add(5, 3));        
console.log(calculator.subtract(5, 3));  
console.log(calculator.multiply(5, 3)); 
console.log(calculator.divide(5, 3));     
console.log(calculator.divide(5, 0))

// -------------------------------------------------------------

class Book {
    constructor(title, author, isbn) {
        this.title = title;      
        this.author = author;    
        this.isbn = isbn;        
        this.status = "available"; 
    }
}


class Library {
    constructor() {
        this.books = [];
    }


    addBook(book) {
        this.books.push(book);
    }


    borrowBook(isbn) {
        const book = this.books.find(b => b.isbn === isbn);
        if (book && book.status === "available") {
            book.status = "borrowed";
            console.log(`Книга "${book.title}" взята.`);
        } else if (book && book.status === "borrowed") {
            console.log(`Книга "${book.title}" уже взята.`);
        } else {
            console.log("Книга с таким ISBN не найдена.");
        }
    }

    returnBook(isbn) {
        const book = this.books.find(b => b.isbn === isbn);
        if (book && book.status === "borrowed") {
            book.status = "available";
            console.log(`Книга "${book.title}" возвращена.`);
        } else if (book && book.status === "available") {
            console.log(`Книга "${book.title}" не была взята.`);
        } else {
            console.log("Книга с таким ISBN не найдена.");
        }
    }


    listAvailableBooks() {
        const availableBooks = this.books.filter(b => b.status === "available");
        if (availableBooks.length > 0) {
            console.log("Доступные книги:");
            availableBooks.forEach(book => {
                console.log(`"${book.title}" - ${book.author} (ISBN: ${book.isbn})`);
            });
        } else {
            console.log("Нет доступных книг.");
        }
    }
}


const library = new Library();


const book1 = new Book("JavaScript для начинающих", "Иван Иванов", "1234567890");
const book2 = new Book("Основы ООП", "Петр Петров", "0987654321");
const book3 = new Book("Мифы о программировании", "Сергей Сергеев", "1122334455");


library.addBook(book1);

library.addBook(book2);

library.addBook(book3);

library.listAvailableBooks();

library.borrowBook("1234567890");

library.listAvailableBooks();

library.returnBook("1234567890");

library.listAvailableBooks();


// -------------------------------------------------------------


// Задание 5

function debounce(func, delay) {
    let timeout;

    return function(...args) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

const debouncedFunction = debounce(() => {
    console.log('Вызвана функция с задержкой');
}, 2000);


debouncedFunction(); 
debouncedFunction();  
debouncedFunction(); 


// -------------------------------------------------------------

function deepClone(obj) {
   
    if (obj === null || typeof obj !== 'object') {
        return obj; 
    }
    const copy = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepClone(obj[key]); 
        }
    }

    return copy; 
}

const original = {
    name: 'John',
    address: {
        city: 'New York',
        country: 'USA'
    }
};

const copy = deepClone(original);
copy.address.city = 'Los Angeles';

console.log(original.address.city); 
console.log(copy.address.city); 
