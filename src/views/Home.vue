<template>
<div class="todo-container">
  <div class="todo-left">
    <h2 class="todo-header">待辦事項</h2>
    <div class="todo-input-container">
      <input type="text" class="todo-input" v-model="inputValue" placeholder="輸入新的待辦事項" @keyup.enter="handleAdd">
      <button class="todo-add-btn" @click="handleAdd">新增</button>
    </div>
    <!-- <button class="todo-edit-btn">編輯</button> -->
  </div>
  <div class="todo-right">
    <div class="todo-filter">
      <select v-model="filterType">
        <option value="all">全部</option>
        <option value="notCompleted">未完成</option>
        <option value="completed">已完成</option>
      </select>
      <div class="todo-actions">
        <button class="todo-complete-btn" @click="handleChangeType('complete')">標記完成</button>
        <button class="todo-uncomplete-btn" @click="handleChangeType('notComplete')">標記未完成</button>
      </div>
    </div>
    <ul class="todo-list">
      <li class="todo-item" :class="selectComplete.includes(item.id) === true ? 'todo-completed' : ''" v-for="(item, index) in toDoListFilter" :key="`${item.title}-${index}`">
        <input type="checkbox" class="todo-checkbox" v-model="selectedValues" :value="item.id">
        <span class="todo-text">{{ selectComplete.includes(item.id) === true ? `${item.title}（已完成）` : `${item.title}` }} </span>
        <button class="todo-delete-btn" @click="handleDelete(index)">刪除</button>
      </li>
    </ul>
  </div>
</div>

<Alert
  v-if="showAlert"
  :mode="alertMode"
  :message="alertMessage"
  :visible="showAlert"
  @update:visible="showAlert = $event"
/>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import Alert from '@/components/Alert.vue';

const showAlert = ref(false)
const alertMode = ref('warning')
const alertMessage = ref('')
const inputValue = ref<string>('')
const handleAdd = () => {
  if(inputValue.value === '') {
    showAlert.value = true
    alertMessage.value = '輸入的值不得為空'
  }else {
    toDoList.value.push({
      title: inputValue.value,
      type: 'notComplete',
      id: Number(toDoList.value.length) +1
    })
    inputValue.value = ''
  }
  
}

interface toDoListItem {
  title: string;
  id: number;
  type: string;
}
const toDoList = ref<toDoListItem[]>([])
const toDoListFilter = computed(()=> {
  let temp = JSON.parse(JSON.stringify(toDoList.value))
  const completeSet = new Set(selectComplete.value);
  if(filterType.value === "notCompleted") {
    temp = toDoList.value.filter((item: {id: number}) => !completeSet.has(item.id))
  }else if (filterType.value === "completed") {
    temp = toDoList.value.filter((item: {id: number}) => completeSet.has(item.id))
  }
  return temp
})
const filterType = ref<'all'|'notCompleted'|'completed'>('all')
const selectedValues = ref<number[]>([])
const selectedItems = computed<toDoListItem[]>(() => {
  return toDoList.value.filter((item: {id: number}) => selectedValues.value.includes(item.id));
})
const selectComplete = ref<number[]>([])
const selectCompleteItems = computed<toDoListItem[]>(() => {
  return toDoList.value.filter((item: {id: number}) => selectComplete.value.includes(item.id));
})
const handleDelete = (index: number) => {
  let itemToDelete = toDoList.value[index]
  // 從 toDoList 中刪除項目
  toDoList.value.splice(index, 1)
  
  // 從 selectComplete 中移除要刪除的 id
  let completeIndex = selectComplete.value.indexOf(itemToDelete.id)
  if (completeIndex !== -1) {
    selectComplete.value.splice(completeIndex, 1)
  }
  
  // 從 selectedValues 中移除要刪除的 id
  let selectedIndex = selectedValues.value.indexOf(itemToDelete.id)
  if (selectedIndex !== -1) {
    selectedValues.value.splice(selectedIndex, 1)
  }
}

const handleChangeType = (type: 'notComplete'|'complete') => {
  let { commonItems, uniqueItems } = getIdDifferences(selectCompleteItems.value, selectedItems.value);
  let uniqueIds: number[] = uniqueItems.map((item: {id: number}) => item.id)
  if(type === 'complete') {
    // 重複的不加入
    selectComplete.value.push(...uniqueIds)
  }else if(type === 'notComplete') {
    selectComplete.value = uniqueIds
  }
  selectedValues.value = []
}

const getIdDifferences = (array1: toDoListItem[], array2: toDoListItem[]) => {
  let set1 = new Set(array1)
  let set2 = new Set(array2)

  // 重複id
  let commonItems = array2.filter(id => set1.has(id))

  // 不重複id
  let onlyInArray1 = array1.filter(id => !set2.has(id))
  let onlyInArray2 = array2.filter(id => !set1.has(id))
  let uniqueItems = [...onlyInArray1, ...onlyInArray2]

  return { commonItems, uniqueItems }
}


// 保存數據到 localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(toDoList.value))
  localStorage.setItem('selectComplete', JSON.stringify(selectComplete.value))
}

// 從 localStorage 讀取數據
const loadFromLocalStorage = () => {
  const savedTodoList = localStorage.getItem('todoList')
  const savedSelectComplete = localStorage.getItem('selectComplete')
  
  if (savedTodoList) {
    toDoList.value = JSON.parse(savedTodoList)
  }
  
  if (savedSelectComplete) {
    selectComplete.value = JSON.parse(savedSelectComplete)
  }
}

// 監聽 toDoList 和 selectComplete 的變化，並保存到 localStorage
watch([toDoList, selectComplete], () => {
  saveToLocalStorage()
}, { deep: true })

// 從 localStorage 讀取數據
onMounted(() => {
  loadFromLocalStorage()
})
</script>

<style>
body {
  background-color: #ffffff;
  color: #333;
  font-family: Arial, sans-serif;
}

.todo-container {
  display: flex;
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  gap: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.todo-left, .todo-right {
  flex: 1;
}

.todo-header {
  font-size: 28px;
  margin-bottom: 20px;
  color: #c77dff;
}

.todo-input-container {
  display: flex;
  margin-bottom: 20px;
}

.todo-input {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ff99c8;
  border-radius: 4px 0 0 4px;
}

.todo-add-btn {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff99c8;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.todo-add-btn:hover {
  background-color: #ff7aaf;
}

.todo-edit-btn {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #a9def9;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.todo-edit-btn:hover {
  background-color: #7fcff6;
}

.todo-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.todo-filter select {
  padding: 5px;
  font-size: 16px;
  border: 2px solid #a9def9;
  border-radius: 4px;
}

.todo-actions {
  display: flex;
  gap: 10px;
}

.todo-complete-btn, .todo-uncomplete-btn {
  padding: 5px 10px;
  font-size: 14px;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.todo-complete-btn {
  background-color: #d0f4de;
}

.todo-complete-btn:hover {
  background-color: #b3ecc3;
}

.todo-uncomplete-btn {
  background-color: #e4c1f9;
}

.todo-uncomplete-btn:hover {
  background-color: #d7a4f7;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #e6f3ff; /* 將背景色改為淡藍色 */
  border-radius: 4px;
  transition: background-color 0.3s;
}

.todo-item:hover {
  background-color: #d1e8ff; /* 懸停時稍微深一點的藍色，以區分狀態 */
}


.todo-checkbox {
  margin-right: 10px;
}

.todo-text {
  flex-grow: 1;
  color: #333;
}

.todo-completed .todo-text {
  text-decoration: line-through;
  color: #888;
}

.todo-delete-btn {
  padding: 5px 10px;
  font-size: 14px;
  background-color: #ff99c8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px;
}

.todo-delete-btn:hover {
  background-color: #ff7aaf;
}
</style>