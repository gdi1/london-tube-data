The program can be run by using the following commands:

        npm install  (this command install all dependencies)
        npm start    (starts execution of the databse.js script)

The program will firstly process the json file containing all train data, which will then be stored in suitable data structures. The next step it does is creating the connection to the database, which is immediately populated with the train data. Before populating the program makes sure to delete anything inside database to avoid duplication errors. During the population process, the program makes use of a separate map structure to keep track for each individual station what are the lines that pass through it. This in turn allows better search performance for the when querying stations.
The database makes use of two different schemas to make sure the data stored inside is consistent. These are relatively simple and intuitive, basically reflecting the structure of the data stored within the json file.
As long as interacting with the user, the program will accept input until the user inputs the word "input" on stdin. The user is prompted with the command "Task:", after which the user will input one of the two queries, which will be in the following format:

        station*name-of-station

        line*name-of-line
