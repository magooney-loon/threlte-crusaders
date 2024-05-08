<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Renderer from './Renderer.svelte';
	import HomeWorld from './Worlds/homeWorld.svelte';
	import Loading from './Loading.svelte';
	import SkyBox from './SkyBox.svelte';
	import Stats from './Stats.svelte';
	import { isGameMenu, selectedWorld } from '$lib/stores/mapStore';
	import GameMenu from './GameMenu.svelte';
	import AzimuthWorld from './Worlds/azimuthWorld.svelte';
</script>

{#if $isGameMenu}
	<GameMenu />
	<Canvas>
		<SkyBox />
		<Renderer />
	</Canvas>
{:else}
	<Loading />
	<Canvas>
		<Stats />
		<SkyBox />
		<Renderer />
		{#if $selectedWorld === 'homeWorld'}
			<HomeWorld />
		{:else if $selectedWorld = 'azimuthWorld'}
			<AzimuthWorld />
		{/if}
	</Canvas>
{/if}
