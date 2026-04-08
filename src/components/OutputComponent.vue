<script setup>
</script>   

<template>
    <div class="container">
        <div class="output">Output Content</div>
    </div>
</template>

<style>
.container {
    display: flex;
    flex-direction: column;
    height: 60px;
    width: 300px;
    border-radius: 8px;

}
.output {
    flex: 1;
    background-color: #f0f0f0;
    padding: 20px;
    overflow-y: auto;
    color: black;
    border-radius: 8px;
}


</style>