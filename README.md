# goodreads

## Description
This project was my final assignment for the General Assembly Software Engineering Immersive course. The objective was to develop a full-stack app using React for the frontend and Django REST Framework for managing data from a Postgres database. Inspired by my love for books and frequent usage of Goodreads, I chose to create a simplified version of a book-related app.

## Deployment link
https://goodreads-project.herokuapp.com/

The following credentials can be used:
email: ivana@email.com
password: lozinkaa123!


## Code Installation
To set up the project, follow these steps:

* Go to the root directory of the project.
* Install the backend dependencies: `pipenv install`
* Enter the project shell: `pipenv shell`
* Start the server: `python manage.py runserver`
* Go to the client folder: `cd client`
* Install the frontend dependencies: `npm i`
* Run the frontend server: `npm run start`
  
## Timeframe & Working Team (Solo/Pair/Group)
This was a solo project, completed within a 1.5-week timeframe.

## Technologies Used
* React
* JavaScript
* Python
* Django
* PostgreSQL
* Axios
* SASS
* JSX
* HTML

## Brief

#### Requirements
* Build a full-stack application by making your own backend and your own front-end
* Use a Python Django API using Django REST Framework to serve your data from a Postgres database
* Consume your API with a separate front-end** built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
* Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers. ALLOW time for this.
* Be deployed online so it's publicly accessible.

## Planning

I Started the project by drawing a wireframe on Excalidraw. The app consists of the following pages:
* Login: Allows users to log in to their accounts.
* Register: Enables new users to create an account.
* Browse: Displays book categories and the books belonging to each category.
* SingleBook: Shows detailed information about a specific book. Users can add books to their library by clicking the "Add to Library" button and categorize them as "Read," "Currently Reading," or "Wishlist." If a book is already in the library, the user can view its current category instead of the default "Add to Library" button.
* My Books: Allows logged-in users to manage their book library. They can view all the books they have added to a specific category (Read, Currently Reading, Wishlist) and also see the books in the "All" section that includes all categories combined.
* Profile: Shows the user's profile photo, bookshelves with links to different library categories, and the number of books in each category. It also includes recent updates for the user.

![Screenshot 2023-07-01 at 15 35 04](https://github.com/matea-nikolac/goodreads-project/assets/62067357/22722ae3-c659-41a1-a2ba-78902a757503)

![Screenshot 2023-07-01 at 15 36 23](https://github.com/matea-nikolac/goodreads-project/assets/62067357/06f510f6-9b29-4e4a-bba7-14cf312c667c)

In order to keep track of the tasks I need to do, I created a Trello board.

## Build Process

### Backend

I started with creating the models - Book, Review, and User. After that, I defined all the necessary routes.

The most challenging part of the implementation was writing the put method in the UserDetailView class.

## Challenges


## Wins


## Key Takeaways


## Bugs
login and register page suddenly not working

## Future Improvements
* adding a photo upload option for the profile photo. ofa user

