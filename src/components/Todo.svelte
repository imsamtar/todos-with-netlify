<div class="list-item is-flex">
    <div type="text" class="input has-borderless" class:done={todo.done} on:click={() => todo.done=!todo.done }>{todo.text}</div>
    <button class="button is-danger" on:click={removeTodo}><i class="fas fa-trash"></i></button>
</div>

<style>
    .input {
        overflow-y: auto;
        border: 0 !important;
        box-shadow: 0 0 0 0 !important;
    }
    .done {
        color: #bbb;
        text-decoration: line-through;
    }
</style>

<script>
    import {todos} from '../store';

    export let todo;

    function removeTodo(){
        $todos = $todos.filter(t => t!=todo);
    }
</script>