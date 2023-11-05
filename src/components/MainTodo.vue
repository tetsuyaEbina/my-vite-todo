<script setup>
import { ref, onMounted } from 'vue';
import { useTodoList } from '/src/composables/useTodoList.js';
import  BaseButton  from '/src/components/BaseButton.vue';

const todoRef = ref('');
const isEditRef = ref(false);
const { todoListRef, add, show, edit, del, check, countFin } = useTodoList();

// 入力値を取得
onMounted(() => {
    const inpMount = document.getElementById('inp').value;
    console.log(inpMount);
});

const editTodo = () => {
    edit(todoRef.value);
    isEditRef.value = false;
    todoRef.value = '';
};

const addTodo = () => {
    add(todoRef.value);
    // 登録後は、入力欄を空にする
    todoRef.value = '';
}

const showTodo = (id) => {
    todoRef.value = show(id);
    isEditRef.value = true;
};

const deleteTodo = (id) => {
    del(id);
    localStorage.todoList = JSON.stringify(todoListRef.value);
};

const changeCheck = (id) => {
    check(id);
};
</script>

<template>
    <div class="box_input">
        <input 
          id="inp" 
          type="text" 
          class="todo_input" 
          v-model="todoRef"
          placeholder="TODOを入力" />
        <BaseButton color="green" v-on:click="editTodo" v-if="isEditRef">変更</BaseButton>
        <BaseButton color="blue" v-on:click="addTodo" v-else>追加</BaseButton>
    </div>

    <div class="box_list">
        <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">
            <div class="todo" v-bind:class="{ fin: todo.checked === true }" >
                <input type="checkbox" class="check" @change="changeCheck(todo.id)" v-bind:checked="todo.checked"/><label>{{todo.task}}</label>
            </div>
            <div class="btns">
                <BaseButton color="green" v-on:click="showTodo(todo.id)">編</BaseButton>
                <BaseButton color="pink" @click="deleteTodo(todo.id)">削</BaseButton>
            </div>
        </div>
    </div>

    <div class="finCount">
        <span>完了-->{{ countFin }}、</span>
        <span>未完了-->{{ todoListRef.length - countFin }}</span>
    </div>
</template>

<style scoped>
.box_list {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.todo_list {
    display: flex;
    align-items: center;
    gap: 8px;
}

.todo {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 12px;
    width: 300px;
}

.check {
    border: 1px solid white;
    transform: scale(7);
    margin: 0 16px 2px 6px;
}

.btns {
    display: flex;
    gap: 4px;
}

.green {
    background-color: #00c853 !important;
}

.pink {
    background-color: #ff4081 !important;
}

.box_input {
    margin-top: 20px;
}

.todo_input {
    width: 300px;
    margin-right: 8px;
    padding: 8px;
    font-size: 18px;
    border: 1px solid #aaa;
    border-radius: 6px;
}

.btn {
    padding: 8px;
    background-color: #03a9f4;
    border-radius: 6px;
    color: #fff;
    text-align: center;
    font-size: 14px;
}

.fin {
    text-decoration: line-through;
    background-color: #ddd;
    color: #777;
}

.finCount{
    margin-top: 8px;
    font-size: 0.8em;
}
</style>
