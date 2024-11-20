<template>
    <div class="resume-preview" @click="handleClick">
        <img :src="resume.imageUrl" alt="Resume Image" />
        <h3>{{ resume.name }}</h3>
        <p>{{ resume.description }}</p>
        <v-tooltip location="top" max-width="200px">
            <template v-slot:activator="{ props }">
                <button v-bind="props" @click.stop="handleEdit">Edit</button>
            </template>
            Edit this resume
        </v-tooltip>
        <br>
        <v-tooltip location="top" max-width="200px">
            <template v-slot:activator="{ props }">
                <button v-bind="props" @click.stop="handleDelete">Delete</button>
            </template>
            Delete this resume
        </v-tooltip>
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from "vue";
  
  const props = defineProps({
    resume: Object,
  });
  
  const emit = defineEmits(['edit', 'delete']);
  
  const tooltip1 = ref(true);
  const tooltip2 = ref(true);
  
  onMounted(() => {
    tooltip1.value = true;
    tooltip2.value = true;
  });
  
  const handleClick = () => {
    console.log(`Clicked on resume ${props.resume.name}`);
  };
  
  const handleEdit = () => {
    emit('edit', props.resume.id);
  };
  
  const handleDelete = async () => {
    try {
      await fetch(`/api/resumes/${props.resume.id}`, { method: 'DELETE' });
      emit('delete', props.resume.id);
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };
  </script>
  
  <style scoped>
  .resume-preview {
    width: 222px; /* Set width to resemble a piece of paper */
    height: 298px; /* Set height */
    border: 2px dashed #1A9BCB; /* Dashed border */
    padding: 10px; /* Padding inside the box */
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    margin-bottom: 20px; /* Space below the shortcut area */
    border-radius: 20px;
    cursor: pointer;
  }
  
  .resume-preview:hover {
    background-color: #118ACB;
  }
  </style>
  