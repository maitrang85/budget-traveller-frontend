# Budget Traveler Frontend

Frontend part for project Budget Traveler - Group Naturae - Fall 2021 

## Group Members:

* Hang Huynh 
* Miro Taxell 
* Trang Nguyen

## Project Description

Budget Traveler is a media sharing web aiming at connecting camping enthusiasts where they can share their favorite camping spots and thrilling stories while camping. At the present, Budget Traveler focuses on promoting marvelous camping spots and diversed camping activities available in Finland. 

Budget Traveler emloys REST architectural style as the ultimate guide for designing and developing this web app. In our envisage, this web app will require continuous connection between browser and server for the users to be updated immediately with new posts and actitvities from their friends, in addition to other user actions. Therefore, Node JS is chosen due to its efficiency in handlling huge number of requests from client. MySQL is selected as our Database Management System considering its superior performance in various aspects such as low cost, high compatibility with a wide range of programing languages and technology, around-the-clock availability and security. 

## Features of the project
### User stratification
Users are divided into three different groups (unauthenticated users, authenticated users and administrators) with different permissions to access to the web resources. Unauthenticated users can browse posts, read comments and see other users. Authenticated users, on the top of granted permissions for unauthenticated users, can add new posts, upload images, comment in other users' posts, like and dislike posts, modify or delete their own posts and own comments. Administrators are able to delete offending posts and comments to keep this community enjoyable to all the members.  

### Additional features
- Newest posts and comments will be placed on the main page and on the top to provide updated information.
- Campsites can be filtered according to regions in Finland. Filtering by free or paid is also implemented.
- A map of the campsite location and its surrounding area to equip campers with necessary information for trip planning
- Responsive UI that is beautifully fitted to both desktop and mobile screens

## How to install the project
### Technical requirements
[Node.js (version >= 14.18.1)](https://nodejs.org/en/)
[Mariadb (version >= 10.6.5)](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.6.5l)
### Getting started
1. Clone the project to your local machine using `git clone https://gitlab.metropolia.fi/trangtn/budget-traveler-backend.git`
2. Install dependencies using `npm i``
3. Create file `.env` in the root directory of the project
4. Input the following content to `.env` and fill in the relevant information after '=' 
```
// Database credentials
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
// jwt secret
JWT_SECRET=
// Mapbox token for extracting coordinates
MAPBOX_TOKEN= 
```
5. Create initial tables for the database by running the script in the file databasev5.sql

## API Documentation
At local environment: `https://localhost:8000/apiDoc`

