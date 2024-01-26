# baby-milesontes-tracker
# Baby Milestones Tracker

## Overview

Welcome to the Baby Milestones Tracker! This application is designed to help parents keep track of their baby's developmental milestones. The project was developed using Expo (React Native) and Typescript, leveraging the power and simplicity of React Native Paper for styling components without manual intervention. Additionally, the application benefits from improved styling through the use of TWRNC (Tailwind React Native Class).

## Key Design Decisions and Considerations

### Technologies Used

1. **Expo (React Native):**
   - The project is built with Expo, a framework for building cross-platform applications using React Native. This allows for seamless development for both iOS and Android platforms.

2. **Typescript:**
   - Typescript is employed to enhance code maintainability and catch potential errors during development, providing a more robust codebase.

3. **React Native Paper:**
   - To streamline the styling process and maintain consistency in design, React Native Paper is utilized. This library simplifies styling components, making the UI development process more efficient.
   - Reference link: [React Native Paper](https://reactnativepaper.com/)

4. **TWRNC (Tailwind React Native Class):**
   - TWRNC is used to enhance the styling of components, providing a utility-first approach and making it easier to design visually appealing and responsive user interfaces.
   - Reference link: [TWRNC on npm](https://www.npmjs.com/package/twrnc)

### Local Data Management

1. **AsyncStorage:**
   - AsyncStorage is employed for local data storage, allowing the application to read, update, and add milestones on the client side. This ensures that each milestone added by a user is stored persistently on the device.

2. **Reusable Card Components:**
   - The application optimizes code reusability by implementing reusable card components for milestones. This approach enhances maintainability and consistency in the user interface.

### User Session Management

1. **Context and AsyncStorage:**
   - Context is utilized alongside AsyncStorage to manage user sessions. This ensures a seamless and secure user experience, as well as persistent data across different sessions.

### Type Inference

1. **TypeScript Type Inference:**
   - Type inference is incorporated when necessary to enhance code readability and provide better development experiences. TypeScript aids in catching potential type-related issues during development.

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Run the application using `expo start`.

Feel free to explore and contribute to the project. If you encounter any issues or have suggestions, please open an issue in the repository.

Happy tracking those precious baby milestones! 🍼🎉
