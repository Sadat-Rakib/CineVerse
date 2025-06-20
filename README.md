# CineVerse

# 🎬 CineVerse - Movie Ticket Booking System

A modern, feature-rich web application for movie ticket booking and cinema management. Built with vanilla HTML, CSS, and JavaScript, featuring a sleek dark/light theme toggle and comprehensive booking functionality.

## ✨ Features

- **User Authentication** - Simple login system with personalized experience
- **Movie Management** - Add and manage movie listings
- **Cinema Hall Management** - Create and organize cinema halls by city
- **Show Scheduling** - Schedule movie shows with date, time, and seat capacity
- **Smart Booking System** - Book tickets with real-time seat availability
- **Advanced Search** - Find cinemas showing specific movies in any city
- **Show Filtering** - Filter shows by date for better planning
- **Booking Management** - View and cancel your bookings
- **Theme Toggle** - Beautiful dark/light mode with smooth transitions
- **Toast Notifications** - Real-time feedback for all operations
- **Responsive Design** - Optimized for all screen sizes

## 🚀 Demo

1. Clone the repository
2. Open `index.html` in your web browser
3. Login with any name to start using the system
4. No server setup required - runs entirely in the browser!

## 📋 How to Use

### Getting Started
1. Enter your name on the login screen
2. Start by adding movies and cinema halls
3. Create shows by combining movies, cinemas, dates, and times
4. Book tickets and manage your reservations

### Adding Content
- **Movies**: Add movie titles to the system
- **Cinema Halls**: Create cinemas with name and city
- **Shows**: Schedule movies at specific cinemas with date/time

### Booking Process
1. Select a show from the dropdown (filter by date if needed)
2. Choose number of seats
3. Click "Proceed to Pay" for instant booking confirmation
4. View all your bookings in the "Your Bookings" section

### Search & Discovery
- **Find Cinemas**: Search for cinemas showing a specific movie in any city
- **Show Listings**: Get all shows for a movie at a specific cinema
- **Date Filtering**: Filter shows and bookings by date

## 🏗️ System Architecture

### Core Classes

#### `Movie`
- Represents individual movies with unique IDs and titles
- Foundation for the entire booking system

#### `CinemaHall`
- Manages cinema properties (name, city, shows)
- Stores all shows scheduled at the cinema

#### `Show`
- Links movies to cinemas with scheduling details
- Manages seat booking and availability
- Handles date/time filtering

#### `Booking`
- Represents user ticket reservations
- Tracks booking status and seat counts
- Enables booking confirmation and cancellation

#### `MovieTicketSystem`
- Central system orchestrating all operations
- Manages movies, cinemas, shows, and bookings
- Provides search and filtering capabilities

## 🎨 Design Features

- **Modern UI/UX** - Clean, professional interface with smooth animations
- **Dark/Light Themes** - Toggle between themes with persistent storage
- **Interactive Cards** - Hover effects and smooth transitions
- **Color-Coded Actions** - Visual feedback for different operations
- **Responsive Layout** - Adapts beautifully to mobile and desktop

## 🎯 Key Functionalities

### Booking Management
- Real-time seat availability checking
- Automatic booking confirmation
- Easy cancellation with seat release
- Booking history tracking

### Search & Filter
- City-based cinema search
- Movie-specific show listings
- Date-based filtering across all features
- Dynamic UI updates

### Data Management
- In-memory data storage
- Automatic ID generation
- Relationship management between entities
- Error handling and validation

## 📱 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🔧 Configuration

### Default Settings
- Shows: 50 seats per show (customizable)
- Theme: Dark mode (auto-saves preference)
- Storage: Browser localStorage for theme persistence

### Customization
Modify default seat capacity in `system.js`:
```javascript
const totalSeats = parseInt(document.getElementById("showSeats").value) || 50;
```

## 📁 File Structure

```
cineverse/
├── index.html          # Main HTML structure
├── system.js           # Core JavaScript logic
├── README.md          # This file
└── LICENSE            # License file
```

## 🛠️ Technical Implementation

- **Pure Vanilla JavaScript** - No frameworks or dependencies
- **ES6+ Features** - Modern JavaScript syntax and classes
- **CSS Custom Properties** - Dynamic theming system
- **Local Storage Integration** - Theme persistence
- **Event-Driven Architecture** - Responsive user interactions
- **Object-Oriented Design** - Clean, maintainable code structure

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:
- Check the browser console for error messages
- Ensure JavaScript is enabled in your browser
- Verify all files are properly loaded
- Open an issue on GitHub for assistance

## 🎯 Future Enhancements

- [ ] User registration and authentication
- [ ] Payment gateway integration
- [ ] Email booking confirmations
- [ ] Seat selection interface
- [ ] Movie ratings and reviews
- [ ] Advanced reporting and analytics
- [ ] Admin dashboard
- [ ] API integration
- [ ] Database persistence
- [ ] Mobile app version

## 🏆 Key Benefits

- **Zero Setup** - Runs directly in any modern browser
- **Lightweight** - No external dependencies
- **Fast Performance** - Optimized vanilla JavaScript
- **User-Friendly** - Intuitive interface design
- **Scalable Architecture** - Easy to extend and modify

---

**Made with ❤️ for seamless movie booking experiences**
