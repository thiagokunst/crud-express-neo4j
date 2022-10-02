const nanoid = require("nanoid");
const { session } = require("./connection");

const getAllCategories = async () => {
    const data = await session.run(`Match (c:Category) return c`);
    return data.records.map((z) => z.get("c").properties);
};

const getCategoryById = async (id) => {
    const data = await session.run(`Match (c:Category {_id: '${id}'}) return c`);
    if (data.records.length === 0) return "Not found";
    return data.records[0].get("c").properties;
};

const updateCategory = async (id, updatedCategory) => {
    const data = await session.run(
        `Match (c:Category {_id: '${id}'}) SET t.name = '${updatedCategory.name}' return c`
    );
    return data.records.map((z) => z.get("c").properties);
};

const insertCategory = async (Category) => {
    const id = nanoid(8);
    const data = await session.run(
        `CREATE (c:Category {_id: '${id}', name: '${Category.name}'}) return c`
    );
    return await getCategoryById(id);
};

const deleteCategoryById = async (id) => {
    const data = await session.run(`Match (c:Category {_id: '${id}'}) delete c`);
    await getAllCategories();
};

module.exports = {
    getAllCategories,
    deleteCategoryById,
    insertCategory,
    updateCategory,
    getCategoryById,
};
