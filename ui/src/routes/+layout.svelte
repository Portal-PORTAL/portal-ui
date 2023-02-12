<script lang="ts">
	import '../app.css';
	import logo_lofi from '$lib/assets/images/portal-8bit-small.png';
	import portal_landing_text from '$lib/assets/images/portal-landing-text.svg';
	import logo_discord from '$lib/assets/images/social-logos/logo-discord.svg';
	import logo_telegram from '$lib/assets/images/social-logos/logo-telegram.svg';
	import logo_medium from '$lib/assets/images/social-logos/logo-medium.svg';

	function scrollIntoView({ target }) {
		const el = document.querySelector(target.getAttribute('href'));
		if (!el) return;
		el.scrollIntoView({
			behavior: 'smooth'
		});
	}
</script>

<!-- <header class="sticky-header" /> -->

<footer class="sticky-footer">
	<div class="footer-container">
		<div class="footer-logo">
			<a href="/">
				<img id="logo-img" src={logo_lofi} alt="logo" />
			</a>
			<img id="logo-text" src={portal_landing_text} alt="" />
		</div>
		<div class="footer-nav">
			<a on:click|preventDefault={scrollIntoView} href="#about">About</a>
			<a on:click|preventDefault={scrollIntoView} href="#xptl">$XPTL</a>
			<a on:click|preventDefault={scrollIntoView} href="#mint">Mint</a>
			<a on:click|preventDefault={scrollIntoView} href="#roadmap">Roadmap</a>
		</div>
		<div class="socials">
			<!-- <div class="social-logo-cont">
				<a href="https://discord.gg/EcdbaNcmdG" rel="noreferrer" target="_blank">
					<img src={logo_discord} alt="discord" />
				</a>
			</div> -->
			<div class="social-logo-cont">
				<a href="https://t.me/LamdenPortal" rel="noreferrer" target="_blank">
					<img src={logo_telegram} alt="telegram" />
				</a>
			</div>
			<!-- <div class="social-logo-cont">
				<a href="" rel="noreferrer" target="_blank">
					<img src={logo_medium} alt="medium" />
				</a>
			</div> -->
		</div>
	</div>
</footer>
<slot />

<style>
	.sticky-header {
		position: fixed;
		top: 0;
		left: 0;
		/* width: 100%; */
		z-index: 100;
		/* background-color: #19131C; */
		height: 80px;
		/* border-bottom: 2px solid #ecb75c; */
		display: flex;
		flex-direction: row-reverse;
	}

	.social-logo-cont {
		width: 30px;
		height: 30px;
		margin: 0 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.footer-nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		/* min-width: 800px; */
		font-size: 1rem;
		letter-spacing: 0.7rem;
		text-transform: uppercase;
		width: 70%;
		max-width: 900px;
	}

	.footer-nav a {
		/* padding-right: 4rem; */
	}

	.socials {
		display: flex;
		flex-direction: row;
		align-items: center;
		/* min-width: 200px; */
	}

	.footer-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		/* max-width: 1200px; */
		padding: 0 5vw;
		margin: 0 auto;
	}

	#logo-img {
		min-width: 80px;
		height: 80px;
	}

	#logo-text {
		width: 150px;
		height: 50px;
	}

	.sticky-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 100;
		/* background-color: #ecb75c; */
		background-color: #19131c;
		height: 80px;
		border-top: 2px solid #ecb75c;
		display: flex;
		flex-direction: row;
	}

	.footer-logo {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* width: 20%; */
	}

	@media (max-width: 768px) {
		.footer-nav {
			display: none;
		}
		.footer-logo {
			width: 100%;
		}
		#logo-img {
			min-width: 60px;
			height: 60px;
		}
		#logo-text {
			width: 100px;
			height: 30px;
		}
	}
</style>
