<script lang="ts">
	import { selectedWorld } from '$lib/stores/mapStore';
	import { GLTF, HTML, Float } from '@threlte/extras';
</script>

<HTML center transform position.y={-50} scale={50}
	><button on:click={(e) => e.stopPropagation()} on:click={() => selectedWorld.set('homeWorld')}
		>GO BACK</button
	></HTML
>
<Float floatIntensity={5} speed={1} rotationIntensity={0.2} rotationSpeed={0.9}>
	<GLTF
		url="/worldAzimuth/scenery/scene.gltf"
		position={[-90, 0, 90]}
		rotation={[0, 0 - 0.5, 0]}
		scale={1}
	/></Float
>
