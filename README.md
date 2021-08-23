## Introduction

This project was built to illustate the information about the geographical and temporal status of covid pandemics, and to provide a platform for users to share their stories about the covid. A number of covid dashboard have been developed out there, but this project was built on its own ways: distinctiveness and complexity. The project uses COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University to generate the statistics, graphs and geographical maps of the web app.

## Requirements
* React JS
* Docker Desktop

## Setting Up the app
1. Clone the project to your machine ```[git clone https://github.com/huutrungrimp/capstone]```
2. Open an terminal, then
      - Navigate into the backend directory of the project ```[cd backend]```;
      - run ```[docker-compose up]```

3. open one more terminal, then
      - Navigate into the backend directory of the project ```[cd frontend]```;
      - run ```[npm install]```
      - run ```[docker-compose up]```
      - wait until ```[Compliled successfully]```


## Run the application
On your web browser, open the page ```[ http://localhost:3000/ ] ```

## Specification

* **Loading page:** this page is opened when data for the maps and graphs are being processed and loaded. The page requests users to wait for all the maps and graphs loaded completely. As the loading has been completed, the home page is opened with Covid19 statistics today, which includes confirmed cases, deaths, and recovered people over the world and their changes between the two recent days. The page also shows variations in the vaccinations of Asia, the Europe, and the Africa as well as in the high and lower income countries. Another section of the home page is a list of the posts that registered users tell their stories about Covid 19. In order to post their stories, users need to login or register an account if they do not already have one. This section is similar to the three projects.
* **Covid Cases Dropdown:** The Covid Cases illustrates geographical maps and temporal graphs. When users click on the confirmed in the dropdown, they can see variations of confirmed cases across the world. If they click on a country, the confirmed cases of that country is shown. The page also presents the temporal trend of confirmed cases for Canadas as default since the onset of pandemic, but they can see the temporal pattern for their interested country by clicking on the country-dropdown selection. Similarly, users can also the death dropdown to explore the geographical and temporal pattern of deaths across the world and individual countries.

* **Vaccination Dropdown:** This dropdown allows users to explore how the vaccination efforts vary across the world and the efforts of each country over the last recent years. The link of temporal shows the daily vaccinations, the total number of vaccinated people, the total number of fully-vaccinated people and the total vaccination of Canadas as default. Users can also select any country that they are interested in by clicking on the country-selection dropdown. The graphs allow users to get ideas when vaccinations started in each country, and how vaccination efforts have been invested over time. The dropdown also provides the global link that leads users to compare the efforts on daily vaccinations, the total number of people who received fully vaccination across the world.

* **Recovery link:** The link direct to a page, which illustate the distribution of the number of recovered people across the globe and the trend of recovery for individual countries. For unknown reasons, there have been no update of the recovery on the database for recent days, so all the number of recovered peope of countries was set zero and there is only one color for all country on the global recovery map.

* **Stories Dropdown:** The dropdown only appears when an user logged in their account. As stated earlier, this section is similar to some of previous projects therefore this section is not a focus of the web app. It provides the user with a link to a page, where he/she can post a new post. If a post was created, it should be listed in the home page. The user can view their posts by clicking the My Posts link on the dropdown. On this page, the user view the detail of the post, or update or delete their posts.


## Distinctiveness 

This project differ extensively from the five previous apps of the CS50 course. First, it focuses on the geographical and temporal statistics on the frontend side using React (a framework of Javascript), which are produced from the backend using Django. Data for geographical maps and temporal graphs was produced using various python packages, such as pandas and geopandas, and was ouputed as JSON format before rendering for the front-side.

## Complexity
This project was built on the combination of three frameworks: Django, the Django REST Framework for API, and React. The backend and frontend is connected though using Django Rest Framework, which allow to process server-side and then render html on front-side. The web app was developed without using the Django templates, but instead using the Django to output everything on backend as JSON which can be comsumed by the Reat Leaflet and the Rechart of Javascripts to produce reactive maps and graphs in the React framework. 
