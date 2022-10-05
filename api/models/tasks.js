const nanoid = require("nanoid");
const { driver } = require("./connection");

const getAllTasks = async () => {
    const session = driver.session();
    const data = await session.run(`Match (t:Task) optional match (t)--(c:Category) return *`);
    let tasks = []
    data.records.map((z) => {
        let taskInfo = {
            task: z.get("t").properties,
            category: z.get("c") ? z.get("c").properties : {}
        }
        tasks.push(taskInfo);
    })
     session.close();
    return tasks;
};

const getTaskById = async (id) => {
    const session = driver.session();
    const data = await session.run(`Match (t:Task {_id: '${id}'}) return t`);
    if (data.records.length === 0) return "Not found";
     session.close();
    return data.records[0].get("t").properties;
};

const updateTask = async (id, updatedTask) => {
    const session = driver.session();
    const data = await session.run(
        `Match (t:Task {_id: '${id}'}) SET t.name = '${updatedTask.name}' return t`
    );
     session.close();
    return data.records.map((z) => z.get("t").properties);
};

const updateCategory = async (input) => {
    const session = driver.session();
    await deleteCategory(input);
    const data = await session.run(
        `Match (t:Task {_id: '${input.taskId}'}) 
        Match (c:Category {_id: '${input.categoryId}'})
        Create (t)-[rel:BELONGS_TO]->(c)`
    );
     session.close();
    return "Category Updated";
};

const deleteCategory = async (input) => {
    const session = driver.session();
    const data = await session.run(
    `Match (t:Task {_id: '${input.taskId}'})-[rel:BELONGS_TO]->() DELETE rel`
    );
     session.close();
    return "Category Deleted";
};

const insertTask = async (task) => {
    const session = driver.session();
    const id = nanoid(8);
    const data = await session.run(
        `CREATE (t:Task {_id: '${id}', name: '${task.name}'}) return t`
    );
     session.close();
    return await getTaskById(id);
};

const deleteTaskById = async (id) => {
    const session = driver.session();
    const data = await session.run(`Match (t:Task {_id: '${id}'}) detach delete t`);
    await getAllTasks();
     session.close();
};

module.exports = {
    getAllTasks,
    deleteTaskById,
    insertTask,
    updateTask,
    getTaskById,
    updateCategory,
    deleteCategory,
};
