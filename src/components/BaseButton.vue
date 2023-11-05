<script setup>
    // definePropsについて、以下の利用方法で、「プロパティcolorはString型で受け取る」ということになる
    const props = defineProps({ color: String });
    // 以下の方法で、親へ伝えるための名称を定義する
    const emit = defineEmits(['on-click']);
    // emit関数を用いて親に通知する
    // defineEmitsで定義した名称を指定する
    const onClick = () => {
        emit('on-click');
    };
</script>

<template>
    <button class="btn" v-on:click="onClick()" v-bind:class="props.color"><slot /></button>
</template>

<style scoped>
.btn {
    padding: 8px;
    border-radius: 6px;
    color: #fff;
    text-align: center;
    font-size: 14px;
}

.green {
    background-color: #00c853;
}

.blue {
    background-color: #03a9f4 !important;
}

.pink {
    background-color: #ff4081 !important;
}
</style>
