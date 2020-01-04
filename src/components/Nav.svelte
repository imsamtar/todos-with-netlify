<nav class="navbar is-primary">
	<div class="container">
		<div class="navbar-brand">
			<a href="." class="navbar-item"><i class="fal fa-home fa-2x"></i></a>
			<span class="navbar-burger" class:is-active={isActive}  on:click={switchNavbar}>
				<span></span>
				<span></span>
				<span></span>
			</span>
		</div>
		<ul class="navbar-menu navbar-end" class:is-active={isActive} on:click={switchNavbar}>
			<li class="navbar-item"><a class="has-text-white" class:has-text-bold='{segment === 'about'}' href='about'>about</a></li>
		</ul>
	</div>
</nav>

<style>
nav.navbar {
	position: fixed;
	top: 0;
	width: 100%;
	opacity: 0.9;
}
ul.is-active > li > a {
	color: black !important;
}
</style>

<script>
	export let segment;

	let isActive = false;
	function switchNavbar(){
		isActive=!isActive;
	}
</script>
