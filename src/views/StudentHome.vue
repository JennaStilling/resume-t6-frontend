<template>
    <div>

    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ref, onMounted } from "vue";
import Utils from '@/config/utils.js';

const user = Utils.getStore("user");
const studentId = ref();
const resumes = ref(null);

onMounted(() => {
    Utils.getUser(user).then(value => {
        studentId.value = value.studentId;
        getResumes();
    })
})

</script>