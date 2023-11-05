import { ref } from 'vue';

// 外部から利用できるようにexportする
export const useTodoList = () =>{

    const todoListRef = ref([]);
    const ls = localStorage.todoList;
    todoListRef.value = ls ? JSON.parse(ls) : [];

    //追加処理
    const add = (task) => {
        // localStorageに.をつけて任意の変数名を設定することで、値を登録することができる
        // TODO: DBと連携できるようにする
        // IDを簡易的にm秒で管理
        if(task === null || task === ''){
            return alert('文字を入力してください。');
        }
        const id = new Date().getTime();
        todoListRef.value.push({ id: id, task: task, checked: false });
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    // id検索
    const findById = (id) => {
        // listの中身から、IDが一致した時点で値を渡す
        // findは、callback関数
        return todoListRef.value.find((todo) => todo.id === id);
    };
    // idからindexを検索
    const findIndexById = (id) => {
        // listの中身から、IDが一致した時点で値を渡す
        // findは、callback関数
        return todoListRef.value.findIndex((todo) => todo.id === id);
    };

    const editId = ref(-1);
    const show = (id) => {
        const todo = findById(id);
        editId.value = id;
        return todo.task;
    };

    const edit = (task) => {
        const todo  = findById(editId.value);
        const index = findIndexById(editId.value);
        todo.task   = task;
        todoListRef.value.splice(index, 1, todo);
        localStorage.todoList = JSON.stringify(todoListRef.value);
        editId.value = -1;
    };

    const del = (id) => {
        const todo = findById(id);
        const delMsg = '[' + todo.task + ']を削除しますか?';
        if ( !confirm(delMsg)) return;

        const index = findIndexById(id);
        todoListRef.value.splice(index, 1);
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    const check = (id) => {
        const todo = findById(id);
        const index = findIndexById(id);
        // true,falseを変換する
        todo.checked = !todo.checked;
        todoListRef.value.splice(index, 1, todo);
        localStorage.todoList = JSON.stringify(todoListRef.value);
    }

    return { todoListRef, add, show, edit, del, check };
}