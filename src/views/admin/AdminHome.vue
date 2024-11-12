<script setup>
import Utils from "../../config/utils.js";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../../services/userServices";
import UserRoleServices from "../../services/userRoleServices";
import StudentServices from "../../services/studentServices";
import RoleServices from "../../services/roleServices";

const router = useRouter();

const users = ref([]);
const user = ref(null);
const showDeleteItem = ref(false);
const deleteError = ref(false);
const message = ref("test value");
const showUserInfo = ref(false);
const search = ref("");
const students = ref([]);
const roles = ref([])
const userRoles = ref([])
var userSpecificRole = ref("")

const getUsers = () => {
    UserServices.getAllUsers()
        .then((res) => {
            users.value = res.data;
            message.value = "";
            orderUsers("asc");
        })
        .catch((err) => {
            message.value = "Error: " + err.code + ":" + err.message;
            console.log(err);
        });
};

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
};

const orderUsers = (val) => {
    users.value.sort((a, b) => {
        return val === "asc"
            ? a.lName.localeCompare(b.lName)
            : b.lName.localeCompare(a.lName);
    });
};

const deleteDisplay = (item) => {
    user.value = item;
    showDeleteItem.value = true;
};

const userDataDisplay = (item) => {
    user.value = item;
    showUserInfo.value = true;
};

const filteredUsers = computed(() => {
    const searchTerm = search.value.toLowerCase();
    return users.value.filter(user =>
        `${user.fName} ${user.lName}`.toLowerCase().includes(searchTerm)
    );
});

const getAllStudents = () => {
    StudentServices.getAllStudents()
        .then((res) => {
            students.value = res.data;
            message.value = "";
        })
        .catch((err) => {
            message.value = "Error: " + err.code + ":" + err.message;
            console.log(err);
        });
};

const getAllRoles = () => {
    RoleServices.getAllRoles()
        .then((res) => {
            roles.value = res.data;
            message.value = "";
        })
        .catch((err) => {
            message.value = "Error: " + err.code + ":" + err.message;
            console.log(err);
        });
}

const getAllUserRoles = (uId, rId) => {
    UserRoleServices.getAllUserRoles(uId, rId)
        .then((res) => {
            userSpecificRole = res.data;
            message.value = "";
        })
        .catch((err) => {
            message.value = "Error: " + err.code + ":" + err.message;
            console.log(err);
        });
}


const getUserRoles = (userId) => {
    var roleList = "";
//var userSpecificRole = ""
    if (students.value.some(obj => obj.id === userId)) {
        roleList += "Student,"
    }

    roles.value.forEach(role => {
        getAllUserRoles(userId, role.id)
                //console.log(res.data.length)
                message.value = "";
                if (userSpecificRole.length > 0) {

                    if (role.id === userSpecificRole[0].roleId && role.role_type !== "student") {
                        console.log(role.role_type)
                        roleList += " " + role.role_type + ",";
                    }
                }
    })

    if (roleList[roleList.length - 1] === ',')
        roleList = roleList.substring(0, roleList.length - 1)
    return roleList;
};


console.log(getAllRoles());
getAllStudents();
getUsers();
//console.log(StudentServices.getAllStudents())
</script>

<template>
    <div class="modified-width">
        <v-card title="Edit Users">
            <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
                hide-details single-line></v-text-field>

            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Roles</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in filteredUsers" :key="item.lName">
                        <td @click="userDataDisplay(item)">{{ item.fName + " " + item.lName }}</td>
                        <td>{{ getUserRoles(item.id) }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
    </div>

    <div v-if="showUserInfo" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span @click="showUserInfo = false" class="close">&times;</span>
                User Data
            </div>
            <v-card class="mx-auto">
                <div class="modal-body">
                    Name: {{ user.fName + " " + user.lName }}
                    <v-spacer></v-spacer>
                    Email: {{ user.email }}
                    <v-spacer></v-spacer>
                    <v-checkbox label="Has Reviewer Access?"></v-checkbox>
                    <v-spacer></v-spacer>
                    <div>
                        <button v-if="!deleteError" @click="showUserInfo = false">Close</button>
                        <button v-if="deleteError" @click="showUserInfo = false">Close</button>
                    </div>
                </div>
            </v-card>
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
            <div class="modal-body">
                <button v-if="!deleteError" @click="showDeleteItem = false">No, cancel</button>
                <button v-if="!deleteError" class="error" @click="deleteUser(user)">Yes, delete</button>
                <button v-if="deleteError" @click="deleteError = false; showDeleteItem = false;">Close</button>
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

.modified-width {
    width: 70%;
    margin: 0 auto;
    padding-top: 15px;
}
</style>