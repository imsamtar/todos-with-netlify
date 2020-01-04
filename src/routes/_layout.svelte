<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<Nav {segment}/>
<main class="container">
	<slot></slot>
</main>

<style>
main {
	margin-top: 3.3rem;
}
</style>
