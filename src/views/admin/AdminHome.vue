<script setup>

</script>

<template>
    <!-- admin sidebar -->
    <div class="sidenav">
        <ul class="menu">
            <li class="menu-item">
                <v-card class="mx-auto" width="100%">
                    <v-btn class="side-bar-button"><router-link :to="{ name: 'viewStudentResume', params: { id: 1 } }">
                            See Student Resume
                        </router-link></v-btn>
                </v-card>
            </li>
        </ul>
    </div>

    <!-- request area -->
    <div class="admin-container">
        <v-card class="mx-auto" width="400">
            <template v-slot:title>
                <span class="font-weight-black">Student Name</span>
            </template> 

            <v-card-text>
                Request Text
            </v-card-text>

            <v-card-actions>
                <v-btn variant="outlined">Delete Request</v-btn>
                <v-btn variant="elevated">View Request</v-btn>
            </v-card-actions>
        </v-card>

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
    margin-left: 10px;
    margin-right: 10px;
}
</style>