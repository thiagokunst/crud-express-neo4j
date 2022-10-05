## STEP 1: Installation

### Method 1: Using Docker.

1. Install Docker and Docker compose on your machine
2. Get the code from [github](https://github.com/gulmoharnnt/ExpressNeo4jCRUD)
3. Go to the project folder and run the command on command prompt

    ```
      docker-compose up --build
    ```

4. go to browser and hit http://localhost:7484/browser
5. It will ask for username and password, put the default values as neo4j/neo4j
6. change the password as "admin", we used that in our configuration

### Method 2:

1. Install node and neo4j on you machine. Check the running of neo4j on your machine by the following command

    ```
    service neo4j status
    ```

2. Get the code from [github](https://github.com/gulmoharnnt/ExpressNeo4jCRUD)
3. Go to the project folder and run the command on command prompt

    ```
      npm i
      npm run dev
    ```

4. go to browser and hit http://localhost:7484/browser
5. It will ask for username and password, put the default values as neo4j/neo4j
6. change the password as "admin", we used that in our configuration

    #

## STEP 2: Testing with Rest Client like Postman

### TASKS

1. Get all tasks

    - GET - localhost:3000/tasks/

2. Get task by id

    - GET - localhost:3000/tasks/:id

3. To add new task
    - POST - localhost:3000/tasks/
    ```
    JSON Request:
    {
        "name": "Task"
    }
    ```
4. To update task

    - PUT - localhost:3000/tasks/:id

    ```
    JSON Request:
    {
        "name": "Updated Task Name"
    }
    ```

5. To insert task category
    - POST - localhost:3000/tasks/update_category
    ```
    JSON Request :
    {
        "taskId": "",
        "categoryId": ""
    }
    ```
6. To delete category from a task
    - POST - localhost:3000/tasks/delete_category
    ```
    JSON Request :
    {
    "taskId": "",
    "categoryId": ""
    }
    ```
7. To delete a task

    - DELETE - localhost:3000/tasks/:id

8. To get the friend list

-   GET - localhost:7000/api/friends/list/2

### CATEGORIES

1. Get all categories

    - GET - localhost:3000/categories/

2. To add new category
    - POST - localhost:3000/categories/
    ```
    JSON Request:
    {
        "name": "Category"
    }
    ```
3. To update category

    - PUT - localhost:3000/tasks/:id

    ```
    JSON Request:
    {
        "name": "Updated Category Name"
    }
    ```

4. To delete a category
    - DELETE - localhost:3000/categories/:id
