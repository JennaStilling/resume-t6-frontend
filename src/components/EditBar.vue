<template>
    <div class="edit-bar">
      <div 
        class="tab" 
        :class="{ active: activeTab === 'preview' }" 
        @click="setActiveTab('preview')">
        Preview
      </div>
      <div 
        class="tab" 
        :class="{ active: activeTab === 'template' }" 
        @click="setActiveTab('template')">
        Choose Template
      </div>
      <div 
        class="tab" 
        :class="{ active: activeTab === 'ai' }" 
        @click="setActiveTab('ai')">
        AI Analysis
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      initialActiveTab: {
        type: String,
        default: 'preview'
      }
    },
    data() {
      return {
        activeTab: this.initialActiveTab
      };
    },
    methods: {
      setActiveTab(tab) {
        this.activeTab = tab;
        this.$emit('tab-change', tab);
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-bar {
    background-color: #084565;
    display: flex;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 20px;
    max-width: 100%;
    margin-left: 70px;
  }
  
  .tab {
    flex: 1;
    padding: 10px 20px;
    text-align: center;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .tab.active {
    background-color: #0e74a0;
    font-weight: bold;
  }
  
  .tab:hover {
    background-color: #0b547c;
  }
  </style>  
  