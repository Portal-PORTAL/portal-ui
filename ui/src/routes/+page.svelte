<script lang="ts">
	import Landing from '../lib/components/landing.svelte';
	import Details from '../lib/components/details.svelte';

	let screen_width: number;

	function scrollIntoView(section: string) {
		const el = document.querySelector((`${section}`));
		if (!el) return;
		el.scrollIntoView({
			behavior: 'smooth'
		});
	}
</script>

<Landing scrollHandler={scrollIntoView} />
<Details />


<style>
	.landing-cont {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
		width: 100vw;
		color: #fff;
		z-index: 1;
	}

	@media (min-width: 900px) {
	}

	@media (max-width: 600px) {
	}
</style>
