<template>
    <v-app>
        <v-main>
            <v-container fluid>
                <v-card>
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
                            <v-card flat>
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
                                                @save="updateTask"
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
                                <v-card-text>categories</v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-container>

            <v-dialog v-model="task_tab.new_task.dialog">
                <v-card>
                    <v-card-title class="text-h5 cyan white--text">
                        Privacy Policy
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
                        <v-btn color="blue darken-1" text @click="deleteTask()" :loading="task_tab.delete_task.loading" :disabled="task_tab.delete_task.loading"
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

        async updateTask() {
            axios
                .patch("/tasks/" + this.task_tab.edit_task.id, {
                    name: this.task_tab.edit_task.name,
                })
                .then((r) => {
                    console.log(r.data);
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
                    console.log({
                        taskid: this.task_tab.edit_category.taskId,
                        categoryid: this.task_tab.edit_category.categoryId,
                    });
                    console.log(r.data);
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
                    console.log(r.data);
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

                    console.log(r.data);
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
                    console.log(r.data);
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
            if (this.dialog.newCategory === "") {
                this.__showSnackBar(
                    "You can't add an empty category",
                    "warning"
                );
            } else {
                axios
                    .post("/categories", { name: this.dialog.newCategory })
                    .then((r) => {
                        this.__showSnackBar("Category inserted", "success");
                        this.dialog.status = false;
                        this.getCategories();
                    })
                    .catch((e) => {
                        this.__showSnackBar(
                            "Error while inserting new category",
                            "error"
                        );
                    });
            }
        },

        async updateCategory() {
            axios
                .put("/categories/tasks/" + this.categoryId, {
                    name: this.editCategory,
                })
                .then((r) => {
                    console.log(r.data);
                    this.__showSnackBar("Task updated", "success");
                })
                .catch((e) => {
                    this.__showSnackBar("Error while updating task", "error");
                });
        },

        async deleteCategory() {
            axios
                .delete("/categories/" + this.categoryId)
                .then((r) => {
                    console.log(r.data);
                    this.__showSnackBar("Category deleted", "success");
                })
                .catch((e) => {
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
            console.log(item);
        },
        deleteTaskTable(item) {
            this.task_tab.delete_task.dialog = true;
            this.task_tab.delete_task.taskId = item.task._id;
        },
        onChange() {
            console.log("mudou");
        },

        editCategory() {},

        cancel() {
            this.__showSnackBar("Canceled", "warning");
        },
        open(item) {
            console.log(item);
            this.task_tab.edit_task.name = item.item.task.name;
            this.task_tab.edit_task.id = item.item.task._id;
        },
        openCategory(item) {
            this.task_tab.edit_category.taskId = item.item.task._id;
        },
        close() {
            console.log("Dialog closed");
        },
    },

    created() {
        this.getDate();
        this.getTasks();
        this.getCategories();
    },
};
</script>
