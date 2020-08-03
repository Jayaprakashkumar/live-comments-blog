# *Comment-Blog*

## Directory Structure
    .   
	├── client                    # Components, services and styling using REACT
    ├── server                    # Rest API, DB integration using FLASK 
    ├── screenshots               # overview of project
    ├── usercomments              # Database information
    └── README.md
    

## List of tools required :

### Flask - python

https://www.python.org/downloads/

### React

https://reactjs.org/tutorial/tutorial.html#setup-for-the-tutorial

### MySQL via XAMPP

https://www.apachefriends.org/download.html


## Steps to run the application

1. **Run database server** - Launch the XAMPP locally , then start the apache server and MySQL. Then navigate to phpmyadmin via admin button in MySQL and create a new database and table. The database informations are available in usercomments.sql file.

2. **server Development Server** - Move to path "server/" and run `python server.py` for hosting the server locally. It runs the server at endpoint`http://127.0.0.1:5000/`. The app will automatically reload if any changes are made in the source files.

3. **Client Development Server** - Move to path "client/" and run `npm install` to install all dependencies followed by `npm start` for hosting the client locally. Navigate to `http://localhost:3000/`. The app will automatically reload if any changes are made in the source files.



## Structure

1. Applied SOLID principles to all components, services & models. This helps make the app cleaner, easier to read and maintain. Addition to that it is an responsive application which gives good user-experience in mobile, tablet and desktop.

## Overall View

1. The user enter their comments and hit the button the data will pop up in the comment section.

Find the screenshot below.

![OVerall view](https://github.com/Jayaprakashkumar/live-comments-blog/blob/master/screenshots/blog.PNG)

## Multiple Tabs

1.  When multiple user perform the same opertion it results the same response in all their window.

Find the screenshot below.

![multiple tab](https://github.com/Jayaprakashkumar/live-comments-blog/blob/master/screenshots/multiple_tab.png)

## Sort the comments

1. The user can sort the posted comments based on name, email and date

Find the screenshot below.

![sort comments](https://github.com/Jayaprakashkumar/live-comments-blog/blob/master/screenshots/sort.png)

