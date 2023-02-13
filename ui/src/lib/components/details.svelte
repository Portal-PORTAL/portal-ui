<script lang="ts">
	import logo_header from '$lib/assets/images/neb-logo-header.svg';
	import portal_lofi from '$lib/assets/images/portal-8bit.png';
	import portal_token_design from '$lib/assets/images/portal-token-design.png';
	import Particles from '$lib/components/particles.svelte';
	import { fade } from 'svelte/transition';
	import right_vector from '$lib/assets/images/right-vector.svg';
	import left_vector from '$lib/assets/images/left-vector.svg';
	import { Pie } from 'svelte-chartjs';
	import logo_discord from '$lib/assets/images/social-logos/logo-discord.svg';
	import logo_telegram from '$lib/assets/images/social-logos/logo-telegram.svg';
	import logo_medium from '$lib/assets/images/social-logos/logo-medium.svg';

	/**
	 *
	 */

	import {
		Chart,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		ArcElement,
		LinearScale
	} from 'chart.js';
	import { onMount } from 'svelte';
	import ConvertPanel from './convert-panel.svelte';

	Chart.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

	let screen_width: number;

	const data = {
		labels: [
			'Token creation w/ $NEB',
			'Liquidity & distribution events',
			'Team, marketing, bounties'
		],
		datasets: [
			{
				data: [17810930, 106865579, 53432789],
				backgroundColor: ['#482F6E', '#EDB85D', '#1B1B49'],
				hoverBackgroundColor: ['#482F6E', '#EDB85D', '#1B1B49']
			}
		]
	};
</script>

<div class="landing-cont">
	<section id="about" />
	<div class="content-row">
		<div class="text-content">
			<div class="detail-heading text-left">WELCOME TO PORTAL</div>
			<div class="detail-subheading">The next generation of yield vaults on Lamden</div>
			<div class="topic-title">What is Portal ?</div>
			<div class="topic-text">
				<p>Portal will provide the next generation of liquidity tools to the Lamden blockchain.</p>
				<p>
					It has been created to revive the spirit of the now derelict and abandoned project Nebula.
				</p>
				<p>
					It will be powered by the $XPTL token, which will be used to pay for the fees of the
					vaults and other offerings from the project.
				</p>
			</div>
			<div class="topic-title">Who is behind Portal ?</div>
			<div class="topic-text">
				<p>
					Our team is a collaboration between what remains of the original Nebula team and
					Rocketswap, who have decided to take action to fill a void in the ecosystem which was
					formed when Nebula was abandoned.
				</p>
			</div>
		</div>
		<div class="content-image-cont">
			<img src={portal_lofi} alt="" />
		</div>
	</div>
	<section id="xptl" />
	<div class="content-row">
		<div class="content-image-cont">
			<img id="portal-token-design" src={portal_token_design} alt="" />
		</div>
		<div class="text-content">
			<div class="detail-heading text-left">$XPTL</div>
			<div class="topic-text mt-10">
				<p>
					$XPTL is the native token of Portal. <br />
					Initial uses for $XPTL will be :
				</p>
				<ul>
					<li>Pay for the fees of the vaults.</li>
					<li>Increase reward levels on vaults via staking.</li>
				</ul>
				<p>$XPTL will be distributed in the following ways :</p>
				<ul>
					<li>Burn $NEB to create $XPTL</li>
					<li>Staking $XPTL LP on <a href="https://rocketswap.exchange">Rocketswap</a></li>
					<li>Airdrop to $RSWP holders, stakers and LP providers.</li>
					<li>Allocated to those who contribute skills to the $XPTL project</li>
				</ul>
				<p>
					It will be possible to burn <a
						href="https://rocketswap.exchange/#/swap/con_nebula"
						target="_blank">$NEB</a
					> to create PORTAL for 1 month, on the 10th March 2023, the token creation event will be closed
					permanently.
				</p>
				<p>We have no plans to support the $NEB Key at this time.</p>
			</div>
		</div>
	</div>
	<div class="content-row">
		<div class="text-content">
			<div class="detail-heading text-left">TOKEN DISTRIBUTION</div>
			<div class="topic-text mt-10 token-dist">
				<ul>
					<li>10% ( 17,810,930 ) - $NEB => $XPTL token mint event.</li>
					<li>60% ( 106,865,579 ) - Liquidity & distribution initiatives.</li>
					<li>30% ( 53,432,789 ) - Team, marketing & bounties.</li>
				</ul>
			</div>
		</div>
		<div class="content-image-cont h-60 text-center flex justify-center">
			<Pie {data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
		</div>
	</div>
	<section id="mint" />
	<div class="detail-heading text-center mt-20">Mint $XPTL with $NEB</div>
	<div class="content-row">
		<ConvertPanel />
	</div>
	<section id="roadmap" />

	<div class="content-row justify-center mb-20">
		<div class="text-content mt-10 w-60">
			<div class="detail-heading text-center mb-10">What's coming next :</div>
			<div class="topic-title text-center">10.2.23 - 10.3.23 | Token Swap</div>
			<div class="topic-title text-center">17.3.23 | LP Farming @ Rocketswap</div>
			<div class="topic-title text-center">Q2 2023 | Vault Product Launch</div>
			<div class="topic-title text-center">Detailed roadmap [Q2 2023]</div>
		</div>
	</div>
	<section id="contact" />

	<div class="content-row justify-center mb-20">
		<div class="text-content mt-10 w-60">
			<div class="socials-heading text-center mb-10">Connect with us on our socials :</div>
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
	</div>
</div>

<style>
	.socials-heading {
		font-size: 1.7rem;
	}

	.socials {
		display: flex;

		flex-direction: row;
		align-items: center;
		justify-content: center;
		border: 2px solid #c6b594;
		border-radius: 10px;
		width: 50%;
		margin: 0 auto;

		/* padding: 2rem; */
		/* min-width: 200px; */
	}

	.social-logo-cont {
		width: 4rem;
		height: 4rem;
		margin: 0 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.token-dist li {
		font-size: 1rem;
	}

	#portal-token-design {
		width: 100%;
		padding: 3vw 3vh;
	}

	.content-image-cont {
		width: 40%;
	}

	.content-row {
		display: flex;
		flex-direction: row;
		width: 100%;
		padding: 3vw 3vh 0vh 3vw;
	}

	.text-left {
		text-align: left;
	}

	.topic-text {
		font-size: 0.9rem;
		font-weight: 400;
		letter-spacing: 0.2rem;
		margin-bottom: 3rem;
	}

	.topic-text > p,
	ul {
		margin-bottom: 1rem;
	}

	.topic-title {
		font-size: 1rem;
		font-weight: 500;
		margin-bottom: 1.3rem;
		letter-spacing: 0.4rem;
		text-decoration: underline;
	}

	.detail-heading {
		font-size: 2.5rem;
		font-weight: 400;
		letter-spacing: 0.7rem;
	}

	.text-content {
		width: 60%;
	}

	.detail-subheading {
		font-size: 0.8rem;
		font-weight: 400;
		letter-spacing: 0.4rem;
		margin-bottom: 3rem;
	}

	.landing-cont {
		margin: 5vh auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #c6b594;
		z-index: 1;
		background-color: rgba(31, 23, 34, 0.9);
		/* height: 100vh; */
		max-width: 1200px;
	}

	a {
		/* color: #c6b594; */
		text-decoration: underline;
	}

	ul > li:before {
		content: '•';
		color: #c6b594;
		display: inline-block;
		width: 1em;
		margin-left: 1em;
	}

	ul > li {
		margin-bottom: 1rem;
	}

	@media (min-width: 1200px) {
	}

	@media (max-width: 800px) {
		.content-row {
			flex-direction: column;
		}

		.content-image-cont {
			margin: 0 auto;
			width: 80%;
		}

		.text-content {
			width: 100%;
		}
	}
</style>
