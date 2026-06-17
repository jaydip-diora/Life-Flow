# 🩸 Life Flow: The Blood Link

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF.svg)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3.svg)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Share Life, Give Blood** - An innovative online blood booking web application designed to bridge the gap between blood donors, patients in need, and blood bank administrators.

## 📖 About

Life Flow is a comprehensive blood donation management platform that ensures efficient management of blood stock and rapid response to donation requests. Built with modern web technologies, this platform provides a seamless user experience for all stakeholders in the blood donation ecosystem.

## ✨ Key Features

- 🏥 **Real-time Blood Stock Management** - Track available blood units by group instantly
- 👥 **Multi-Role Dashboard** - Separate interfaces for Admin, Donors, and Patients
- 📊 **Analytics & Charts** - Visual representation of blood stock and donation trends
- 🔔 **Request Management** - Efficient handling of blood donation and request workflows
- 🔐 **Secure Authentication** - Protected routes and role-based access control
- 📱 **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and production builds

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js 18.3.1
- **Build Tool:** Vite 5.4.10
- **Styling:** Bootstrap 5.3.8, React-Bootstrap, Custom CSS3
- **Routing:** React Router DOM 7.13.0
- **Charts:** Chart.js 4.5.1, React-ChartJS-2
- **HTTP Client:** Axios 1.13.5
- **Notifications:** React-Toastify 11.0.5
- **State Management:** React Context API

### Development Tools
- ESLint for code quality
- Vite for fast HMR (Hot Module Replacement)
- Modern ES6+ JavaScript

## 🧩 System Modules

The application is divided into three core modules, each with dedicated dashboards and specific functionalities:

### 1️⃣ Admin Module
The centralized control panel for managing the entire blood bank ecosystem.

- **Dashboard Management** - Overview of all system metrics and activities
- **User Profiles** - Manage and verify both donor and patient profiles
- **Blood Stock Management** - Real-time tracking and updating of available blood units by group
- **Donation Requests** - Review and approve incoming requests from donors
- **Patient Responses** - Handle and fulfill urgent blood requests from patients

### 2️⃣ Patient Module
A user-friendly interface designed for individuals requiring blood.

- **Patient Dashboard** - Personal hub for tracking requests and medical needs
- **Blood Request System** - Submit direct requests for specific blood groups during emergencies
- **Request History** - View past blood requests and their status

### 3️⃣ Donor Module
A dedicated portal to encourage and streamline the blood donation process.

- **Donor Dashboard** - Track personal donation history and profile details
- **Schedule Donations** - Conveniently book and schedule upcoming blood donation appointments
- **Donation History** - View complete donation records and contributions

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, icons, and other assets
│   ├── components/     # Reusable React components
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── context/        # React Context for state management
│   │   └── AuthContext.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminBloodStock.jsx
│   │   ├── AdminUsers.jsx
│   │   ├── DonorDashboard.jsx
│   │   ├── PatientDashboard.jsx
│   │   └── Feedback.jsx
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Application entry point
│   ├── App.css         # Global styles
│   └── index.css       # Base styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md          # Project documentation
```

## 🚀 Installation & Setup

Follow these steps to get a local copy up and running:

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Git**

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jaydip-diora/Life-Flow.git
   ```

2. **Navigate to the frontend directory:**
   ```bash
   cd Life-Flow/frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   
   Create a `.env` file in the root of the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   
   *Adjust the API URL according to your backend configuration.*

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   
   Navigate to `http://localhost:5173` (default Vite port)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 💻 Usage

Once the development server is running:

1. **Access the Application:** Open your web browser and navigate to `http://localhost:5173`

2. **Choose Your Portal:**
   - **Admin Portal** - Manage users, blood stock, and requests
   - **Patient Portal** - Submit and track blood requests
   - **Donor Portal** - Schedule donations and view history

3. **Register/Login:** Create an account or login with existing credentials

4. **Explore Features:** Navigate through the respective dashboards to explore all features

## 🔧 Configuration

### Vite Configuration

The project uses Vite for fast development and optimized production builds. Configuration can be modified in `vite.config.js`.

### Environment Variables

Create a `.env` file for environment-specific configurations:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Other configurations as needed
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jaydip Diora**

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Bootstrap team for the excellent UI framework
- React community for amazing tools and libraries
- All blood donors who inspire this work 🩸

## 📞 Support

If you have any questions or need help, please:

- Open an issue on [GitHub Issues](https://github.com/jaydip-diora/Life-Flow/issues)
- Contact the project maintainer

---

<div align="center">
  <p>Made with ❤️ for a noble cause</p>
  <p>⭐ Star this repository if you find it helpful!</p>
</div>
