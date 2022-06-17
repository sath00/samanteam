# SamanTeam

Software Engineering I

# Project Vision:

Develop a user-friendly online marketplace that allows customers to conveniently browse with ease and improve work ease and efficiency of Romel’s Mini Mart through technological approach.

# SamanTeam – Project Charter

Project name: WebMart

Project manager: Samantha Jane Gomez

Last revision date: March 11, 2022

Project purpose statement: The purpose of this project is to develop a platform for Romel’s Mini Mart through the use of a website containing their showcase of products and store information visible to customers and also help monitor inventory for the owner.

Project objectives: Create a fully functioning website for Romel’s Mini Mart with the necessary features catered to the customers and the owner.

# Project Scope

Deliverables:
Website Design,
Draft Version of Site,
Final Version of Site

Creative requirements:
Display,
Shows logo,
Product slideshow,
Logo,
Color palette

Out of scope:
Check out,
Reservation,
User accounts

Resources:
Scrum team (five people), 5 hours per week for 13 weeks

# How to run
managed to combine nodemon and ng when testing. To run both frontend and backend simultaneously,
use the command:
`npm start`




use nodemon for backend:
`nodemon server.js`

use ng serv for frontend:
`ng serve`


# How set `npm start` manually:

1. Go to package.json and look for scripts
2. Go to start and replace current value with `"ng serve & node server.js"`

# Note: 
remove *node_modules* folder then run `npm install` when greeted with an error regarding dependencies.


# How to clear Angular Cache

1. `npm cache clear --force`
2. `npm cache verify`
