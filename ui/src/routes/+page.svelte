<script lang="ts">
	import { goto } from '$app/navigation';
	import logo_header from '$lib/assets/images/neb-logo-header.svg';
	import portal_lofi from '$lib/assets/images/portal-8bit.png';
	import Particles from '$lib/components/particles.svelte';
	import { fade } from 'svelte/transition';
	import Landing from '../lib/components/landing.svelte';
	import Details from '../lib/components/details.svelte';

	let screen_width: number;

	function scrollIntoView() {
		const el = document.querySelector(('#main'));
		if (!el) return;
		el.scrollIntoView({
			behavior: 'smooth'
		});
	}
</script>

<!-- <div class="landing-cont"> -->
<Landing scrollHandler={scrollIntoView} />
<section id="main" />
<Details />
<!-- </div> -->

<svelte:window bind:innerWidth={screen_width} />

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
