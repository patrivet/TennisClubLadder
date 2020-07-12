

# TennisClubLadder	
Tennis Club Ladder is web application which allows a tennis club to setup and run an internal singles challenge ladder.
Players can see who is available to play, send and accept challenges to play, record results and see a filtered list of ladder updates.


## Screenshots:
![Screenshot one](/assets/TennisLadder_Screenshot_1.png)

## Installation

 - Clone this repo ```git clone https://github.com/patrivet/TennisClubLadder.git```
 - ```npm install``` in the client directory.
 - ```npm install``` in the server directory.
 - Create a ```.env``` file in the server directory and populate with the following:-
	 - DB_URL=   your mongo database URL (see Database setup)
	 - PORT=  your server's port number.
	 - HOST=   your server's hostname.
	
### Database setup:
To use TennisClubLadder, an initial database dummy data load is required. Use the database_dump directory */assets/database_dump* as directed below:
```mongorestore -d <database_name> <database_dump_directory>```

## Tech stack:

**Front-end:**
React, Sass.
**Back-end:**
Node.js, Express.js, MongoDB, Mongoose.
