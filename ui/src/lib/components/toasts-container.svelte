<script lang="ts">
	import type { ToastType, ToastMetaType } from '../types/toast.types';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { ToastService } from '../services/toast.service';

	//Icons
	import CloseIcon from '$lib/assets/images/icons/close.svelte';
	import PopoutIcon from '$lib/assets/images/icons/popout.svelte';
	import GaugePlusIcon from '$lib/assets/images/icons/gauge-plus.svelte';
	import GaugeMinusIcon from '$lib/assets/images/icons/gauge-minus.svelte';

	const iconMap = {
		popout: PopoutIcon,
		gaugePlus: GaugePlusIcon,
		gaugeMinus: GaugeMinusIcon
	};

	const toastService = ToastService.getInstance();

	let toasts: ToastMetaType[];
	$: toasts;
	toastService.toast_store.subscribe((toasts_array) => {
		toasts = toasts_array;
	});

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
						transform: ${transform} scale(${t});
						opacity: ${t}
					`
			};
		}
	});

	function handleRemove(id: number) {
		toastService.dismiss(id);
	}
</script>

<div class="toasts-container">
	{#each toasts as t (t.id)}
		<div
			in:receive={{ key: t.id }}
			out:send={{ key: t.id }}
			animate:flip={{ duration: 700 }}
			class={`toast-container ${t.type}`}
		>
			{#if t.icon}
				<div class="toast-icon">
					<svelte:component
						this={iconMap[t.icon]}
						width="36px"
						color={'var(--toast-icon-color)'}
						minWidth="36px"
					/>
				</div>
			{/if}

			<div class={`text-container`}>
				<div class="heading flex-row flex-align-center">
					{t.heading}
				</div>
				<div
					class="close-icon"
					on:click={() => handleRemove(t.id)}
					on:keydown={() => handleRemove(t.id)}
				>
					<CloseIcon width="9px" color={'rgba(0,0,0,0.3)'} />
				</div>
				{#if t.text}
					<div class="subtext text-small">{t.text}</div>
				{/if}
				{#if t.link}
					<a
						href={t.link.href}
						class="link subtext text-small flex-row flex-center-end"
						rel="noopener noreferrer"
						target="_blank"
					>
						{t.link.text}
						{#if t.link.icon}
							<svelte:component this={iconMap[t.link.icon]} width="11px" margin="-1px 0 0 4px" />
						{/if}
					</a>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.toasts-container {
		position: fixed;
		box-sizing: border-box;
		top: 0px;
		right: 0px;
		width: 280px;
		padding: 0px 10px 0px 0px;
		z-index: 105;
		font-size: 0.8rem;
		color: rgba(0, 0, 0, 0.3);
		min-height: 3rem;
	}

	.text-container {
		width: 100%;
	}

	.heading {
		font-weight: 600;
		width: 100%;
		justify-content: space-between;
	}

	.close-icon {
		position: relative;
		bottom: 85%;
		left: 97%;
	}

	.subtext {
		line-height: 1.2;
		word-break: break-word;
	}

	.toast-container {
		justify-content: space-between;
		display: flex;
		flex-direction: row;

		margin-top: 8px;
		padding: 10px 10px 5px 10px;
		z-index: 110;

		border-radius: 8px;
		background-color: #ecb75c;

		min-height: 50px;

		box-shadow: -8px 7px 12px -6px rgba(0, 0, 0, 0.3);
		-webkit-box-shadow: -8px 7px 12px -6px rgba(0, 0, 0, 0.3);
		-moz-box-shadow: -8px 7px 12px -6px rgba(0, 0, 0, 0.3);
	}
	.toast-icon {
		padding: 5px 10px 0 0;
	}

	.success {
		border: 3px solid #30d77e;
		background: #239659;
	}

	.warning {
		border: 3px solid var(--warning-color);
		background: var(--toast-background-warning);
	}

	.error {
		border: 3px solid #d44332;
		background: #eb6d5f;
	}

	.info {
		border: 3px solid #c3984e;
	}
	.link {
		text-align: end;
		margin-top: 0.5rem;
		font-weight: 400;
	}
	/* When page width is greater than 650px (tablets) */
	@media screen and (min-width: 650px) {
		.toasts-container {
			margin-top: 6rem;
		}
	}
</style>
