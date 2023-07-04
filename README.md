# goodreads

## Description
This project was my final assignment for the General Assembly Software Engineering Immersive course. The objective was to develop a full-stack app using React for the frontend and Django REST Framework for managing data from a Postgres database. Inspired by my love for books and frequent usage of Goodreads, I chose to create a simplified version of a book-related app.

## Deployment link
https://goodreads-project.herokuapp.com/

The following credentials can be used:
* email: ivana@email.com
* password: lozinkaa123!


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
* Browse Books: Displays book categories and the books belonging to each category.
* Single Book: Shows detailed information about a specific book. Users can add books to their library by clicking the "Add to Library" button and categorize them as "Read," "Currently Reading," or "Wishlist." If a book is already in the library, the user can view its current category instead of the default "Add to Library" button.
* My Books: Allows logged-in users to manage their book library. They can view all the books they have added to a specific category (Read, Currently Reading, Wishlist) and also see the books in the "All" section that includes all categories combined.
* Profile: Shows the user's profile photo, bookshelves with links to different library categories, and the number of books in each category. It also includes recent updates for the user.

![Screenshot 2023-07-01 at 15 35 04](https://github.com/matea-nikolac/goodreads-project/assets/62067357/22722ae3-c659-41a1-a2ba-78902a757503)

![Screenshot 2023-07-01 at 15 36 23](https://github.com/matea-nikolac/goodreads-project/assets/62067357/06f510f6-9b29-4e4a-bba7-14cf312c667c)

In order to keep track of the tasks I need to do, I created a Trello board.

## Build Process

### Backend
In the backend, I have implemented the `Book`, `Review`, and `User` models and their views, serializers, and URL paths.

<img width="478" alt="Screenshot 2023-07-04 at 15 48 50" src="https://github.com/matea-nikolac/goodreads-project/assets/62067357/e3a9a328-d2a6-4d21-b4fc-054c835c9c65">

### Frontend

#### Login, Register, BrowseBooks
After creating the Login and Register page, I created the `BrowseBooks` component that fetches the book data from the server, filters the books by genre, and renders them in separate sections based on the categories. 

#### SingleBook
This frontend component was the most complex one because it handles the linking of the user and the book once the user has added a specific book to their library.
<img width="1042" alt="Screenshot 2023-07-03 at 18 40 29" src="https://github.com/matea-nikolac/goodreads-project/assets/62067357/3a8db515-686a-403f-8917-063de1d36617">

Also, I made sure that users could add books to their library only if they are logged in. 
<img width="924" alt="Screenshot 2023-07-03 at 18 55 01" src="https://github.com/matea-nikolac/goodreads-project/assets/62067357/0a7ecdd2-7499-4ae0-b2c3-9ea411fb16b4">

Moreover, this component also handles the reviews CRUD logic as well. Leaving reviews is also limited to only logged-in users.

<img width="726" alt="Screenshot 2023-07-03 at 18 46 25" src="https://github.com/matea-nikolac/goodreads-project/assets/62067357/6c25f0c3-83d9-478d-8e1f-2c6c7de23a2a">

#### MyBooks
The `MyBooks` component is responsible for displaying the user's list of books categorized into "all," "read," "reading," and "wishlist." I decided to add queries in the URLs, so the user can switch between these categories and have distinct URLs for each category. This allows users to easily share or bookmark specific category links, such as the link to only "read" books or "wishlist" books. This approach improves navigation and makes it easier for users to share or bookmark specific book categories. 

<img width="935" alt="Screenshot 2023-07-03 at 19 05 36" src="https://github.com/matea-nikolac/goodreads-project/assets/62067357/ea7d986b-280c-4633-8fd1-656ad7de5996">

#### Profile
Besides showing other profile-related information, the profile page also shows the user's bookshelves. Each shelf is represented as a clickable link, utilizing query parameters in the URLs to filter and display specific book categories. The number of books on each shelf is also shown next to the shelf name.

<img width="1230" alt="Screenshot 2023-07-03 at 19 12 26" src="https://github.com/matea-nikolac/goodreads-project/assets/62067357/fe7122f4-f0c2-4a62-8252-561c0a70ebc4">

Despite time constraints, I managed to add a "reading challenge" section. In order to create a dynamic progress bar, I designed it to retrieve the user's reading progress by checking the length of their "read" list (`user.read.length`) \in the user model. This ensures that the progress bar accurately reflects the number of books the user has read. Additionally, the reading goal can be updated at any time, allowing users to adjust their target as needed.

<img width="1125" alt="Screenshot 2023-07-03 at 19 30 37" src="https://github.com/matea-nikolac/goodreads-project/assets/62067357/5d2b4403-cf5a-4b7f-af10-641cdaf2bb93">

## Challenges
One of the most challenging aspects of the implementation was establishing a mechanism to track the books added by users to their read, reading, and wishlist categories. This tracking was crucial for dynamically displaying the appropriate category name instead of the "add to library" text on the SingleBook page. If a book had not been categorized before, the "add to library" text would remain unchanged. When a book is updated from one category to another, I wanted the button text to reflect the new category, ensuring consistency between the user interface and the database.

In order to achieve that, I added reading, reading, and wishlist custom fields to the User model.

![Screenshot 2023-07-03 at 15 00 56](https://github.com/matea-nikolac/goodreads-project/assets/62067357/a55033b4-6fa6-4933-96ee-0b208b0d9c1c)

Then I created the put method in the `UserDetailView` API view, which updates the user's details, including their book lists (read, reading, wishlist). It compares the updated book lists with the original lists to handle removing books from one list and adding them to another if necessary. Finally, it saves the updated user data and returns the serialized user information.

![Screenshot 2023-07-03 at 14 58 11](https://github.com/matea-nikolac/goodreads-project/assets/62067357/0d5b1e6f-8ed1-41e4-bf1a-f0e8264d3246)

## Wins
My biggest win was successfully completing my first solo full-stack project within the deadline while utilizing advanced server-side functionality to manipulate the database with complex conditions. 

## Key Takeaways
* I gained valuable insights into the functioning of models and serializers.
* I learned how to define and manipulate data structures, establish relationships between different entities, and ensure the smooth transfer of data between the application and the database.

## Bugs
I haven't noticed any bugs.

## Future Improvements
* During registration, instead of displaying "Request failed with status code 422" when the password is too simple, it would be preferable to display a more specific message like "Password too simple."

#### My Books
* Add a search bar.
  
#### Single Book
* Add book ratings.
* Add dates (when a book is added to the library, when a book is read, etc.).
* Add reading progress.
* Add a rating option.
* Display the average rating.

#### Browse Book
* Add a search bar
* Implement an "Add" button next to a book cover.
