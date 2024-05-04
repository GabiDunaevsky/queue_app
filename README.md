#  Businesses Appointment Manager App

## Introduction

This project is a Nail Appointment Manager app designed to streamline the appointment booking process for nail businesses. The app offers user authentication and a user-friendly interface to manage appointments effectively. Additionally, the app's modular design allows for easy customization, making it suitable for various types of businesses.

## Features

* **User Authentication**: Secure login and registration system for authenticated access to the app's features.
* **Appointment Management**: Intuitive interface with multiple pages to guide users through the appointment booking process.
* **Responsive Design**: The app is responsive and adapts to different screen sizes, ensuring a seamless experience across devices.
* **Flexible Customization**: The modular architecture of the app allows for easy customization to fit the needs of different businesses.

## Pages

### Before Authentication

1. **Landing Page**: The homepage featuring sections for setting appointments, browsing nail works, and contacting the business.
<img width="450" alt="image" src="https://github.com/GabiDunaevsky/queue_app/blob/main/views/frontend/src/assets/ImgOfPages/home.png"> <img width="450" alt="image" src="https://github.com/GabiDunaevsky/queue_app/blob/main/views/frontend/src/assets/ImgOfPages/homeNavBar.png">
<img width="450" alt="image" src="https://github.com/GabiDunaevsky/queue_app/blob/main/views/frontend/src/assets/ImgOfPages/homeAboutme.png"> <img width="450" height ="150" alt="image" src="https://github.com/GabiDunaevsky/queue_app/blob/main/views/frontend/src/assets/ImgOfPages/homeConract.png">
2. **My Works Page**: Showcase of nail images with a link to the business's Instagram page.
   
   &nbsp;<img width="450" alt="image" src="https://github.com/GabiDunaevsky/queue_app/blob/main/views/frontend/src/assets/ImgOfPages/myWorksPage.png">
  
4. **Login Page**: User authentication page for logging in with existing credentials.
   
  <img width="450" alt="image" src="https://github.com/GabiDunaevsky/queue_app/blob/main/views/frontend/src/assets/ImgOfPages/LoginPage.png">
  
4. **Register Page**: User registration page for creating a new account.
   
  <img width="450" alt="image" src="https://github.com/GabiDunaevsky/queue_app/blob/main/views/frontend/src/assets/ImgOfPages/registerPage.png">

### After Authentication

1. **Appointment Type Page**: Selection of appointment types with the option to view existing appointments.
   
  <img width="450" alt="image" src="https://github.com/GabiDunaevsky/queue_app/blob/main/views/frontend/src/assets/ImgOfPages/AppontmentTypePage.png">
  
2. **My Appointments Page**: Display of upcoming appointments with the option to cancel.
   
  <img width="450" alt="image" src="https://github.com/GabiDunaevsky/queue_app/blob/main/views/frontend/src/assets/ImgOfPages/myAppointmentsPage.png">
  
3. **Appointment Date Page**: Selection of appointment dates.
   
  <img width="450" alt="image" src="https://github.com/GabiDunaevsky/queue_app/blob/main/views/frontend/src/assets/ImgOfPages/appointmentDatePage.png">
  
4. **Appointment Time Page**: Selection of available appointment times.
   
  <img width="450" alt="image" src="https://github.com/GabiDunaevsky/queue_app/blob/main/views/frontend/src/assets/ImgOfPages/appointmentTypePage.png">
  
5. **Confirm Page**: Review of appointment details before final confirmation.
   
  <img width="450" alt="image" src="https://github.com/GabiDunaevsky/queue_app/blob/main/views/frontend/src/assets/ImgOfPages/confirm page.png">

## Architecture

The app follows the MVC (Model-View-Controller) pattern and is built using the MERN stack:

1. **MongoDB**: Database for storing app data, including user information and appointment details.
2. **Express.js**: Backend framework for handling routes, requests, and middleware.
3. **React**: Frontend library for building user interfaces with reusable components.
4. **Node.js**: Backend runtime environment for executing JavaScript code.

## Security

- **Session Management**: Implemented session-based authentication using cookies with expiration times for enhanced security.
- **Password Hashing**: User passwords are hashed before storage in the database to protect user privacy.
- **CORS and Credentials**: Utilized CORS (Cross-Origin Resource Sharing) and credential settings to ensure secure access to resources.

## Tools Used

* **Thunder Client**: Used for testing HTTP requests during development.
* **Axios and Fetch**: Utilized for sending HTTP requests between frontend and backend.
* **Responsive Design**: Ensured that the app's interface adjusts seamlessly to different screen sizes for optimal user experience.

## Installation

To run the app locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the server using `npm start`.
5. Access the app in your browser at `http://localhost:port`.

## Conclusion

This Nail Appointment Manager app combines cutting-edge technologies with user-centric design principles to provide a seamless booking experience for both businesses and customers. While the README provides an overview of the main technologies and methods utilized, it's worth noting that there are additional techniques and technologies employed throughout the app. To explore further and discover more about the app's development process, feel free to dive into the codebase and explore its intricacies.

