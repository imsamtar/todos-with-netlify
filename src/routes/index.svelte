<section>
	{#if user}
		<h1 class="has-text-centered title">Welcome {user.user_metadata.full_name}</h1>
		<h2 class="has-text-centered subtitle">{user.email}</h2>

		<Todos />
	{/if}
</section>

<style>
section {
	padding: 1rem;
}
</style>

<script>
	import Todos from '../components/Todos.svelte';
	import {netlifyIdentity} from '../store.js';

	let user;

	$: {
		if($netlifyIdentity && $netlifyIdentity.currentUser())
			user = $netlifyIdentity.currentUser();
		else
			user = undefined;
	}
</script>