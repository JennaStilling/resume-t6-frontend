<script setup>
import { ref, computed, onMounted } from "vue";
import UserServices from "../../services/userServices";
import UserRoleServices from "../../services/userRoleServices";
import StudentServices from "../../services/studentServices";
import RoleServices from "../../services/roleServices";

const users = ref([]);
const user = ref(null);
const showDeleteItem = ref(false);
const deleteError = ref(false);
const message = ref("test value");
const showUserInfo = ref(false);
const search = ref("");
const students = ref([]);
const filterOptions = ["Reviewers", "Students", "All"];
const filterType = ref("Reviewers");
const headers = [
    { text: "Name", value: "name", align: "start" },
];
const roles = ref([])
const userRoles = ref([])
var userSpecificRole = ref("")

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
getAllRoles();

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

const userDataDisplay = async (item) => {
    user.value = item;
    showUserInfo.value = true;
    await getUserRoles(item.id);
};


const filteredUsers = computed(() => {
    const searchTerm = search.value.toLowerCase();
    let filtered = users.value.filter(user =>
        `${user.fName} ${user.lName}`.toLowerCase().includes(searchTerm)
    );

    if (filterType.value === "Students") {
        filtered = filtered.filter(user => students.value.some(tempUser => tempUser.id === user.id));
    } else if (filterType.value === "Reviewers") {
        filtered = filtered.filter(user => !students.value.some(tempUser => tempUser.id === user.id));
    }

    return filtered;
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

const hasReviewerAccess = ref(false);

const handleReviewerChange = () => {
    console.log("Reviewer access toggled:", hasReviewerAccess.value);
}

const determineReviewerStatus = (item) => {
    var v = getUserRoles(item.id);
    console.log(v);
   // console.log("Has reviewer: " + v.includes('reviewer'));
}

const getAllUserRoles = async (uId, r) => {
        const res = await UserRoleServices.getAllUserRoles(uId, r.id);
        const userSpecificRole = res.data;
        if (userSpecificRole[0] && r.id === userSpecificRole[0].roleId) {
            return r.role_type;
        }
        return null;
};

const getUserRoles = async (userId) => {
    let roleList = '';
    const rolePromises = roles.value.map(async (role) => {
        const roleType = await getAllUserRoles(userId, role);
        return roleType;
    });

    const roleTypes = await Promise.all(rolePromises);
    const filteredRoles = roleTypes.filter((roleType) => 
        roleType !== null);
    roleList = filteredRoles.join(', ');

    return roleList;
};

onMounted(async () => {
    // if (user.value.id) {
    //     const userRoles = await getUserRoles(user.value.id);
    // }
});


getAllStudents();
getUsers();
</script>

<template>
    <div class="modified-width">
        <v-card title="Edit Users">

            <v-row>
                <v-col cols="6">
                    <v-text-field v-model="search" label="Search for User" prepend-inner-icon="mdi-magnify"
                        variant="outlined" hide-details single-line>
                    </v-text-field>
                </v-col>

                <v-col cols="6">
                    <v-select v-model="filterType" :items="filterOptions" label="Filter by User Type" outlined
                        hide-details>
                    </v-select>
                </v-col>
            </v-row>

            <v-data-table :headers="headers" :items="filteredUsers" class="elevation-1"
                :items-per-page="filteredUsers.length" hide-default-footer>
                <template #item.name="{ item }">
                    <span @click="userDataDisplay(item); determineReviewerStatus(item)">
                        {{ item.fName + " " + item.lName }}
                    </span>
                </template>
            </v-data-table>

        </v-card>
    </div>

    <div v-if="showUserInfo" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span @click="showUserInfo = false" class="close">&times;</span>
                <h3>User Data</h3>
            </div>

            <v-card class="mx-auto pa-4">
                <div class="modal-body">
                    <v-row>
                        <v-col cols="12">
                            <strong>Name:</strong> {{ user.fName + " " + user.lName }}
                        </v-col>
                        <v-col cols="12">
                            <strong>Email:</strong> {{ user.email }}
                        </v-col>
                        <v-col cols="12">
                            <strong>Roles:</strong> {{ getUserRoles(user.id) || 'Loading roles...' }}
                        </v-col>
                        <v-col cols="12">
                            <v-checkbox v-model="hasReviewerAccess" label="Has Reviewer Access?"
                                @change="handleReviewerChange"></v-checkbox>
                        </v-col>
                    </v-row>
                </div>
                <v-row class="justify-end pt-2 justify-right">
                    <v-btn @click="showUserInfo = false" color="red">Close</v-btn>
                </v-row>
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

.justify-right {
    padding-right: 10px
}
</style>