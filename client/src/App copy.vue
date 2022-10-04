<template>
    <v-app>
        <v-main>
            <v-card class="mx-auto my-10" max-width="600" tile>
                <v-toolbar color="blue darken-4" dark>
                    <v-toolbar-title class="headline">Todo App</v-toolbar-title>

                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn icon @click="dialog.status = true" v-on="on">
                                <v-icon></v-icon>
                            </v-btn>
                        </template>
                        <span>
                            New Category
                        </span>
                    </v-tooltip>
                </v-toolbar>
                <v-list two-line subheader>
                    <v-subheader class="headline">{{ date }}</v-subheader>
                    <p class="mx-12 text-right"><b></b> Tasks</p>

                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>
                                <v-row>
                                    <v-col cols="10">
                                        <v-text-field
                                            v-model="newTask"
                                            label="Type your task"
                                            @keyup.enter="insertNewTask"
                                        />
                                    </v-col>
                                    <v-col cols="2">
                                        <v-btn
                                            :disabled="
                                                !newTask || loadingTaskButton
                                            "
                                            :loading="loadingTaskButton"
                                            >ba</v-btn
                                        >
                                    </v-col>
                                </v-row>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-list>
                    <v-list-item v-for="(task, index) in tasks" :key="index">
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ task.task.name }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <v-dialog v-model="dialog.status" width="500">
                <v-card>
                    <v-card-title class="text-h5 blue darken-4 white--text">
                        New Category
                    </v-card-title>

                    <v-card-text class="mt-4">
                        <v-text-field
                            v-model="dialog.newCategory"
                            label="Type your category"
                            @keyup.enter="insertNewCategory"
                        >
                        </v-text-field>
                    </v-card-text>

                    <v-data-table :items="categories" :headers="dialog.headers">
                        
                    </v-data-table>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="dialog.status = false"
                            :disabled="
                                !dialog.newCategory || dialog.loadingButton
                            "
                            :loading="dialog.loadingButton"
                        >
                            Save
                        </v-btn>
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
        date: "",
        newTask: "",
        loadingTaskButton: false,
        tasks: [],
        categories: [],
        editTask: "",
        editCategory: "",
        taskId: "",
        categoryId: "",
        dialog: {
            status: false,
            newCategory: "",
            saveButton: false,
            loadingButton: false,
            headers: [
                { text: "Name", value: "name" },
                { text: "Actions", value: "actions" },
            ],
        },
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
                    this.tasks = r.data;
                    this.__showSnackBar("Tasks loaded", "success");
                })
                .catch((e) => {
                    this.__showSnackBar("Error while fetching tasks", "error");
                });
        },

        async insertNewTask() {
            if (this.newTask === "") {
                this.__showSnackBar("You can't add an empty task", "warning");
            } else {
                this.loadingTaskButton = true;
                axios
                    .post("/tasks", { name: this.newTask })
                    .then((r) => {
                        this.__showSnackBar("Task inserted", "success");
                        this.getTasks();
                        this.loadingTaskButton = false;
                    })
                    .catch((e) => {
                        this.__showSnackBar(
                            "Error while inserting new task",
                            "error"
                        );
                        this.loadingTaskButton = false;
                    });
            }
        },

        async updateTask() {
            axios
                .put("/tasks/tasks/" + this.taskId, { name: this.editTask })
                .then((r) => {
                    console.log(r.data);
                    this.__showSnackBar("Task updated", "success");
                })
                .catch((e) => {
                    this.__showSnackBar("Error while updating task", "error");
                });
        },

        async insertTaskCategory() {
            axios
                .post("/tasks/update_category/", {
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
            axios
                .delete("/tasks/" + this.taskId)
                .then((r) => {
                    console.log(r.data);
                    this.__showSnackBar("Task deleted", "success");
                })
                .catch((e) => {
                    this.__showSnackBar("Error while deleting task", "error");
                });
        },

        async getCategories() {
            axios
                .get("/categories")
                .then((r) => {
                    console.log(r.data);
                    this.categories = r.data;
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
        onChange() {
            console.log("mudou");
        },

        editCategory() {},
    },

    created() {
        this.getDate();
        this.getTasks();
        this.getCategories();
    },
};
</script>
