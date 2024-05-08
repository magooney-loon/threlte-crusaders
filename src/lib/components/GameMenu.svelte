<script lang="ts">
	import { isGameMenu } from '$lib/stores/mapStore';

	let buttons = [
		{ id: 'play', label: 'Play Now', action: () => ($isGameMenu = false) },
		{ id: 'settings', label: 'Settings', action: () => console.log('Settings clicked') },
		{ id: 'credits', label: 'Credits', action: () => console.log('Credits clicked') }
		// Add more button configurations here as needed
	];
</script>

<div
	class="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 rounded-lg bg-black/15 px-4 py-6 text-white backdrop-blur-sm"
>
	<img src="/logo.png" alt="Logo" class="mx-auto w-72 animate-pulse" />
	{#each buttons as { id, label, action }}
		<button
			on:click={action}
			class="group relative inline-flex items-center justify-center overflow-hidden rounded-md p-0.5 font-bold transition ease-in-out hover:saturate-200"
		>
			<span
				class="absolute h-full w-full bg-gradient-to-br from-[#05b0ff1e] via-[#0775975b] to-[#35e6ec9a] group-hover:from-[#1b99d35b] group-hover:via-[#116fad6c] group-hover:to-[#4eddd173]"
			></span>
			<span class="duration-400 relative rounded-md bg-black/40 px-6 py-3 group-hover:bg-opacity-0">
				<span class="relative text-white/60">{label}</span>
			</span>
		</button>
	{/each}

	<code class="absolute inset-x-0 bottom-4 animate-pulse text-center text-xs text-white/20">
		developed by team-joint
	</code>
</div>

<style>
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
</style>
