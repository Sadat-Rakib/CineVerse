class Show {
    constructor(id, movie, date, time, seats = 50) {
        this.id = id;
        this.movie = movie;
        this.date = date;
        this.time = time;
        this.totalSeats = seats;
        this.bookedSeats = 0;
    }

    bookTickets(count) {
        if (this.bookedSeats + count > this.totalSeats) throw new Error("Not enough seats available");
        this.bookedSeats += count;
        return true;
    }

    cancelTickets(count) {
        if (count > this.bookedSeats) throw new Error("Invalid number of tickets to cancel");
        this.bookedSeats -= count;
    }

    getAvailableSeats() {
        return this.totalSeats - this.bookedSeats;
    }

    isMatch(filterDate) {
        return !filterDate || this.date === filterDate;
    }
}

class Booking {
    constructor(show, seatCount) {
        this.show = show;
        this.seatCount = seatCount;
        this.bookingTime = new Date();
        this.confirmed = false;
    }

    confirmBooking() {
        this.confirmed = this.show.bookTickets(this.seatCount);
    }

    cancel() {
        this.show.cancelTickets(this.seatCount);
        this.confirmed = false;
    }
}

class MovieTicketSystem {
    constructor() {
        this.movies = {};
        this.cinemaHalls = {};
        this.shows = {};
        this.bookings = [];

        this.nextMovieId = 1;
        this.nextCinemaId = 1;
        this.nextShowId = 1;
        this.nextBookingId = 1;
    }

    addMovie(movie) {
        this.movies[movie.id] = movie;
        updateUI();
        return movie;
    }

    addCinemaHall(cinema) {
        this.cinemaHalls[cinema.id] = cinema;
        updateUI();
        return cinema;
    }

    addShow(cinemaHallId, show) {
        const cinema = this.cinemaHalls[cinemaHallId];
        if (!cinema) throw new Error("Cinema not found");

        cinema.shows.push(show);
        this.shows[show.id] = show;

        updateUI();
        return show;
    }

    createBooking(showId, seatCount) {
        const show = this.shows[showId];
        if (!show) throw new Error("Show not found");

        const booking = new Booking(show, seatCount);
        this.bookings.push(booking);
        updateUI();
        return booking;
    }

    confirmBooking(index) {
        const booking = this.bookings[index];
        if (!booking || booking.confirmed) return;
        booking.confirmBooking();
        showToast(`🎟️ Booked ${booking.seatCount} tickets`);
        updateUI();
    }

    cancelBooking(index) {
        const booking = this.bookings[index];
        if (!booking || !booking.confirmed) throw new Error("Invalid booking");

        booking.cancel();
        showToast(`🚫 Booking canceled`);
        updateUI();
    }

    getCinemasInCityShowingMovie(city, movie) {
        return Object.values(this.cinemaHalls).filter(c => {
            return c.city.toLowerCase() === city.toLowerCase() &&
                c.shows.some(s => s.movie.id === movie.id);
        });
    }

    getShowsOfMovieInCinema(cinema, movie, filterDate = null) {
        return cinema.shows.filter(s => {
            return s.movie.id === movie.id && s.isMatch(filterDate);
        });
    }

    getAllShows(filterDate = null) {
        return Object.values(this.shows).filter(s => s.isMatch(filterDate));
    }
}

const system = new MovieTicketSystem();
let currentUser = null;

function login() {
    const username = document.getElementById("usernameInput").value.trim();
    if (!username) {
        alert("Enter your name");
        return;
    }
    currentUser = username;
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("userDisplay").innerText = currentUser;
    updateUI();
}

function updateUI() {
    function populateSelect(selector, items, labelKey = 'title', valueKey = 'id') {
        const sel = document.getElementById(selector);
        sel.innerHTML = "";
        items.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item[valueKey];
            opt.innerText = item[labelKey];
            sel.appendChild(opt);
        });
    }

    populateSelect("showCinemaSelect", Object.values(system.cinemaHalls), 'name');
    populateSelect("showMovieSelect", Object.values(system.movies));
    updateBookingUI();
    updateShowResults();

    const bookingList = document.getElementById("bookingList");
    bookingList.innerHTML = "";
    system.bookings.forEach((booking, index) => {
        const li = document.createElement("li");
        li.innerText = `🎥 ${booking.show.movie.title} • ${booking.show.date} • ${booking.show.time} • ${booking.seatCount} Seats`;
        const btnCancel = document.createElement("button");
        btnCancel.innerText = "Cancel";
        btnCancel.className = "btn-cancel";
        btnCancel.onclick = () => {
            system.cancelBooking(index);
        };
        li.appendChild(btnCancel);
        bookingList.appendChild(li);
    });
}

function updateBookingUI() {
    const showSelect = document.getElementById("bookShowSelect");
    showSelect.innerHTML = "";
    const filterDate = document.getElementById("filterDate").value;

    Object.values(system.shows).forEach(show => {
        if (!filterDate || show.date === filterDate) {
            const opt = document.createElement("option");
            opt.value = show.id;
            opt.innerText = `${show.movie.title} • ${show.date} • ${show.time}`;
            showSelect.appendChild(opt);
        }
    });
}

function updateShowResults() {
    const cinemaId = parseInt(document.getElementById("getCinemaSelect").value);
    const movieId = parseInt(document.getElementById("getMovieSelect").value);
    const filterDate = document.getElementById("filterShowDate").value;

    if (!cinemaId || !movieId) return;

    const cinema = system.cinemaHalls[cinemaId];
    const movie = system.movies[movieId];

    const container = document.getElementById("showResults");
    container.innerHTML = "";

    system.getShowsOfMovieInCinema(cinema, movie, filterDate).forEach(show => {
        const li = document.createElement("li");
        li.innerText = `📅 ${show.date} • ⏰ ${show.time} • 🪑 ${show.getAvailableSeats()} left`;
        container.appendChild(li);
    });
}

function addMovie() {
    const title = document.getElementById("movieTitle").value.trim();
    if (!title) return;
    const movie = new Movie(system.nextMovieId++, title);
    system.addMovie(movie);
    showToast(`🎬 Added movie: ${title}`);
}

function addCinemaHall() {
    const name = document.getElementById("cinemaName").value.trim();
    const city = document.getElementById("cinemaCity").value.trim();
    if (!name || !city) return;
    const cinema = new CinemaHall(system.nextCinemaId++, name, city);
    system.addCinemaHall(cinema);
    showToast(`🏛️ Added cinema: ${name}`);
}

function addShow() {
    const cinemaId = parseInt(document.getElementById("showCinemaSelect").value);
    const movieId = parseInt(document.getElementById("showMovieSelect").value);
    const date = document.getElementById("showDate").value;
    const time = document.getElementById("showTime").value;
    const totalSeats = parseInt(document.getElementById("showSeats").value) || 50;

    if (!date || !time) return;

    const movie = system.movies[movieId];
    const show = new Show(system.nextShowId++, movie, date, time, totalSeats);
    system.addShow(cinemaId, show);
    showToast(`🕒 Added show: ${movie.title} at ${time} on ${date}`);
}

function simulatePayment() {
    const showId = parseInt(document.getElementById("bookShowSelect").value);
    const seatCount = parseInt(document.getElementById("seatCount").value);

    if (!seatCount || seatCount <= 0) {
        showToast("Please enter valid number of seats.");
        return;
    }

    try {
        const booking = system.createBooking(showId, seatCount);
        // Simulate payment success
        setTimeout(() => {
            system.confirmBooking(system.bookings.indexOf(booking));
        }, 1000);
    } catch (e) {
        showToast(e.message);
    }
}

function searchCinemas() {
    const movieId = parseInt(document.getElementById("searchMovieSelect").value);
    const city = document.getElementById("searchCity").value.trim();

    const results = system.getCinemasInCityShowingMovie(city, system.movies[movieId]);
    const container = document.getElementById("cinemaResults");
    container.innerHTML = "";
    results.forEach(cinema => {
        const li = document.createElement("li");
        li.innerText = `🏛️ ${cinema.name} • 📍 ${cinema.city}`;
        container.appendChild(li);
    });
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// === THEME TOGGLE LOGIC ===
const themeToggle = document.getElementById('themeToggle');
const toggleThumb = document.getElementById('toggleThumb');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    toggleThumb.style.transform = 'translateX(24px)';
}

themeToggle.addEventListener('click', () => {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    if (isLight) {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        toggleThumb.style.transform = 'translateX(0)';
    } else {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleThumb.style.transform = 'translateX(24px)';
    }
});