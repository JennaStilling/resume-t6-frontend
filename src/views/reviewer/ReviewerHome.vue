<script setup>
import Utils from "../../config/utils.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ResumeReviewServices from "../../services/resumeReviewServices"

const router = useRouter();
// const tutorials = ref([]);
// const user = Utils.getStore("user");

const viewRequest = (request) => {
    //router.push({ name: "view", params: { id: request.id } });
};

const cancelRequest = (request) => {
      ResumeReviewServices.delete(request.id)
        .then(() => {
          retrieveTutorials();
        })
        .catch((e) => {
          message.value = e.response.data.message;
        });
};

const retrieveRequests = () => {
      ResumeReviewServices.getAllForUser(user.userId)
        .then((response) => {
          request.value = response.data;
        })
        .catch((e) => {
          message.value = e.response.data.message;
        });
};

retrieveRequests();
</script>

<template>
<!-- request area-->
    <div class="admin-container">
    <v-container fluid>
        <v-row align="center" no-gutters v-for="row in 3" :key="row" class="mb-4">
            <v-col cols="3" v-for="col in 3" :key="col" class="ma-2">
                <v-card class="mx-auto card-padding" width="100%">
                    <template v-slot:title>
                        <span class="font-weight-black">ᓚᘏᗢ</span>
                    </template>

                    <v-card-text>
                        Request Text
                    </v-card-text>

                    <v-card-actions>
                        <div class="d-flex justify-end">
                            <v-btn variant="outlined" color="red">Delete Request</v-btn>
                            <v-btn variant="elevated" color="blue">View Request</v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
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