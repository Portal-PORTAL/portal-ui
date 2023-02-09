<script lang="ts">
	import { onMount } from 'svelte';
	import { loadFull } from 'tsparticles';
	let ParticlesComponent;

	export let bg_color: string;
	export let particles_color: string;
	export let triangles: boolean = false;
	export let screen_width: number;
	export let speed = 2;
	export let distance = 150;
	export let particles_number: [number, number] = [50, 120];

	// onMount(async () => {
	// 	const module = await import('svelte-particles');
	// 	ParticlesComponent = module.default;
	// });

	let particlesConfig = {
		particles: {
			color: {
				value: particles_color
			},
			links: {
				distance: screen_width < 1000 ? distance : distance * 2,
				enable: true,
				triangles: {
					enable: triangles,
					opacity: 0.05
				},
				color: {
					value: particles_color
				}
			},
			size: {
				value: 2
			},
			move: {
				enable: true,
				speed
			},
			number: {
				limit: screen_width < 1000 ? particles_number[0] : particles_number[1],
				value: screen_width < 1000 ? particles_number[0] : particles_number[1]
			}
		},
		background: {
			color: bg_color
		},
		preset: 'triangles'
	};

	let onParticlesLoaded = (event) => {
		const particlesContainer = event.detail.particles;
		console.log(particlesContainer)
		// you can use particlesContainer to call all the Container class
		// (from the core library) methods like play, pause, refresh, start, stop
	};

	let particlesInit = async (engine) => {
		// you can use main to customize the tsParticles instance adding presets or custom shapes
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	};
</script>
<div>
	<svelte:component
		this={ParticlesComponent}
		id="tsparticles"
		options={particlesConfig}
		on:particlesLoaded={onParticlesLoaded}
		{particlesInit}
	/>
</div>

<style>
</style>
