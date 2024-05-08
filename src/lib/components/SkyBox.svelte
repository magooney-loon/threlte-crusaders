<script lang="ts">
	import { cycle, rotationY } from '$lib/stores/mapStore';
	import { T } from '@threlte/core';
	import { Sky, Float, Stars, GLTF, OrbitControls } from '@threlte/extras';
	import { onMount } from 'svelte';

	///////////////////////////////////////////////////////// SKYBOX
	let cycleStartTime = Date.now();
	let azimuth = 180;
	let elevation = 2;
	let cycleProgress: number;
	let starsOpacity: number = 0;
	const dawnApproach = -2.7; // When dawn starts, stars begin to fade out
	const daylightStart = -2; // When daylight is in full effect, stars are not visible
	const depth = 10;

	function updateSky() {
		const cycleLength = 10 * 60 * 1000;
		const elapsedTime = Date.now() - cycleStartTime;

		cycleProgress = (elapsedTime % cycleLength) / cycleLength; // [0, 1]

		if (cycleProgress <= 0.5) {
			elevation = cycleProgress * 2 * (0.16 - -2.7) + -2.7;
			starsOpacity = elevation < -2 ? (elevation + 2.7) / (-2 + 2.7) : 0;
		} else {
			elevation = (1 - cycleProgress) * 2 * (0.16 - -2.7) + -2.7;
			starsOpacity = elevation < -2 ? (elevation + 2.7) / (-2 + 2.7) : 0;
			cycle.set('Day');
		}

		// Adjust starsOpacity based on elevation
		if (elevation <= dawnApproach) {
			// Full night, stars fully visible
			starsOpacity = 1;
			cycle.set('Night');
		} else if (elevation > dawnApproach && elevation < daylightStart) {
			// Dawn is approaching, start fading out stars
			// Normalize elevation within transition range for a smooth opacity gradient
			cycle.set('Night');
			starsOpacity = 1 - (elevation - dawnApproach) / (daylightStart - dawnApproach);
		} else {
			// Daylight, stars completely faded
			starsOpacity = 0;
			cycle.set('Day');
		}

		requestAnimationFrame(updateSky);
	}

	onMount(updateSky);
</script>

<T.PerspectiveCamera
	makeDefault
	position={[0, 90, 180]}
	fov={60}
	near={1}
	far={1200}
	focus={1}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
	><OrbitControls
		screenSpacePanning={false}
		maxTargetRadius={360}
		enableDamping
		enableZoom
		minDistance={30}
		maxDistance={300}
		minPolarAngle={Math.PI / 6}
		maxPolarAngle={Math.PI / 2}
		minAzimuthAngle={-Math.PI / 4}
		maxAzimuthAngle={Math.PI / 4}
		zoomSpeed={1}
	/></T.PerspectiveCamera
><GLTF
	useDraco
	url="/mainMenu/cloud/scene-transformed.glb"
	scale={[900, -200, -700]}
	rotation={[0, -$rotationY, 0.0001]}
/>
<Sky
	{elevation}
	{azimuth}
	mieCoefficient={0.002}
	mieDirectionalG={0.98}
	rayleigh={4}
	turbidity={10}
/>
<Float floatIntensity={9} rotationIntensity={5} rotationSpeed={0.1}>
	<Stars count={360} opacity={starsOpacity} {depth} fade={true} factor={5} speed={2.5} />
</Float>
<Float floatIntensity={9} rotationIntensity={5} rotationSpeed={0.08}>
	<Stars count={720} opacity={starsOpacity} {depth} fade={true} factor={2} speed={4.5} />
</Float>
