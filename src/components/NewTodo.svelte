<form class="list-item is-flex" on:submit|preventDefault={addNew}>
    <button class="button" on:click={getTodos}> <i class="fas fa-sync-alt"></i></button>
    <button class="button" on:click={saveTodos}> <i class="fas fa-save fa-2"></i> </button>
    <!-- svelte-ignore a11y-autofocus -->
    <input type="text" class="input has-borderless" bind:value={newTodo.text} autofocus placeholder="What next?">
    <button class="button is-success"><i class="fas fa-check"></i></button>
</form>

<style>
    input {
        border: 0 !important;
        box-shadow: 0 0 0 0 !important;
    }
</style>

<script>
    import {todos, netlifyIdentity} from '../store';

    let empty = { text: '', done: false };

    let newTodo = {...empty};

    function addNew(){
        if(newTodo.text){
            $todos = [{...newTodo}, ...$todos];
            newTodo = {...empty};
        }
    }

    async function saveTodos(){
        $todos = (await (await fetch('/.netlify/functions/todos', {
            method: 'POST',
            body: {
                todos: JSON.stringify($todos)
            },
            headers: {
                'Authentication': `Bearer ${$netlifyIdentity.currentUser().token.access_token}`,
                'Content-Type': 'application/json'
            }
        }))).todos;
    }

    async function getTodos(){
        $todos = (await (await fetch('/.netlify/functions/todos', {
            method: 'GET',
            headers: { 'Authentication': `Bearer ${$netlifyIdentity.currentUser().token.access_token}` }
        }))).todos;
        if(!$todos) $todos = [];
    }

</script>