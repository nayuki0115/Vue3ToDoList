<template>
  <div v-if="visible" :class="alertClass">
    <strong>{{ alertMode }}:</strong> {{ message }}
    <button @click="closeAlert" class="close-button">×</button>
  </div>
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue';

// Props definition
const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: (value) => ['warning', 'info', 'success', 'danger'].includes(value)
  },
  message: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:visible']);

const alertMode = props.mode.toUpperCase();

// Compute class based on the mode
const alertClass = computed(() => {
  return [
    'alert',
    `alert-${props.mode}`
  ];
});

// Method to close the alert
const closeAlert = () => {
  emit('update:visible', false);
};
</script>

<style scoped>
.alert {
  padding: 15px;
  border-radius: 5px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 20px); /* Adjust width as needed */
  max-width: 600px; /* Optional: Set a maximum width */
  margin: 10px; /* Space from edges */
  z-index: 9999; /* Ensure it appears above other content */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for better visibility */
}

.alert-warning {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}
</style>
