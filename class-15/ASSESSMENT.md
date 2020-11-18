# 301 Final Exam

## Overview

The 301 final exam consists of two parts, each worth 50 points. You must score a **total** of 80 points to pass.

## Getting Started

You've been given a .zip file containing your customized assessment assignment.  

1. Download this file to your machine
1. Move the .zip file to an empty folder
1. Unzip the file
   - From the terminal, use the command: `unzip filename.zip` (where filename is the name of the .zip file we gave you)
   - Or, from Finder (Mac) or Explorer (Windows), you can double click the file to extract it's contents
1. Open VSCode from the folder containing the files you've unzipped
1. Change into the folder you want to work in and run the tests.
    1. Note that for the code challenges, you can specify the test file to run using `npm test filename` so that you don't have to see all of the tests at once

### Part 1: The Final Exam App - 50pts

> There are 4 parts to this assignment, each worth a different amount of points, totaling 50

Included in the server folder - `finalExamApp` - is a README.md which contains setup and installation guides for you to follow.

You will need a working postgres server in order to complete this assignment.

As you write code for your server, you can run `npm test` to continually check that your server meets the requirements.

> Note that your server must be running and listening on port 3002 before you can run the test command to check it.

### Part 2: The Final Exam Questions - 50pts

> 5 Questions - 10 Points Each

These work just like your regular code challenges, where you can write the code and run the tests as you go to check your progress.

As you're writing code in your editor to solve the challenges, run your tests in the terminal.

1. Change into the folder you want to work in and run the tests.
1. Run tests for just the file you're working on using `npm test filename``
1. To see **all** of your tests, run the command `npm test`

## To turn in this assignment

Create a .zip file of both directories

- From the terminal ...
  - Change into the directory folder containing your assignments
  - Enter this command (replacing `yourname` with your actual name)
    `zip -r yourname.zip * --exclude \*/node_modules/\* --exclude \*.zip`
- Open Canvas and attach that file to this assignment
- Include any comments or notes on your test coverage, etc
