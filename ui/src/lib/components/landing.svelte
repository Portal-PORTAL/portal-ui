<script lang="ts">
	import landing_image from '$lib/assets/images/portal-landing-no-bg.png';
	import portal_landing_text from '$lib/assets/images/portal-landing-text.svg';

	export let scrollHandler: any;

	$: bgImage = `background-image: url("${landing_image}");`;
</script>

<div class="landing-img-cont-outer">
	<div
		class="landing-img-container"
		style="background-image: url({landing_image}); background-size: contain; background-repeat: no-repeat; background-position: center;"
	>
		<div class="landing-text"><img src={portal_landing_text} alt="" /></div>
	</div>
	<div class="btn-container">
		<button on:click={() => scrollHandler('#about')} class="button btn-primary btn-rounded"
			>explore the portal</button
		>
	</div>
</div>
<div class="landing-container" />

<style>
	.landing-img-cont-outer {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
	}
	.landing-container {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: rgba(31, 23, 34, 0.6);
		width: 100%;
		margin: 0 auto;
	}

	.landing-img-container {
		margin-top: 3%;
		height: 80%;
		width: 100%;
		max-width: 1200px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		mix-blend-mode: unset;
		/* position: absolute; */
	}

	.landing-text {
		text-align: center;
		/* mix-blend-mode: exclusion; */
		padding: 0 10vh;
		color: #ffffff;
		padding-top: 20vh;
		user-select: none;
	}
</style>
