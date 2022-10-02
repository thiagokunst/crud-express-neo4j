const nanoid = require("nanoid");
const { session } = require("./connection");

const getAllTasks = async () => {
    const data = await session.run(`Match (t:Task) return t`);
    return data.records.map((z) => z.get("t").properties);
};

const getTaskById = async (id) => {
    const data = await session.run(`Match (t:Task {_id: '${id}'}) return t`);
    if (data.records.length === 0) return "Not found";
    return data.records[0].get("t").properties;
};

const updateTask = async (id, updatedTask) => {
    const data = await session.run(
        `Match (t:Task {_id: '${id}'}) SET t.name = '${updatedTask.name}' return t`
    );
    return data.records.map((z) => z.get("t").properties);
};

const updateCategory = async (input) => {
    const data = await session.run(
        `Match (t:Task {_id: '${input.taskId}'}) 
        Match (c:Category {_id: '${input.categoryId}'})
        Create (t)-[rel:BELONGS_TO]->(c)`
    );
    return "Category Updated";
};

const deleteCategory = async (input) => {
    const data = await session.run(
    `Match (t:Task {_id: '${input.taskId}'})-[rel:BELONGS_TO]->(c:Category {_id: '${input.categoryId}'}) DELETE rel`
    );
    return "Category Deleted";
};

const insertTask = async (task) => {
    const id = nanoid(8);
    const data = await session.run(
        `CREATE (t:Task {_id: '${id}', name: '${task.name}'}) return t`
    );
    return await getTaskById(id);
};

const deleteTaskById = async (id) => {
    const data = await session.run(`Match (t:Task {_id: '${id}'}) delete t`);
    await getAllTasks();
};

// try {
//   const result = await session.run("CREATE (a:Person {name: $name}) RETURN a", {
//     name: personName,
//   });

//   const singleRecord = result.records[0];
//   const node = singleRecord.get(0);

//   console.log(node.properties.name);
// } finally {
//   await session.close();
// }

// // on application exit:
// await driver.close();

module.exports = {
    getAllTasks,
    deleteTaskById,
    insertTask,
    updateTask,
    getTaskById,
    updateCategory,
    deleteCategory,
};
