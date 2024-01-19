<script lang="ts">
	import { goto } from '$app/navigation';
	import ServiceConnector from '$lib/components/ServiceConnector.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';

	let service_connections:  = {
		connected: false,
		dropbox: '',
		discord: '',
		google: '',
		photos: '',
		instagram: ''
	};

	function connectSteam() {
		console.log('Steam');
	}

	function connectDiscord() {
		console.log('Discord');
		modalStore.trigger(discordModal);
	}

	function connectGoogle() {
		console.log('Google');
		modalStore.trigger(googleModal);
	}

	function connectPhotos() {
		console.log('Photos');
		modalStore.trigger(photosModal);
	}

	function connectInstagram() {
		console.log('Instagram');
		modalStore.trigger(instagramModal);
	}

	const modalStore = getModalStore();

	const photosModal: ModalSettings = {
		type: 'prompt',
		// Data
		title: 'Enter Dropbox Folder Name',
		body: 'Provide a valid Dropbox Folder Name where your photos are stored.',
		// Populates the input value and attributes
		value: '',
		valueAttr: { type: 'text', minlength: 3, required: true },
		// Returns the updated response value
		response: (r: string) => {
			console.log('response:', r);
			service_connections.photos = r;
			service_connections.connected = true;
		}
	};

	const googleModal: ModalSettings = {
		type: 'prompt',
		// Data
		title: 'Enter Dropbox Folder Name',
		body: 'Provide a valid Dropbox Folder Name where your google takeout is stored. To download your google takeout, visit https://takeout.google.com/settings/takeout',
		// Populates the input value and attributes
		value: '',
		valueAttr: { type: 'text', minlength: 3, required: true },
		// Returns the updated response value
		response: (r: string) => {
			console.log('response:', r);
			service_connections.google = r;
			service_connections.connected = true;
		}
	};

	const discordModal: ModalSettings = {
		type: 'prompt',
		// Data
		title: 'Enter Dropbox Folder Name',
		body: 'Provide a valid Dropbox Folder Name where your discord data zip is stored. To generate your discord data zip, visit https://discord.com/settings/privacy',
		// Populates the input value and attributes
		value: '',
		valueAttr: { type: 'text', minlength: 3, required: true },
		// Returns the updated response value
		response: (r: string) => {
			console.log('response:', r);
			service_connections.discord = r;
			service_connections.connected = true;
		}
	};

	const instagramModal: ModalSettings = {
		type: 'prompt',
		// Data
		title: 'Enter Dropbox Folder Name',
		body: 'Provide a valid Dropbox Folder Name where your instagram data zip is stored. To generate your instagram data zip, visit https://www.instagram.com/download/request/',
		// Populates the input value and attributes
		value: '',
		valueAttr: { type: 'text', minlength: 3, required: true },
		// Returns the updated response value
		response: (r: string) => {
			console.log('response:', r);
			service_connections.instagram = r;
			service_connections.connected = true;
		}
	};

	function onGenerate() {
		window.sessionStorage.setItem('service_connections', JSON.stringify(service_connections));
		console.log('Generate');
		goto('/my-rewind');
	}
</script>

<div class="main dark h-screen">
	<div class="card service-connection dark">
		<h3 class="h3 card-header">Connect Services</h3>
		<p class="card-body">Connect your services to generate your REWIND.</p>
		<input
			type="text"
			class="input rounded-lg"
			placeholder="Dropbox Token"
			bind:value={service_connections.dropbox}
		/>

		<ServiceConnector
			onClick={connectDiscord}
			service="Discord"
			iconId="mdi:discord"
			inputed={service_connections.discord != ''}
		></ServiceConnector>
		<ServiceConnector
			onClick={connectGoogle}
			service="Google"
			iconId="mdi:google"
			inputed={service_connections.google != ''}
		></ServiceConnector>
		<ServiceConnector
			onClick={connectPhotos}
			service="Photos"
			iconId="mdi:camera"
			inputed={service_connections.photos != ''}
		></ServiceConnector>
		<ServiceConnector
			onClick={connectInstagram}
			service="Instagram"
			iconId="mdi:instagram"
			inputed={service_connections.instagram != ''}
		></ServiceConnector>

		<button
			class="btn mt-5 h-14 rounded-lg w-full variant-filled w-100 generate-button"
			disabled={!service_connections.connected}
			on:click={onGenerate}>Generate</button
		>
	</div>
</div>

<style>
	div.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.service-connection {
		border-radius: 0.5rem;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
		padding: 2rem;
		width: 100%;
		max-width: 30rem;
		height: 60%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;

		gap: 1rem;
	}

	.generate-button {
		justify-self: flex-end;
	}
</style>
