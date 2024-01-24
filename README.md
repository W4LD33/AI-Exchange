# AI Exchange - Platform to discuss AI Ethics and Governance

#### Description:

Workout Logger is a web application designed to help users keep track of their exercise routines and view statistical insights over time. With this app, users can easily log their workouts and monitor their progress through interactive charts and tables.

AI Exchange is a web application designed to help users discuss AI Ethics and Governance in a forum based format.

#### Features:

1. **Posting questions:** Users can ask questions by posting them on the main page.
2. **Viewing other users questions:** Users can search & view other users questions.
3. **Interaction trough commenting and liking/disliking:** Users can interact with other users by discussing the topic further by commenting.
4. **User Authentication:** To ensure data privacy, the app implements password hashing using bcrypt's security library for user authentication.
5. **Minimalistic Design:** The app's design focuses on simplicity and ease of use, providing users with a clean and intuitive interface to make the exercise logging process hassle-free.



#### Challenges Faced:

During development, one of the main challenges was to display data in different relations and properly link different datatables for displaying many diferrent topics, their comments and likes/dislikes. To overcome this, the project employed table joins in SQL to establish the necessary connections between the workout data and exercise details.


#### Technologies Used:

1. React: The web application is built using React, a front-end framework in Javascript, to handle routing and HTTP requests.
2. PostgreSQL: This library is utilized to interact with the  database, allowing for efficient storage and retrieval of exercise and user data.
3. Bcrypt: Used for password hashing to securely store user credentials in the database.
4. JavaScript: To enhance the user experience, JavaScript is incorporated to generate interactive charts for visualizing workout progress.
5. Bootstrap: The app utilizes Bootstrap's CSS styling to maintain a simple and aesthetically pleasing design.


#### Design Choices:

The design of the AI Exchange prioritizes simplicity and usability, as the main objective was to create a user-friendly and minimalistic exercise logger. Bootstrap was chosen for its responsive layout and pre-designed components, which allowed for quicker development and ensured a consistent look across different devices.


#### Instructions:

To run the AI Exchange, follow these steps:  

1. Ensure you have Node and React installed on your system.
2. Clone the project repository to your local machine.
3. Open a terminal and navigate to the project directory.
4. Go to client & server directories separatelly and run ``` npm install ``` to install the necesarry dependencies.
6. Set up the PostgreSQL database by running the provided commands in the data.sql file.
6. Set up the necesarry .env variables inside server/config folder (USERNAME, PASSWORD, HOST, DBPORT, DATABASE, PORT).
8. Access the application by navigating to http://localhost:3000 in your web browser.

#### Additional Information:

The AI Exchange was developed as part of a personal project to enhance programming skills while building a practical and useful application. The app is still a work in progress, and future updates may include more features, such as workout plan customization and social sharing capabilities. Feedback and suggestions are always welcome to improve the app further.
