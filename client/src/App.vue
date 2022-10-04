<template>
  <v-app>
    <v-main>

  <v-card
    class="mx-auto my-10"
    max-width="400"
    tile
  >

                  <v-list two-line subheader>
                  <v-subheader class="headline">{{date}}</v-subheader>
                  <p class="mx-12 text-right"><b></b> Tasks</p>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>

                        <v-text-field v-model="newTask" label="Type your task" @keyup.enter="insertNewTask" />
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                </v-list>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Single-line item</v-list-item-title>
          </v-list-item-content>
         
        </v-list-item>
                <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Single-line item</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
  </v-card>
      <v-snackbar v-model="snackbar.status" :timeout="snackbar.timeout" :color="snackbar.color"> {{ snackbar.text }} </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  components: {
  },

  data: () => ({
      snackbar: {
      status: false,
      text: '',
      color: '',
      timeout: 3000
    },
      date: "",
      newTask: "",
      newCategory: "",
      tasks: [],
      categories: [],
      editTask: "",
      editCategory: "",
      taskId: "",
      categoryId: "",

  }),

  methods: {
      __showSnackBar(text, color) {
        this.snackbar.text = text;
        this.snackbar.color = color;
        this.snackbar.status = true;
      },
      getDate(){
        let options = {year: 'numeric', month: 'numeric', day: 'numeric' };
        const date = new Date();
        this.date = date.toLocaleString('pt-BR', options);
      },

      addTask(){
        console.log(process.env.VUE_APP_API);
      },

      async getTasks(){
        axios.get("/tasks").then(r => {
          this.tasks = r.data;
          this.__showSnackBar("Tasks loaded", 'success');
        }).catch(e => {
          this.__showSnackBar("Error while fetching tasks", 'error');
        })
      },

      async insertNewTask(){
        axios.post("/tasks", {name: this.newTask}).then(r => {
          this.__showSnackBar("Task inserted", 'success');
        }).catch(e => {
          this.__showSnackBar("Error while inserting new task", 'error');
        })
      },

      async updateTask(){
        axios.put("/tasks/tasks/" + this.taskId, {name: this.editTask}).then(r => {
          console.log(r.data);
          this.__showSnackBar("Task updated", 'success');
        }).catch(e => {
          this.__showSnackBar("Error while updating task", 'error');
        })
      },

      async insertTaskCategory(){
        axios.post("/tasks/update_category/", {taskId: this.taskId, categoryId: this.categoryId}).then(r =>{
          console.log(r.data);
          this.__showSnackBar("Task updated", 'success');
        }).catch(e => {
          this.__showSnackBar("Error while updating task", 'error');
        })
      },

      async deleteTaskCategory(){
        axios.post("/tasks/delete_category/", {taskId: this.taskId, categoryId: this.categoryId}).then(r =>{
          console.log(r.data);
          this.__showSnackBar("Task updated", 'success');
        }).catch(e => {
          this.__showSnackBar("Error while updating task", 'error');
        })
      },

      async deleteTask(){
        axios.delete("/tasks/" + this.taskId).then(r =>{
          console.log(r.data);
          this.__showSnackBar("Task deleted", 'success');
        }).catch(e => {
          this.__showSnackBar("Error while deleting task", 'error');
        })
      },

      async getCategories(){
        axios.get("/categories").then(r => {
          this.categories = r.data;
          this.__showSnackBar("Categories loaded", 'success');
        }).catch(e => {
          this.__showSnackBar("Error while fetching categories", 'error');
        })
      },

      async insertNewCategory(){
        axios.post("/categories", {name: this.newCategory}).then(r => {
          this.__showSnackBar("Category inserted", 'success');
        }).catch(e => {
          this.__showSnackBar("Error while inserting new category", 'error');
        })
      },

      async updateCategory(){
        axios.put("/categories/tasks/" + this.categoryId, {name: this.editCategory}).then(r => {
          console.log(r.data);
          this.__showSnackBar("Task updated", 'success');
        }).catch(e => {
          this.__showSnackBar("Error while updating task", 'error');
        })
      },

      async deleteCategory(){
        axios.delete("/categories/" + this.categoryId).then(r =>{
          console.log(r.data);
          this.__showSnackBar("Category deleted", 'success');
        }).catch(e => {
          this.__showSnackBar("Error while deleting category", 'error');
        })
      },


  },

  created(){
    this.getDate();
    this.getTasks();
  }
};
</script>
