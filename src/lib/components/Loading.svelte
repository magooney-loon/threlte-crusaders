<script lang="ts">
	import { useProgress } from '@threlte/extras';
	import { tweened } from 'svelte/motion';
	import { fade, scale } from 'svelte/transition';

	const { active, item, loaded, total, progress } = useProgress();
	const tweenedProgress = tweened($progress, {
		duration: 800
	});
	$: tweenedProgress.set($progress);
</script>

{#if $tweenedProgress < 1}
	<div
		transition:fade|local={{ duration: 800 }}
		class="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 rounded-lg bg-black bg-opacity-80 px-4 py-6 text-white backdrop-blur-md"
	>
		<div class="text-lg font-semibold">Loading progress: {Math.round($tweenedProgress * 100)}%</div>
		{#if $active}
			<div class="text-sm">Currently loading: {$item || 'Calculating...'}</div>
			<div class="text-sm">Loaded: {$loaded} of {$total}</div>
		{:else}
			<div class="text-sm">Preparing assets...</div>
		{/if}
		<div class="w-full bg-gray-700">
			<div
				class="h-2 bg-green-500"
				style:width={$tweenedProgress * 100 + '%'}
				transition:scale={{ duration: 300 }}
			></div>
		</div>
		<div class="absolute inset-x-0 bottom-4 text-center text-xs">
			Please wait..
		</div>
	</div>
{/if}
