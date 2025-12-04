# ReFlect
Lorelai Harris \& Chaelynn Lim

HCDE 438, Fall 2025

https://hcde-438-cb467.web.app/

### PROJECT OVERVIEW
Our project ReFlect is a mindfulness-focused application featuring mood logs and a playful images and jokes generator. Our mood log features buttons on a scale of 1 through 5 to log different feelings our users may have. Your past responses remain logged on your mood tracker until users edit or remove them. Our application has a recommendations page where users can generate a joke and a cute dog image to brighten their day. We intend this application to be a tool for users to reflect on their progress in mood regulation and provide them with joy. Our purpose for this project was to help support people who are prone to high stress, such as students juggling finals. We also considered seasonal depression in Seattle and wanted to bring more happiness into our community through our recommendations.

### TECHNOLOGIES USED
We utilized Firebase to host our website and Authentication to create our login page. Additionally, we used Firestore to collect our user data from the mood tracker page. We implemented React and used hooks like useState, useCallback, and useEffect to help fetch data for our APIs. React (or Node.js) was also used to manage our component state. We also utilized it to For our recommendations page, we used the Official Joke API to generate a random joke and the Dog API to pull dog images. 

### SETUP / USAGE GUIDELINES
To set up, you first need to download node.js and npm. You also need to have git installed. You then must clone the repository using git clone. Then, you install npm and configure the Firebase using a file called .env. Once you complete the previous steps, you can run the application with npm start. 

### API DOCUMENTATION
The APIs we used include Official Joke API and Dog CEO API. None of them required API keys as they were stateless. The purpose of our joke fetching API was to pull a random joke to brighten our user's day. This is our base url https://official-joke-api.appspot.com and the endpoint used was random_joke. Our second API fetched an image of a dog for uplifting our users. The base url for this API is https://dog.ceo and it used the endpoint /api/breeds/image/random. 

### FUTURE ENHANCEMENTS
As a result of unenxpected CORS-related bugs from our API implementation, our team had to shorten the time we planned on implmenting our user-friendly UI design features. Thus, a future enhancement for our project is further change and test our UI design to follow accessibility guidelines like the WCAG. Additionally, a feature we would want to integrate if we were given more time is connecting the mood data to help generate personalized jokes and images using Gemini API. 

### AI STATEMENT
No generated AI code was used in our final project. However, we tried to use AI agent connected through VS code to help debug our initial API integration challenges. The prompt we inputted was "help us debug this," however we reverted back to our original code as we realized it changed code beyond our recommendations.jsx file. 

### PERSONAL REFLECTIONS

##### Lorelai:

Through this project, I learned how to use React with Vite, Firebase Firestore, Authentication, and Hosting, and I learned how to implement that all with APIs to create a working application. This project definitely helped me strengthen my React skills, as I was not very confident with the syntax or the usage of hooks before. Creating my own app helped me understand what I would actually able to use React for in the future because I created my own components and figured out how they all related to each other on my own, rather than just copying an example and not thinking much about how the components relate to each other. Additionally, I learned how to use Firebase databases to store larger amounts of data more efficiently rather than using dictionaries or other data structures. This also helped with the Authentication part, because I was able to display only the data for that particular user, rather than displaying the data for everyone combined. 

One main problem we had was finding APIs that worked with our app. Originally, I had hoped to use the Spotify Web API, but after testing that out, I kept running into authentication errors. We also ran into issues with other APIs, such as the Zen Quote API that we had also initially intended on using. This, and many other APIs we tried, ran into problems with CORS. We went through multiple APIs but eventually found some that worked properly with our app, and we were able to adjust to using those ones instead. I had initially planned on working on the APIs first, but once I started working on the application I got distracted by what I realized I could do with components in React and I ended up putting off the APIs until the last minute, as I thought it would be easy since I had used many APIs before with no issues. What I learned from this experience was to try to work on the APIs first, rather than the pages or components of the app.

##### Chaelynn:

