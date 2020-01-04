<div class="list">
    <NewTodo />
    {#each $todos as todo}
        <Todo bind:todo={todo} />
    {/each}
</div>

<script>
    import NewTodo from './NewTodo.svelte';
    import Todo from './Todo.svelte';

    import {todos} from '../store.js';
    
</script>