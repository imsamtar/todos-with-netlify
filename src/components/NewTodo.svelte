<form class="list-item is-flex" on:submit|preventDefault={addNew}>
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
    import {todos} from '../store';

    let empty = { text: '', done: false };

    let newTodo = {...empty};

    function addNew(){
        if(newTodo.text){
            $todos = [{...newTodo}, ...$todos];
            newTodo = {...empty};
        }
    }
</script>