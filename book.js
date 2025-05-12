// Mock book data
const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    popularity: 85,
    reviews: [
      { user: "Alice", rating: 4, comment: "A classic with beautiful prose!" },
      { user: "Bob", rating: 3, comment: "Good, but overhyped." }
    ]
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    popularity: 92,
    reviews: [
      { user: "Charlie", rating: 5, comment: "Terrifyingly relevant!" },
      { user: "Dana", rating: 4, comment: "A must-read dystopian novel." }
    ]
  }
];

// DOM Elements
const loginContainer = document.getElementById("login-container");
const mainContainer = document.getElementById("main-container");
const userInfo = document.getElementById("user-info");
const usernameSpan = document.getElementById("username");
const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const searchInput = document.getElementById("search-input");
const bookList = document.getElementById("book-list");

// Check if user is logged in
function checkUser() {
  const user = localStorage.getItem("user");
  if (user) {
    const { username } = JSON.parse(user);
    loginContainer.classList.add("hidden");
    mainContainer.classList.remove("hidden");
    userInfo.classList.remove("hidden");
    usernameSpan.textContent = `Welcome, ${username}`;
    renderBooks(books);
  } else {
    loginContainer.classList.remove("hidden");
    mainContainer.classList.add("hidden");
    userInfo.classList.add("hidden");
  }
}

// Render books
function renderBooks(booksToRender) {
  bookList.innerHTML = "";
  booksToRender.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p class="book-author">by ${book.author}</p>
      <p class="book-popularity">Popularity: ${book.popularity}%</p>
      <h4>Reviews:</h4>
      <ul class="reviews">
        ${book.reviews.map(review => `
          <li><strong>${review.user}</strong> (${review.rating}/5): ${review.comment}</li>
        `).join("")}
      </ul>
    `;
    bookList.appendChild(bookCard);
  });
}

// Login handler
loginButton.addEventListener("click", () => {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (username && password) {
    localStorage.setItem("user", JSON.stringify({ username }));
    checkUser();
  } else {
    alert("Please enter valid credentials");
  }
});

// Logout handler
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("user");
  checkUser();
});

// Search handler
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm) ||
    book.author.toLowerCase().includes(searchTerm)
  );
  renderBooks(filteredBooks);
});

// Initialize
checkUser();