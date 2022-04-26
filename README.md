# Overlook

![Overlook Hotel](https://media.giphy.com/media/8VJ16DcNZQtkA/giphy.gif)

- [Introduction](#introduction)
- [Learning Goals](#learning-goals)
- [Technologies](#technologies)
- [Features](#features)
- [Page Demo](#page-demo)
- [Future Extensions](#possible-future-extensions)
- [Set Up](#set-up)
- [Project Spec](#project-spec)
- [GitHub Repo](#github-repo)
- [Additional Resources](#additional-resources)

## Introduction
Overlook is a final solo project for Module 2 that encompasses 12 weeks of learnings in the below technologies. Within a one week sprint, a functional reservation-booking interface was constructed to simulate a user's profile and functionalities similar to that of a hotel's website.

*Fun Fact- The shade of orange used in the website is the same color used in Stanley Kubrick's The Shining, which takes place at the Overlook Hotel*

## Learning Goals
- Use Object Oriented Programming to drive development of web application.
- Employ a robust testing suite to ensure all implementation code is working as expected.
- Work with Fetch API to send and retrieve data.

## Technologies
  - Vanilla Javascript
  - HTML
  - CSS
  - Mocha
  - Chai
  - Fetch API
  - Webpack
  - NPM
  - Lighthouse (accessibility)
  - Wave (accessibility)

## Features
- Upon page load, the user is prompted to login using their username and password.
  - In the instance the user attempts to login with invalid credentials, the user is presented with an error message.
  - If valid credentials are used, the user is taken to their personal dashboard.
- In the user's personal dashboard, they are able to see all of their past/current/future bookings as well as the total they have spent on these rooms.
- On the user's personal dashboard, there is a book now button, which will direct them to the booking dashboard.
- When in the user dashboard, a home button appears, allowing the user to easily navigate back to their dashboard.
- One the booking dashboard, the user is first prompted to select a date.
  - The earliest date they can select is the current day.
  - If they do not select a date, an error message will display prompting them to choose a date before continuing.
  - Once a date has been selected, the user can view available rooms.
- When scrolling through available rooms, the user can click on a room, or filter rooms by type.
  - The user also has the option to clear the selected filter and view all of the available rooms once again.
- Once the user has selected a room, they are taken to a confirmation screen, where they can hit the book now button and submit their booking.
- Once a booking is completed, the user receives a confirmation message and is redirected to their homepage/ personal dashboard.

## Page Demo
User dashboard / Booking a room:

![Overlook Hotel UI](https://media.giphy.com/media/Nqr5dfO6e0uaOGjaHt/giphy.gif)


## Possible Future Extensions
- Add functionality that would give users unique ID's, similar to how most interfaces that require password verification work.
- Allow users to cancel/edit/delete their upcoming reservations.
- While there is significant error handling to address the date input when a user is booking a room, there is an opportunity for users who navigate the sight with a keyboard to manually enter any date and book a room. Continued error handling for this is top priority for a future extension.

## Set Up
1. Fork and clone this repo.
2. Read this README thoroughly.
3. Clone down and install [this](https://github.com/turingschool-examples/overlook-api) local server and follow the instructions in the README. This server will need to run in a separate tab in your terminal in order to use the webpage.
4. Type `cd overlook` to move into the root directory.
5. Run `npm install` to install necessary dependencies.
6. Run `npm start`.
7. Copy the url given by running `npm start` and open in your browser.
8. Log in using `customer<id>`, where the id will be a number anywhere between 1 and 50. The password is `overlook2021`.
9. Explore the user's dashboard and book some rooms!

## Project Spec
- The spec for this project can be found [here](https://frontend.turing.edu/projects/overlook.html).

## Project GitHub Repo
- The project repo can be found [here](https://github.com/stephanie-roe/overlook).

## Additional Resources
- [Figma Wireframe]()
