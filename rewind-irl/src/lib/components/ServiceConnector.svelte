<script lang="ts">
	export let service: string;
	export let iconId: string;
	export let onClick: () => void = () => {};
	export let inputed: boolean = false;

	import { getModalStore } from '@skeletonlabs/skeleton';

	
	
</script>

<button
	class="card service-button h-16"
	on:click={onClick}
	class:card-hover={!inputed}
	class:disabled={inputed}
>
	<iconify-icon width="2rem" icon={iconId} class="iconify" data-icon={iconId} data-inline="false"
	></iconify-icon>
	<h4 class="h4">{service}</h4>
	{#if inputed}
		<iconify-icon
			width="2rem"
			icon="mdi:check"
			class="iconify"
			data-icon="mdi:check"
			data-inline="false"
		></iconify-icon>
	{:else}
		<iconify-icon
			width="2rem"
			icon="mdi:close"
			class="iconify"
			data-icon="mdi:close"
			data-inline="false"
		></iconify-icon>
	{/if}
</button>

<style>
	.service-button {
		width: 100%;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		padding: 0 1rem;
		gap: 1rem;
		transition: 0.1s;
	}

	.iconify {
		justify-self: end;
	}

	.disabled {
		pointer-events: none;
		opacity: 0.5;
	}
</style>
