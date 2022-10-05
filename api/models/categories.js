const nanoid = require("nanoid");
const { driver } = require("./connection");

const getAllCategories = async () => {
const session = driver.session();
    const data = await session.run(`Match (c:Category) return c`);
    session.close();
    return data.records.map((z) => z.get("c").properties);
};

const getCategoryById = async (id) => {
    const session = driver.session();
    const data = await session.run(`Match (c:Category {_id: '${id}'}) return c`);
    if (data.records.length === 0) return "Not found";
    session.close();
    return data.records[0].get("c").properties;
};

const updateCategory = async (id, updatedCategory) => {
    const session = driver.session();
    const data = await session.run(
        `Match (c:Category {_id: '${id}'}) SET c.name = '${updatedCategory.name}' return c`
    );
    session.close();
    return data.records.map((z) => z.get("c").properties);
};

const insertCategory = async (Category) => {
    const session = driver.session();
    const id = nanoid(8);
    const data = await session.run(
        `CREATE (c:Category {_id: '${id}', name: '${Category.name}'}) return c`
    );
    session.close();
    return await getCategoryById(id);
};

const deleteCategoryById = async (id) => {
    const session = driver.session();
    const data = await session.run(`Match (c:Category {_id: '${id}'}) detach delete c`);
     session.close();
    await getAllCategories();
};

module.exports = {
    getAllCategories,
    deleteCategoryById,
    insertCategory,
    updateCategory,
    getCategoryById,
};
