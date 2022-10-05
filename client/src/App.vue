<template>
    <v-app>
        <v-main>
            <v-container >
                <v-row>
                                <v-col cols="12" class="d-flex align-center justify-center">
                <v-card max-width="800px">
                    <v-tabs
                        v-model="tab"
                        background-color="cyan"
                        centered
                        dark
                        icons-and-text
                    >
                        <v-tabs-slider></v-tabs-slider>

                        <v-tab href="#tab-1">
                            Tasks
                        </v-tab>

                        <v-tab href="#tab-2">
                            Categories
                        </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item :key="1" :value="'tab-' + 1">
                            <v-card flat max-width="800px">
                                <v-card-text>
                                    <v-card-title>
                                        <v-btn
                                            color="cyan"
                                            class="white--text"
                                            @click="
                                                task_tab.new_task.dialog = true
                                            "
                                            >New</v-btn
                                        ></v-card-title
                                    >
                                    <v-data-table
                                        :items="task_tab.tasks"
                                        :headers="task_tab.headers"
                                    >
                                        <template v-slot:item.task.name="props">
                                            <v-edit-dialog
                                                :return-value.sync="
                                                    props.item.task.name
                                                "
                                                @save="
                                                    updateTask(
                                                        props.item.task.name
                                                    )
                                                "
                                                @cancel="cancel"
                                                @open="open(props)"
                                                @close="close"
                                            >
                                                {{ props.item.task.name }}
                                                <template v-slot:input>
                                                    <v-text-field
                                                        v-model="
                                                            props.item.task.name
                                                        "
                                                        label="Edit"
                                                        single-line
                                                        hint="Press enter to save"
                                                        counter
                                                    ></v-text-field>
                                                </template>
                                            </v-edit-dialog>
                                        </template>

                                        <template
                                            v-slot:item.category.name="props"
                                        >
                                            <v-edit-dialog
                                                :return-value.sync="
                                                    props.item.category.name
                                                "
                                                @save="
                                                    insertTaskCategory(
                                                        props.item.category._id
                                                    )
                                                "
                                                @cancel="cancel"
                                                @open="openCategory(props)"
                                                @close="close"
                                            >
                                                {{ props.item.category.name }}
                                                <template v-slot:input>
                                                    <v-select
                                                        v-model="
                                                            props.item.category
                                                                ._id
                                                        "
                                                        :items="
                                                            category_tab.categories
                                                        "
                                                        item-text="name"
                                                        item-value="_id"
                                                        label="Edit"
                                                        hint="Press enter to save"
                                                        single-line
                                                    ></v-select>
                                                </template>
                                            </v-edit-dialog>
                                        </template>

                                        <template
                                            v-slot:item.actions="{ item }"
                                        >
                                            <v-icon
                                                small
                                                @click="deleteTaskTable(item)"
                                            >
                                                mdi-delete
                                            </v-icon>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item :key="2" :value="'tab-' + 2">
                            <v-card flat>
                                <v-card-text>
                                    <v-card-title>
                                        <v-btn
                                            color="cyan"
                                            class="white--text"
                                            @click="
                                                category_tab.new_category.dialog = true
                                            "
                                            >New</v-btn
                                        ></v-card-title
                                    >
                                    <v-data-table
                                        :items="category_tab.categories"
                                        :headers="category_tab.headers"
                                    >
                                        <template v-slot:item.name="props">
                                            <v-edit-dialog
                                                :return-value.sync="
                                                    props.item.name
                                                "
                                                @save="
                                                    updateCategory(
                                                        props.item.name
                                                    )
                                                "
                                                @cancel="cancel"
                                                @open="openCategoryTab(props)"
                                                @close="closeCategoryTab"
                                            >
                                                {{ props.item.name }}
                                                <template v-slot:input>
                                                    <v-text-field
                                                        v-model="
                                                            props.item.name
                                                        "
                                                        label="Edit"
                                                        single-line
                                                        hint="Press enter to save"
                                                        counter
                                                    ></v-text-field>
                                                </template>
                                            </v-edit-dialog>
                                        </template>

                                        <template
                                            v-slot:item.actions="{ item }"
                                        >
                                            <v-icon
                                                small
                                                @click="
                                                    deleteCategoryTable(item)
                                                "
                                            >
                                                mdi-delete
                                            </v-icon>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
                </v-col>
                </v-row>

            </v-container>

            <v-dialog v-model="task_tab.new_task.dialog" max-width="400px">
                <v-card>
                    <v-card-title class="text-h5 cyan white--text">
                        New Task
                    </v-card-title>

                    <v-card-text>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="task_tab.new_task.name"
                                    label="Insert your task"
                                    @keyup.enter="insertNewTask"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="insertNewTask"
                            :disabled="
                                task_tab.new_task.disabled ||
                                    task_tab.new_task.loading
                            "
                            :loading="task_tab.new_task.loading"
                        >
                            SAVE
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="task_tab.delete_task.dialog" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        item?</v-card-title
                    >
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="task_tab.delete_task.dialog = false"
                            >Cancel</v-btn
                        >
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteTask()"
                            :loading="task_tab.delete_task.loading"
                            :disabled="task_tab.delete_task.loading"
                            >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="category_tab.new_category.dialog" max-width="400px">
                <v-card>
                    <v-card-title class="text-h5 cyan white--text">
                        New Category
                    </v-card-title>

                    <v-card-text>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="category_tab.new_category.name"
                                    label="Insert your category"
                                    @keyup.enter="insertNewCategory"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="insertNewCategory"
                            :disabled="
                                category_tab.new_category.disabled ||
                                    category_tab.new_category.loading
                            "
                            :loading="category_tab.new_category.loading"
                        >
                            SAVE
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog
                v-model="category_tab.delete_category.dialog"
                max-width="500px"
            >
                <v-card>
                    <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        item?</v-card-title
                    >
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="category_tab.delete_category.dialog = false"
                            >Cancel</v-btn
                        >
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteCategory()"
                            :loading="category_tab.delete_category.loading"
                            :disabled="category_tab.delete_category.loading"
                            >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-snackbar
                v-model="snackbar.status"
                :timeout="snackbar.timeout"
                :color="snackbar.color"
            >
                {{ snackbar.text }}
            </v-snackbar>
        </v-main>
    </v-app>
</template>

<script>
import axios from "axios";

export default {
    name: "App",

    components: {},

    data: () => ({
        snackbar: {
            status: false,
            text: "",
            color: "",
            timeout: 3000,
        },
        task_tab: {
            tasks: [],
            headers: [
                { text: "Name", value: "task.name" },
                { text: "Category", value: "category.name" },
                { text: "Actions", value: "actions" },
            ],
            new_task: {
                dialog: false,
                name: "",
                loading: false,
            },
            edit_task: {
                dialog: false,
                name: "",
                id: "",
                category: "",
            },
            edit_category: {
                taskId: "",
                categoryId: "",
            },
            delete_task: {
                dialog: false,
                taskId: "",
                loading: false,
            },
        },
        category_tab: {
            categories: [],
            headers: [
                { text: "Name", value: "name" },
                { text: "Actions", value: "actions", align: "center" },
            ],
            edit_category: {
                categoryId: "",
            },
            delete_category: {
                dialog: false,
                categoryId: "",
                loading: false,
            },
            new_category: {
                dialog: false,
                name: "",
                loading: false,
            },
        },
        date: "",
        tab: null,
    }),

    methods: {
        __showSnackBar(text, color) {
            this.snackbar.text = text;
            this.snackbar.color = color;
            this.snackbar.status = true;
        },

        getDate() {
            let options = { year: "numeric", month: "numeric", day: "numeric" };
            const date = new Date();
            this.date = date.toLocaleString("pt-BR", options);
        },

        async getTasks() {
            axios
                .get("/tasks")
                .then((r) => {
                    this.task_tab.tasks = r.data;
                    this.__showSnackBar("Tasks loaded", "success");
                })
                .catch((e) => {
                    this.__showSnackBar("Error while fetching tasks", "error");
                });
        },

        async insertNewTask() {
            if (this.task_tab.new_task.name === "") {
                this.__showSnackBar("You can't add an empty task", "warning");
            } else {
                this.task_tab.new_task.loading = true;
                axios
                    .post("/tasks", { name: this.task_tab.new_task.name })
                    .then((r) => {
                        this.task_tab.new_task.name = "";
                        this.__showSnackBar("Task inserted", "success");
                        this.getTasks();
                        this.task_tab.new_task.loading = false;
                        this.task_tab.new_task.dialog = false;

                    })
                    .catch((e) => {
                        this.__showSnackBar(
                            "Error while inserting new task",
                            "error"
                        );
                        this.task_tab.new_task.loading = false;
                    });
            }
        },

        async updateTask(name) {
            axios
                .patch("/tasks/" + this.task_tab.edit_task.id, {
                    name: name,
                })
                .then((r) => {
                  
                    this.__showSnackBar("Task updated", "success");
                })
                .catch((e) => {
                    this.__showSnackBar("Error while updating task", "error");
                });
        },

        async insertTaskCategory(categoryId) {
            axios
                .post("/tasks/update_category/", {
                    taskId: this.task_tab.edit_category.taskId,
                    categoryId: categoryId,
                })
                .then((r) => {
                    this.getTasks();
                    this.getCategories();
                    this.__showSnackBar("Task updated", "success");
                })
                .catch((e) => {
                    this.__showSnackBar("Error while updating task", "error");
                });
        },

        async deleteTaskCategory() {
            axios
                .post("/tasks/delete_category/", {
                    taskId: this.taskId,
                    categoryId: this.categoryId,
                })
                .then((r) => {
                 
                    this.__showSnackBar("Task updated", "success");
                })
                .catch((e) => {
                    this.__showSnackBar("Error while updating task", "error");
                });
        },

        async deleteTask() {
            this.task_tab.delete_task.loading = true;
            axios
                .delete("/tasks/" + this.task_tab.delete_task.taskId)
                .then((r) => {
                    this.task_tab.delete_task.loading = false;

                
                    this.getTasks();
                    this.task_tab.delete_task.dialog = false;
                    this.__showSnackBar("Task deleted", "success");
                })
                .catch((e) => {
                    this.task_tab.delete_task.loading = false;
                    this.task_tab.delete_task.dialog = false;
                    this.__showSnackBar("Error while deleting task", "error");
                });
        },

        async getCategories() {
            axios
                .get("/categories")
                .then((r) => {
              
                    this.category_tab.categories = r.data;
                    this.__showSnackBar("Categories loaded", "success");
                })
                .catch((e) => {
                    this.__showSnackBar(
                        "Error while fetching categories",
                        "error"
                    );
                });
        },

        async insertNewCategory() {
            if (this.category_tab.new_category.name === "") {
                this.__showSnackBar(
                    "You can't add an empty category",
                    "warning"
                );
            } else {
                this.category_tab.new_category.loading = true;
                axios
                    .post("/categories", {
                        name: this.category_tab.new_category.name,
                    })
                    .then((r) => {
                        this.category_tab.new_category.loading = false;

                        this.__showSnackBar("Category inserted", "success");
                        this.category_tab.new_category.name = "";

                        this.category_tab.new_category.dialog = false;
                        this.getCategories();
                    })
                    .catch((e) => {
                      
                        this.category_tab.new_category.loading = false;

                        this.__showSnackBar(
                            "Error while inserting new category",
                            "error"
                        );
                    });
            }
        },

        async updateCategory(name) {
            axios
                .put(
                    "/categories/" + this.category_tab.edit_category.categoryId,
                    {
                        name: name,
                    }
                )
                .then((r) => {
                    
                    this.__showSnackBar("Task updated", "success");
                })
                .catch((e) => {
                    this.__showSnackBar("Error while updating task", "error");
                });
        },

        async deleteCategory() {
            axios
                .delete(
                    "/categories/" +
                        this.category_tab.delete_category.categoryId
                )
                .then((r) => {
                    
                    this.getCategories();
                    this.getTasks();
                    this.category_tab.delete_category.dialog = false;
                    this.__showSnackBar("Category deleted", "success");
                })
                .catch((e) => {
                    this.category_tab.delete_category.dialog = false;
                    this.__showSnackBar(
                        "Error while deleting category",
                        "error"
                    );
                });
        },

        editTaskTable(item) {
            this.task_tab.edit_task.dialog = true;
            this.task_tab.edit_task.name = item.task.name;
            this.task_tab.edit_task.id = item.task._id;
    
        },
        deleteTaskTable(item) {
            this.task_tab.delete_task.dialog = true;
            this.task_tab.delete_task.taskId = item.task._id;
        },
        onChange() {
       
        },

        editCategory() {},

        cancel() {
            this.__showSnackBar("Canceled", "warning");
        },
        open(item) {
            this.task_tab.edit_task.id = item.item.task._id;
        },
        openCategory(item) {
            this.task_tab.edit_category.taskId = item.item.task._id;
        },
        close() {
            console.log("Dialog closed");
        },

        openCategoryTab(item) {
            this.category_tab.edit_category.categoryId = item.item._id;
        },

        closeCategoryTab() {
             console.log("Dialog closed");
        },

        deleteCategoryTable(item) {
            this.category_tab.delete_category.dialog = true;
            this.category_tab.delete_category.categoryId = item._id;
        },

        cancelCategoryTab() {},
    },

    created() {
        this.getDate();
        this.getTasks();
        this.getCategories();
    },
};
</script>
