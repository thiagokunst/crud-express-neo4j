## What
A Simple Todo list app using Express, Vue and Neo4j

## Why
1. I wanted to learn how Neo4j database works.


## How
### STEP 1: Installation

1. Install node and neo4j on you machine. (Node v10.24.1, npm 6.14.12)
2. Be sure neo4j is up and running.
3. Get the code from [github](https://github.com/thiagokunst/crud-express-neo4j)
4. Go to the project folder and navigate to the 'api' folder, create a .env file following the example below:
    ```
    DB_URL='localhost:7687'
    DB_USER='neo4j'
    DB_PASSWORD='admin'

    ```
4. Still inside 'api' folder, install dependencies and start

    ```
        cd api
        npm install
        npm start
    ```

4. The default url for the api is http://localhost:3000/
5. Now go to the 'client' folder, install dependencies and start
    ```
        cd client
        npm install
        npm run serve
    ```
6. The default url for the api is http://localhost:8080/
7. The app should be running now.


    #

### STEP 2: Testing with Rest Client like Postman

#### TASKS

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

#### CATEGORIES

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


#### Notes

The main difficulty of this project was trying to understand how Neo4j works. Manipulating relationships and avoiding duplicate nodes was quite challenging.
The UX needs improvement mostly because of how I needed to isolate interactions due to my lack of understanding of complex cypher queries.