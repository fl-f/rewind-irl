<script lang="ts">
	import { onMount } from 'svelte';
	import animation from '../animation';
	import { getAccount, init, listFolder } from '$lib/dropbox';
	import { blankRewind, type Rewind } from '$lib/rewind';
	import { DiscordPackage } from '$lib/discord';
	import type { files } from 'dropbox';
	import { PhotosFolder } from '$lib/photos';

	let tokens = [];
	let links = [];

	async function getRewindFolder() {
		return listFolder('')
			.then((files) => {
				for (const file of files.result.entries) {
					if (file.name === 'RewindIRL') {
						return file;
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	let rewind: Rewind = blankRewind(2023);

	async function getAppFolder(root: string, appName: string, intendedName: string) {
		return listFolder(root)
			.then((files) => {
				for (const file of files.result.entries) {
					if (
						file.name == appName ||
						file.name.toLowerCase().includes(intendedName.toLowerCase())
					) {
						return file;
					}
				}

			})
			.catch((error) => {
				console.log(error);
			});
	}

	onMount(async () => {
		// Retrieve data from session storage
		const sessionData = sessionStorage.getItem('service_connections');
		if (sessionData) {
			const serviceConnections: {
				connected: boolean;
				dropbox: string;
				discord: string;
				google: string;
				photos: string;
				instagram: string;
			} = JSON.parse(sessionData);

			init(serviceConnections.dropbox);

			let folder = await getRewindFolder()

			if (folder) {

				//rewind.discord = await DiscordPackage.getDiscordRewindData(
				//	await getAppFolder(folder.path_lower as string, 'Discord', 'discord') as files.FolderMetadataReference
				//);

				rewind.photos = await PhotosFolder.getPhotosRewindData(
					await getAppFolder(folder.path_lower as string, 'Photos', 'photos') as files.FolderMetadataReference
				);
			} else {
				throw new Error('RewindIRL folder not found');
			}

			console.log(await getAccount());
		}
	});
</script>

<!-- Your component's markup goes here -->

<div>
	<div
		class="w-full flex flex-col items-center justify-center h-screen"
		use:animation={{
			scrollTrigger: null,
			children: true,
			type: 'to',
			duration: 2,
			ease: 'power3.out',
			x: (i) => (i % 2 === 0 ? -110 : -20),
			y: (i) => (i % 2 === 0 ? -60 : -20),
			scale: (i) => i * 1.5 + 1,

			opacity: 1.0,

			stagger: 0
		}}
	>
		<h2 class="text-5xl font-bold text-center">Your Rewind</h2>
		<h1
			class="text-7xl font-bold text-center rewind-text bg-gradient-to-r from-purple-300 to-pink-200 text-transparent bg-clip-text"
		>
			2023
		</h1>
	</div>

	<div class=" flex flex-col items-center justify-center h-screen"></div>
</div>

<style>
</style>
