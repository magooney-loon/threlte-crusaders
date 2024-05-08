<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.pcss';
	onMount(() => {
		const disableContextMenu = (event: { preventDefault: () => any; }) => event.preventDefault();
		window.addEventListener('contextmenu', disableContextMenu);

		return () => {
			window.removeEventListener('contextmenu', disableContextMenu);
		};
	});
</script>

<slot />

<style>
	:root {
		cursor: url('/cursor.png'), default;
	}
</style>