# weight_loss_tracker_front

### Made With Vite

Seeing as this was a single page application, I felt using something closer to traditional react would have been more appropriate here. Vite also has an already-configured webpack without a lot of the issues that create-react-app has, so this felt like the most appropriate option. 

### Setting Up

A fairly simple SPA with some dependencies, all of which can be installed by simply running:

    npm install
    
What probably deserves to be mentioned are Chart.js and Day.js. Chart.js was the charting library I used, while it works okay I did have some issues with styling and the react-chart-js documentation is not the best. Day.js also I ran into some issues with setting up locale correctly, but the date formatting and some of the other features the package offers were incredibly helpful in making this app.
    
### Description

This was a fun project to build as it gave me an opportunity to combine CRUD operations and charting libraries which was something I have wanted to try out for a while now. I believe along with Chart.js making my own calendar component was the best combination for optimal UX. Other weight loss tracker apps completely avoid using a calendar component to log and view entries and I think that this is unhelpful, mainly because I felt a calendar was the best format for visualising date and time over a long-term basis rather than having a long list of dates and numbers which are harder to make sense of.

What I especially enjoyed about this project was the problems of how to structure the data into a digestible format on the frontend. In the end I used a hashmap-like object structure rather than an array, simply because it was quicker and I felt it would make more sense than having to constantly loop through the data to find if a value for a day was present or not. More info about this is on the readme for the backend part of this app.
