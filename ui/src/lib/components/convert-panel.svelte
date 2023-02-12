<script lang="ts">
	import socket from 'socket.io-client';

	import logo_xptl from '$lib/assets/images/logo-xptl.png';
	import logo_neb from '$lib/assets/images/logo-neb.png';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import WalletController from 'lamden_wallet_controller';
	import { connection_requst } from '$lib/ts/wallet.config';

	let lwc: WalletController;
	let check_wallet_installed_interval: NodeJS.Timer;

	let wallet_installed = false;
	let wallet_connected = false;
	let wallet_locked = true;
	let approved_amount = 0;
	let connection;
	let converting = false

	// wallet info
	let vk = '';
	let neb_balance: number;
	let xptl_balance: number;
	let neb_burn_value: number = 0;
	// let xptl_receive_value: number;
	$: xptl_receive_value = parseBalanceValue(String((neb_burn_value || 0) / 10));

	onMount(() => {
		if (browser) {
			initWallet();
			initWsConnection();
		}
	});

	async function getApprovalBalance(vk: string) {
		try {
			const url = `https://rocketswap.exchange/api/proxy_req?action_name=get_balance_value&args=con_nebula&args=${vk}:con_portal`;
			const res = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
					// 'access-control-allow-origin': '*'
				}
			});
			const data = await res.json();
			console.log({ data });
			return data;
		} catch (err) {
			console.log({ err });
		}
	}

	function initWsConnection() {
		connection = socket.connect('https://rocketswap.exchange/');
		connection.on('connect', () => {
			console.log('connected');
		});
	}

	function handleWalletInfo(e) {
		console.log({ handleWalletInfo: e });
		const network_approved = e.approvals?.[connection_requst['networkName']];
		const network_type_approved =
			e.approvals?.[connection_requst['networkName']][connection_requst['networkType']];
		if (network_approved && network_type_approved) {
			wallet_connected = true;
		}
		if (e.setup && !e.locked) {
			wallet_locked = false;
		}
		if (e.locked) {
			wallet_locked = true;
		}
		if (e.wallets && e.wallets[0]) {
			vk = e.wallets[0];
			handleWalletVk(vk);
		}
		if (e.errors && e.errors[0] === 'Lamden Vault is Locked') wallet_locked = true;
		if (
			e.errors &&
			e.errors[0] ===
				"You must be an authorized dApp to send this message type. Send 'lamdenWalletConnect' event first to authorize."
		)
			wallet_connected = false;
	}

	// function joinRoom(room: string) {
	// 	connection.emit('join_room', room);
	// }

	async function handleWalletVk(vk: string) {
		console.log('handleWalletVk', vk);
		console.log(connection.connected);
		connection.emit('join_room', `balance_feed:${vk}`);
		// joinRoom(`balance_feed:${vk}`);

		connection.on(`balance_update:${vk}`, (balance_update) => {
			const { payload } = balance_update;
			const { balances } = payload;

			neb_balance = parseBalanceValue(balances['con_nebula']);
			xptl_balance = parseBalanceValue(balances['con_portal']);
		});

		connection.on(`balance_list:${vk}`, (balance_list) => {
			console.log({ balance_list });
			const { balances } = balance_list;
			neb_balance = parseBalanceValue(balances['con_nebula']);
			xptl_balance = parseBalanceValue(balances['con_portal']);
		});

		approved_amount = await getApprovalBalance(vk);
	}

	function parseBalanceValue(balance: string | undefined) {
		if (balance === undefined) return 0;
		return Number(Number(balance).toFixed(2));
	}

	function handleWalletInstalled(e) {
		wallet_installed = e;
	}

	function handleConnectClicked() {
		console.log('handleConnectClicked');
		lwc.sendConnection(connection_requst);
	}

	function checkForIntstalledWallet() {
		console.log('checkForIntstalledWalled');
		lwc.walletIsInstalled().then((res) => {
			clearInterval(check_wallet_installed_interval);
			handleWalletInstalled(res);
		});
	}

	function initWallet() {
		lwc = new WalletController();

		lwc.events.on('newInfo', handleWalletInfo);
		lwc.events.on('installed', handleWalletInstalled);

		checkForIntstalledWallet();
		check_wallet_installed_interval = setInterval(checkForIntstalledWallet, 1500);
	}

	function burnMax() {
		neb_burn_value = neb_balance;
	}

	/**
	 * Name	Type	Description	
		tx	Object	A connection request object	 
		tx.networkType	string	Which Lamden network the tx is for (Mainnet or testnet)	 
		tx.networkName	string	Name of a Lamden Network, leave blank for legacy Lamden, use "arko" for the new Lamden Network	Optional
		tx.stampLimit	string	The max Stamps this tx is allowed to use. Cannot be more but can be less.	 
		tx.methodName	string	The method on your approved smart contract to call	 
		tx.kwargs	Object	A keyword object to supply arguments to your method	 
		callback	Function	A function that will called and passed the tx results.	Optional
	*/
	const base_tx = {
		networkType: 'mainnet',
		networkName: 'arko',
		stampLimit: 100
	};

	function handleApproveClicked() {
		const approve_tx = {
			...base_tx,
			methodName: 'approve',
			contractName: 'con_nebula',
			kwargs: {
				amount: { __fixed__: neb_burn_value - approved_amount }
			},
			callback: (res) => {
				console.log({ res });
			}
		};
		lwc.sendTransaction(approve_tx);
	}

	function handleBurnClicked() {
		const burn_tx = {
			...base_tx,
			methodName: 'swap_neb',
			contractName: 'con_portal',
			kwargs: {
				amount: { __fixed__: neb_burn_value }
			}
		};
		converting = true
		lwc.sendTransaction(burn_tx, (res) => {
			converting = false
			console.log({ res });
		});
	}
</script>

<div class="convert-cont">
	<div class="action-heading">Burn</div>
	<div class="balance">
		{#if wallet_connected && !wallet_locked}
			<span> balance : {neb_balance} </span>
		{/if}
	</div>
	<div class="input-cont">
		<div class="token-meta-cont">
			<div class="token-logo-cont">
				<img src={logo_neb} alt="" />
			</div>
			<div class="token-details-cont">
				<div class="token-name">Nebula</div>
				<div class="token-symbol">$NEB</div>
			</div>
			<div class="input-container">
				<input bind:value={neb_burn_value} type="text" placeholder="0" />
			</div>
			<div class="max-btn-cont">
				{#if wallet_connected && !wallet_locked}
					<button on:click={burnMax} class="btn-small btn-rounded button btn-secondary ml-5"
						>max</button
					>
				{/if}
			</div>
		</div>
	</div>
	<div class="action-heading mt-10">Receive</div>
	<div class="balance">
		{#if wallet_connected && !wallet_locked}
			<span> balance : {xptl_balance} </span>
		{/if}
	</div>
	<div class="input-cont">
		<div class="token-meta-cont">
			<div class="token-logo-cont">
				<img src={logo_xptl} alt="" />
			</div>
			<div class="token-details-cont">
				<div class="token-name">Portal</div>
				<div class="token-symbol">$XPTL</div>
			</div>
			<div class="input-container">
				<input
					style="pointer-events:none; user-select:none;"
					bind:value={xptl_receive_value}
					type="text"
					placeholder="0.00"
				/>
			</div>
			<div class="max-btn-cont" />
		</div>
	</div>
	<div class="button-cont">
		{#if !wallet_installed}
			<button class="button btn-primary btn-rounded btn-wide btn-outline">install wallet</button>
			<div class="explanation">
				You must install the
				<a
					href="https://chrome.google.com/webstore/detail/lamden-vault-browser-exte/fhfffofbcgbjjojdnpcfompojdjjhdim"
					target="_blank"
					rel="noreferrer">Lamden Vault</a
				> to use this feature.
			</div>
			<!-- <button class="button btn-primary btn-rounded btn-wide btn-large">Convert</button> -->
		{:else if !wallet_connected}
			<button
				on:click={handleConnectClicked}
				class="button btn-primary btn-rounded btn-wide btn-outline ">connect wallet</button
			>
			<div class="explanation">Please connect your wallet.</div>
		{:else if wallet_locked}
			<button class="button btn-primary btn-rounded btn-wide btn-outline ">Wallet Locked</button>
			<div class="explanation">Unlock your wallet</div>
		{:else if neb_burn_value > approved_amount || approved_amount === 0}
			<!-- <button class="button btn-primary btn-rounded btn-wide btn-outline ">Approve</button> -->
			<button
				disabled={neb_burn_value === 0}
				class="button btn-secondary btn-rounded btn-wide btn-outline ">Approve</button
			>
			<div class="explanation">
				Approve {neb_burn_value - approved_amount} $NEB
			</div>
		{:else}
			<button disabled={converting} on:click={handleBurnClicked} class="button btn-secondary btn-rounded btn-wide"
				>{converting ? 'converting ... ' : "convert"}</button
			>
			<div class="explanation">Burn $NEB and receive $XPTL</div>
		{/if}
	</div>
</div>

<style>
	.explanation {
		/* font-size: 0.8rem; */
		/* color: #999; */
		height: 1rem;
		margin-top: 1rem;
	}

	.explanation a {
		text-decoration: underline !important;
	}

	.button-cont {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.max-btn-cont {
		/* width: 140px !important; */
		min-width: 100px !important;
		/* width: 140px; */
	}

	.balance {
		padding-right: 120px;
		display: flex;
		flex-direction: row-reverse;
		width: 100%;
		letter-spacing: 0.3rem;
		min-height: 1.5vh;
	}
	.input-container {
		margin-left: 1rem;
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		/* justify-content: center; */
		/* width: rem; */
		height: 7rem;
		border: 1px solid #ecb75c;
		border-radius: 5px;
		padding: 0 1rem;
	}

	.input-container input {
		height: 100%;
		width: 100%;
		text-align: right;
		/* padding: rem; */
		background-color: transparent;
		font-family: Poppins;
		font-size: 1.7rem;
		padding-top: 0.9rem;
		padding-bottom: 0.3rem;
		letter-spacing: 0.4rem;
	}

	input:focus {
		outline: none;
	}

	input::placeholder {
		color: #c6b594;
	}

	.token-name {
		font-size: 1.3rem;
		font-weight: 600;
	}

	.token-symbol {
		font-size: 1.3rem;
		font-weight: 300;
	}
	.token-details-cont {
		letter-spacing: 0.4rem;
		display: flex;
		flex-direction: column;
		width: 140px;
	}
	.token-logo-cont {
		width: 5rem;
		margin-right: 1rem;
	}

	.token-logo-cont img {
		width: 100%;
		height: 100%;
	}
	.token-meta-cont {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.input-cont {
		display: flex;
		flex-direction: row;
	}

	.action-heading {
		font-size: 1.3rem;
		font-weight: 400;
		/* margin-bottom: rem; */
		text-decoration: underline;
		letter-spacing: 0.25rem;
	}

	.convert-cont {
		display: flex;
		flex-direction: column;
		border: 1px solid #ecb75c;
		border-radius: 10px;
		padding: 1.5rem 2rem;
		margin: 0 auto;
		/* margin-bottom: 2vh; */
	}

	@media (max-width: 768px) {
		.convert-cont {
			padding: 1.5rem 1rem;
		}
		.balance {
			padding-right: 0;
		}
		.input-container {
			margin-left: 0;
		}
		.token-details-cont {
			letter-spacing: 0.2rem;
		}
		.token-name {
			font-size: 1.1rem;
		}
		.token-symbol {
			font-size: 1.1rem;
		}
		.token-logo-cont {
			width: 4rem;
		}
		.action-heading {
			font-size: 1.1rem;
		}
		.input-container input {
			font-size: 1.5rem;
		}
		.explanation {
			font-size: 0.8rem;
		}
	}
</style>
