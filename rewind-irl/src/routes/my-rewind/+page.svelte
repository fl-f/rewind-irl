<script lang="ts">
	import { onMount } from 'svelte';
	import animation from '../animation';
	import { getAccount, init, listFolder } from '$lib/dropbox';
	import { blankRewind, type Rewind } from '$lib/rewind';
	import { DiscordPackage } from '$lib/discord';
	import type { files } from 'dropbox';
	import { PhotosFolder } from '$lib/photos';
	import { MetaDataDownload } from '$lib/meta';
	import { GoogleTakeout } from '$lib/google';

	let tokens = [];
	let links = [];
	let loading = true;
	let popup = true;

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

	let rewind: Rewind = blankRewind();

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
		loading = true;
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

			let folder = await getRewindFolder();

			if (folder) {
				rewind.photos = await PhotosFolder.getPhotosRewindData(
					(await getAppFolder(
						folder.path_lower as string,
						'Photos',
						'photos'
					)) as files.FolderMetadataReference
				);

				rewind.discord = await DiscordPackage.getDiscordRewindData(
					(await getAppFolder(
						folder.path_lower as string,
						'Discord',
						'discord'
					)) as files.FolderMetadataReference
				);

				rewind.instagram = await MetaDataDownload.getInstagramRewindData(
					(await getAppFolder(
						folder.path_lower as string,
						'Instagram',
						'instagram'
					)) as files.FolderMetadataReference
				);

				rewind.youtube = await GoogleTakeout.getYoutubeRewindData(
					(await getAppFolder(
						folder.path_lower as string,
						'Google',
						'google'
					)) as files.FolderMetadataReference
				);

				console.log(rewind);
			} else {
				throw new Error('RewindIRL folder not found');
			}
			loading = false;
		}
	});
</script>

<!-- Your component's markup goes here -->

<div>
	{#if popup}
		<div
			class="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50"
			style="background-color: rgba(0, 0, 0, 0.5); backdrop-filter: blur(5px);"
		>
			<h2 class="text-5xl font-bold text-center">Generating Your Rewind!</h2>
			<a
				href="http://localhost:8080/"
				target="_blank"
				class="btn text-3xl font-bold p-3 rounded-lg bg-purple-700 mt-5"
			>
				Play Pong While You Wait!
			</a>
			<button
				class="btn bg-gradient-to-r from-purple-300 to-pink-200 text-transparent bg-clip-text text-3xl font-bold p-5 rounded-lg mt-10"
				disabled={loading}
				on:click={() => {
					popup = false;
				}}
			>
				Continue
			</button>
		</div>
	{/if}

	<div class="w-full flex flex-col items-center justify-center h-screen gap-10">
		<div
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
			<h2 class="text-5xl font-bold text-center">Your personal</h2>
			<h1
				class="text-7xl font-bold text-center rewind-text bg-gradient-to-r from-purple-300 to-pink-200 text-transparent bg-clip-text"
			>
				Rewind
			</h1>
		</div>
		<div
			use:animation={{
				scrollTrigger: null,
				children: true,
				type: 'to',
				duration: 2,
				ease: 'power3.out',
				x: (i) => -110,
				y: (i) => (i % 2 === 0 ? -10 : 0),

				opacity: 1.0,

				stagger: 0
			}}
			class="flex flex-row items-center justify-center gap-5"
		></div>
	</div>

	<div class=" flex flex-col items-center justify-center">
		{#if rewind.photos}
			<div class="flex flex-col items-center justify-center">
				<h2 class="text-7xl font-bold text-center photos-section mb-32">Photos</h2>
				<div
					class="flex flex-row items-center justify-center gap-5"
					use:animation={{
						scrollTrigger: null,
						children: true,
						type: 'to',
						yoyo: true,
						duration: 1.5,
						ease: 'power3.out',
						y: (i) => (i % 2 === 0 ? -60 : 20),
						x: (i) => (i % 2 === 0 ? -3 : 3),
						opacity: 1.0,
						stagger: 0.2,
						loop: true,
						repeat: -1
					}}
				>
					{#each rewind.photos.photos as photo}
						<div class="flex flex-col shrink-0 text-center gap-5 mb-16">
							<img
								class="rounded-lg h-80 w-80 aspect-square scroll-image"
								src={photo.file}
								alt={photo.name}
							/>
							<h3 class="h2">
								{#if photo.date}
									{photo.date.toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								{/if}
							</h3>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<div class=" flex flex-col items-center justify-center">
		{#if rewind.discord}
			<div class="flex flex-col items-center justify-center">
				<h2 class="text-7xl font-bold text-center discord-section mb-24">Discord</h2>
				<div class="flex flex-col items-center justify-center gap-5 w-full">
					<div class="flex flex-row items-center jusitfy-center gap-5">
						<div class="card p-5 grow-1">
							<div class="card-header text-center">
								<h1 class="h1">
									<span
										class="bg-gradient-to-r from-purple-300 to-pink-200 text-transparent bg-clip-text"
										>{rewind.discord.messages.number}</span
									> Messages
								</h1>
							</div>
							<div class="card-body text-center">
								<h3 class="h3">Sent in Discord servers and DMs</h3>
							</div>
						</div>

						<div class="card p-5 grow-1">
							<div class="card-header text-center">
								<h1 class="h1">
									<span
										class="bg-gradient-to-r from-purple-300 to-pink-200 text-transparent bg-clip-text"
										>{rewind.discord.messages.histogram.number}</span
									> Words
								</h1>
							</div>
							<div class="card-body text-center">
								<h3 class="h3">Words Written</h3>
							</div>
						</div>
						<div class="card p-5 grow-1">
							<div class="card-header text-center">
								<h1 class="h1">
									<span
										class="bg-gradient-to-r from-purple-300 to-pink-200 text-transparent bg-clip-text"
										>{rewind.discord.channels.number}</span
									> Servers
								</h1>
							</div>
							<div class="card-body text-center">
								<h3 class="h3">Joined and Interacted with</h3>
							</div>
						</div>
					</div>

					<h2 class="h2">Your Most Common Words</h2>
					<div
						class="flex flex-row items-center justify-center gap-5"
						use:animation={{
							scrollTrigger: null,
							children: true,
							type: 'to',

							duration: 20,
							ease: 'linear',
							x: -1000,
							opacity: 1.0,

							repeat: -1
						}}
					>
						{#each rewind.discord.messages.histogram.histogram.slice(0, 200) as word}
							<div class="card p-5 grow-1">
								<div class="card-header text-center">
									<h1 class="h1">
										{word.word}
										<span
											class="bg-gradient-to-r from-purple-300 to-pink-200 text-transparent bg-clip-text"
											>{word.frequency}</span
										>
									</h1>
								</div>
								<div class="card-body text-center">
									<h3 class="h3">Times Used</h3>
								</div>
							</div>
						{/each}
					</div>
					<h2 class="h2">Your Servers</h2>

					<div
						class="flex flex-row items-center justify-end gap-5 h-32"
						use:animation={{
							scrollTrigger: null,
							children: true,
							type: 'to',

							duration: 10,
							ease: 'linear',
							x: -300,
							opacity: 1.0,

							repeat: -1
						}}
					>
						{#each rewind.discord.channels.channels as channel}
							<div class="card p-1 flex flex-col shrink-0 text-center gap-5 p-3">
								<h1 class="h1">
									{channel.name}
								</h1>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>

	<div class=" flex flex-col items-center justify-center">
		{#if rewind.instagram}
			<div class="flex flex-col items-center justify-center">
				<div class="h-56 flex flex-row items-center justify-center w-full">
					<div class="flex flex-row items-center justify-center gap-5">
						<h2 class="text-7xl font-bold text-center discord-section mb-5">Instagram</h2>
						<img
							class="aspect-square rounded-full w-24 h-24 border-4 border-white -translate-y-3"
							src={rewind.instagram.profile_picture}
							alt=""
						/>
					</div>
				</div>
				<div
					class="flex flex-row items-end justify-end gap-5"
					use:animation={{
						scrollTrigger: null,
						children: true,
						type: 'to',

						duration: 40,
						ease: 'linear',
						x: 300,
						opacity: 1.0,

						repeat: -1
					}}
				>
					{#each rewind.instagram.posts as post}
						<div class="card p-1 flex flex-col shrink-0 text-center gap-5">
							<img
								class="rounded-lg h-80 w-80 aspect-square scroll-image"
								src={post.file}
								alt={post.file}
							/>
							<h3 class="h2">
								{#if post.date}
									{post.date.toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long'
									})}
								{/if}
							</h3>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<div class=" flex flex-col items-center justify-center">
		{#if rewind.youtube}
			<div class="flex flex-col items-center justify-center">
				<div class="h-56 flex flex-row items-center justify-center w-full">
					<div class="flex flex-row items-center justify-center gap-5">
						<h2 class="text-7xl font-bold text-center discord-section mb-5">Youtube</h2>
					</div>
				</div>

				<div class="card p-5 grow-1">
					<div class="card-header text-center">
						<h3 class="h3">Subscribed To</h3>
						<h1 class="h1">
							<span
								class="bg-gradient-to-r from-purple-300 to-pink-200 text-transparent bg-clip-text"
								>{rewind.youtube.subscriptions.amount}</span
							> Channels
						</h1>
					</div>
					<div class="card-body text-center">
						<h3 class="h3">On Youtube</h3>
					</div>
				</div>
				<div
					class="flex flex-row items-center justify-end gap-5 h-32"
					use:animation={{
						scrollTrigger: null,
						children: true,
						type: 'to',

						duration: 40,
						ease: 'linear',
						x: -100,
						opacity: 1.0,

						repeat: -1
					}}
				>
					{#each rewind.youtube.subscriptions.subscriptions as channel}
						<div class="card p-1 flex flex-col shrink-0 text-center gap-5 p-3">
							<a href={channel.url} class="h1">
								{channel.name}
							</a>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	img.scroll-image {
		animation: scroll 10s linear infinite;
		object-fit: cover;
	}
</style>
