<script setup>
import Utils from "../../config/utils.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../../services/userServices"
import UserRoleServices from "../../services/userRoleServices"

const router = useRouter();

const users = ref(null);
const user = ref(null);
const showDeleteItem = ref(false); // Displays the delete modal
const deleteError = ref(false); // Checks for any error when deleting course
const message = ref("test value");
const showUserInfo = ref(false); // Displays user info modal

const getCourses = () => {
    CourseServices.getCourses()
        .then((res) => {
            users.value = res.data;
            message.value = "";
        })
        .catch((err) => {
            message.value = "Error: " + err.code + ":" + err.message;
            console.log(err);
        });
}

const getUsers = () => {
    UserServices.getAllUsers()
        .then((res) => {
            users.value = res.data;
            message.value = "";
            console.log(users);
        })
        .catch((err) => {
            message.value = "Error: " + err.code + ":" + err.message;
            console.log(err);
        });
}

const deleteUser = (user) => {
    UserServices.deleteUser(user.id)
        .then(() => {
            showDeleteItem.value = false;
            deleteError.value = false;
            getUsers();
        })
        .catch((e) => {
            message.value = e.response.data.message;
            deleteError.value = true;
        });
}

const deleteDisplay = (item) => {
    user.value = item;
    showDeleteItem.value = true;
}

const userDataDisplay = (item) => {
    user.value = item;
    showUserInfo.value = true;
}

getUsers();
</script>

<template>
    <v-table>
        <thead>
            <tr>
                <th class="text-left">
                    Name
                </th>
                <th class="text-left">
                    Roles
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item) in users" :key="item.lName">
                <td @click="userDataDisplay(item)">{{ item.fName + " " + item.lName }} </td>
            </tr>
        </tbody>
    </v-table>


    <div v-if="showUserInfo" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span @click="showUserInfo = false" class="close">&times;</span>
                User Data
            </div>
            <br />
            <div class = "modal-body">
                <v-table>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>Email Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ user.fName + " " + user.lName }}</td>
                        <td>{{ user.email}}</td> </tr>
                    </tbody>
                </v-table>
                <br>
            </div>
            <v-checkbox label="Has Reviewer Access?"></v-checkbox>
            <div class="modal-body">
                <button v-if="!deleteError" v-on:click="showUserInfo = false">
                    Close
                </button>
                <!-- <button v-if="!deleteError" class="error" v-on:click="deleteDisplay(user)">
                    Delete User
                </button> -->
                <button v-if="deleteError" v-on:click="
                    showUserInfo = false;
                ">
                    Close
                </button>
            </div>
        </div>
    </div>


    <div v-if="showDeleteItem" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span @click="showDeleteItem = false" class="close">&times;</span>
                <p v-if="!deleteError">
                    Are you sure you want to delete this user?<br />
                    {{ user.fName + " " + user.lName }}
                </p>
                <p v-if="deleteError">Error deleting<br />{{ user.fName + " " + user.lName }}.</p>
            </div>
            <br />
            <div class="modal-body">
                <button v-if="!deleteError" v-on:click="showDeleteItem = false">
                    No, cancel
                </button>
                <button v-if="!deleteError" class="error" v-on:click="deleteUser(item.id)">
                    Yes, delete
                </button>
                <button v-if="deleteError" v-on:click="
                    deleteError = false;
                showDeleteItem = false;
                ">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.menu {
    list-style-type: none;
    padding: 0;
}

.menu-item {
    margin: 10px 0;
}

.admin-sidebar {
    width: 20%;
    background-color: aqua;
    float: left;
}

.sidenav {
    height: 100%;
    width: 20%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgb(100, 0, 30);
    overflow-x: hidden;
    padding-top: 20px;
    border-right-style: solid;
    border-right-width: 2px;
    border-right-color: black;
}

.side-bar-button,
.side-bar-button:active {
    font-weight: 900;
    color: black;
    width: 100%;

    padding-right: 20px;
}

.card-padding {
    margin: 10px;
    padding: 10px;
}
</style>