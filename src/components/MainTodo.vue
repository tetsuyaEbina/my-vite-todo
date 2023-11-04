<script setup>
import { ref } from 'vue';
const todoRef = ref('');
const todoListRef = ref([]);
const ls = localStorage.todoList;
todoListRef.value = ls ? JSON.parse(ls) : [];

const isEditRef = ref(false);
let editId = -1;
const editTodo = () => {
    // 対象となるTODOを取得
    const todo = todoListRef.value.find((todo) => todo.id === editId );

    // TODOリストから編集対象データのINDEXを取得する
    const index = todoListRef.value.findIndex((todo) => todo.id === editId );

    todo.task = todoRef.value;
    todoListRef.value.splice(index, 1, todo);

    localStorage.todoList = JSON.stringify(todoListRef.value);
    isEditRef.value = false;
    editId = -1;
    todoRef.value = '';
};

const addTodo = () => {
    // localStorageに.をつけて任意の変数名を設定することで、値を登録することができる
    // TODO: DBと連携できるようにする
    // IDを簡易的にm秒で管理
    const id = new Date().getTime();
    todoListRef.value.push({ id: id, task: todoRef.value })
    localStorage.todoList = JSON.stringify(todoListRef.value)

    // 登録後は、入力欄を空にする
    todoRef.value = '';
}

const showTodo = (id) => {
    // listの中身から、IDが一致した時点で値を渡す
    // findは、callback関数
    const todo = todoListRef.value.find((todo) => todo.id === id);
    todoRef.value = todo.task;
    isEditRef.value = true;
    editId = id;
};

const deleteTodo = (id) => {
    // 対象となるTODOを取得
    const todo = todoListRef.value.find((todo) => todo.id === editId);

    // TODOリストから編集対象データのINDEXを取得する
    const index = todoListRef.value.findIndex((todo) => todo.id === editId);

    todoListRef.value.splice(index, 1);
    localStorage.todoList = JSON.stringify(todoListRef.value);
};
</script>

<template>
    <div class="box_input">
        <input 
          type="text" 
          class="todo_input" 
          v-model="todoRef"
          placeholder="TODOを入力" />
        <button class="btn green" v-on:click="editTodo" v-if="isEditRef">変更</button>
        <button class="btn" v-on:click="addTodo" v-else>追加</button>
    </div>

    <div class="box_list">
        <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">
            <div class="todo">
                <input type="checkbox" class="check" /><label>{{todo.task}}</label>
            </div>
            <div class="btns">
                <button class="btn green" v-on:click="showTodo(todo.id)">編</button>
                <button class="btn pink" @click="deleteTodo(todo.id)">削</button>
            </div>
        </div>
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
</style>
