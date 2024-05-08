<script lang="ts">
	import { T } from '@threlte/core';
	import {
		Grid,
		interactivity,
		GLTF,
		Float,
		Text3DGeometry,
		OrbitControls,
		HTML,
		Audio,
		AudioListener
	} from '@threlte/extras';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { cycle, positionY, rotationY, selectedWorld } from '$lib/stores/mapStore';

	///////////////////////////////////////////////////////// MAP/GRID
	let gridSize = 90;
	interactivity();
	/* 
	const cellSize = 9;
	const cellsPerRow = gridSize / cellSize;
	const halfGridSize = gridSize / 2;
	let grassTexture: THREE.Texture;

	onMount(() => {
		const loader = new THREE.TextureLoader();
		loader.load('/textures/grass.webp', (texture) => {
			grassTexture = texture;
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(1, 1);
		});
	});

	let tiles = Array.from({ length: cellsPerRow * cellsPerRow }, (_, index) => {
		const x = (index % cellsPerRow) * cellSize - halfGridSize + cellSize / 2;
		const z = Math.floor(index / cellsPerRow) * cellSize - halfGridSize + cellSize / 2;
		const position: [number, number, number] = [x, 0, z];
		return {
			id: index,
			position,
			hovered: false,
			active: false
		};
	});

	function setHovered(id: number, hovered: boolean) {
		tiles = tiles.map((tile) => ({
			...tile,
			hovered: tile.id === id ? hovered : tile.hovered
		}));
	}

	function setActive(id: number, isActive: boolean) {
		tiles = tiles.map((tile) => (tile.id === id ? { ...tile, active: isActive } : tile));
	}
 */

	///////////////////////////////////////////////////////// DOME/ROTATION

	const rotationSpeed = 0.00001;
	const floatSpeed = 0.005;
	const floatRange = 10;
	onMount(async () => {
		let lastTime = 0;

		function animate(time: number) {
			const deltaTime = time - lastTime;
			lastTime = time;

			rotationY.update((n) => n + rotationSpeed * deltaTime);
			positionY.update((n) => Math.sin(time * 0.01 * floatSpeed) * floatRange);

			requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);
	});

	///////////////////////////////////////////////////////// PERSPECTIVE CAMERA
	/* let cameraPosition: [number, number, number] = [0, 0, 120];
	let baseHeight = 45;
	const movementSpeed = 2;
	const edgeActivationMargin = 50;
	const movementMargin = 90; // Extra margin for movement beyond the grid size
	const maxDistance = 90 / 2 + movementMargin; // Maximum distance from the center

	let movingDirection = { x: 0, z: 0 };

	function updateMovingDirection(clientX: number, clientY: number) {
		movingDirection.x = 0;
		movingDirection.z = 0;

		// Check if near left or right edge
		if (clientX < edgeActivationMargin) movingDirection.x = -1;
		else if (clientX > window.innerWidth - edgeActivationMargin) movingDirection.x = 1;

		// Check if near top or bottom edge
		if (clientY < edgeActivationMargin) movingDirection.z = -1;
		else if (clientY > window.innerHeight - edgeActivationMargin) movingDirection.z = 1;
	}

	function moveCamera() {
		let newX = cameraPosition[0] + movingDirection.x * movementSpeed;
		let newZ = cameraPosition[2] + movingDirection.z * movementSpeed;

		// Constrain newX and newZ to be within the bounds of maxDistance
		newX = Math.max(-maxDistance, Math.min(maxDistance, newX));
		newZ = Math.max(-maxDistance, Math.min(maxDistance, newZ));

		cameraPosition = [newX, baseHeight, newZ];
	}

	function handleMouseMove(event: MouseEvent) {
		updateMovingDirection(event.clientX, event.clientY);
	}

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);
		const intervalId = setInterval(moveCamera, 16);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			clearInterval(intervalId);
		};
	}); */

	const audioPlaying = writable(false);

	let audioRef: Audio;

	function toggleAudio() {
		audioPlaying.update((state) => {
			if (state) {
				audioRef.pause();
			} else {
				audioRef.play();
			}
			return !state;
		});
	}
</script>

<AudioListener />
<Audio bind:this={audioRef} src="/menu_music.opus" autoplay={false} loop volume={1} />

<HTML center transform position.y={-50} scale={50}>
	<button class="text-white/5" on:click={toggleAudio}>{$audioPlaying ? 'Pause' : 'Play'}</button>
</HTML>
<HTML transform position.y={-70} scale={50}><div class="text-white/5">Cycle: {$cycle}</div></HTML>
<Float floatIntensity={5} speed={1} rotationIntensity={0.9} rotationSpeed={0.9}>
	<GLTF
		useDraco
		url="/mainMenu/cloudring/scene-transformed.glb"
		position={[0.001, -25, 0]}
		rotation={[0, 0, 0.001]}
		scale={7}
	/></Float
>
<Float floatIntensity={9} speed={2} rotationIntensity={0.1} rotationSpeed={2.9}>
	<GLTF
		useDraco
		url="/mainMenu/castle/scene-transformed.glb"
		interactive
		on:click={(e) => e.stopPropagation()}
		on:click={() => console.log('Castle clicked')}
		position={[0, -10, 0]}
		rotation={[0.01, $rotationY, 0.01]}
		scale={270}
	/>

	<GLTF
		useDraco
		url="/mainMenu/cross/scene-transformed.glb"
		interactive
		on:click={(e) => e.stopPropagation()}
		on:click={() => console.log('Castle clicked')}
		position={[0, 40, 1]}
		rotation={[0, 0, 0]}
		scale={20}
	/>
</Float>

<T.Group
	position={[40, 0, 0]}
	rotation={[0, $rotationY * 2, 0]}
	scale={1}
	floatIntensity={2}
	speed={3}
	rotationIntensity={0.5}
	rotationSpeed={0.1}
>
	<GLTF
		useDraco
		url="/mainMenu/islandTyrande/scene-transformed.glb"
		position={[0, 5, 0]}
		rotation={[0.01, -1.5, 0.01]}
		scale={18}
	/>
	<T.Mesh scale={0.04} position={[16, 54, 5]} rotation={[0, 3, 0]}>
		<Text3DGeometry
			depth={5}
			bevelEnabled
			bevelSegments={20}
			bevelSize={0.2}
			bevelThickness={0.1}
			text={'HIGH PRIEST'}
		/>
		<T.MeshStandardMaterial color="#ffffff" opacity={0.2} transparent={true} />
	</T.Mesh>
	<GLTF
		useDraco
		url="/mainMenu/tyrande/scene-transformed.glb"
		interactive
		on:click={(e) => e.stopPropagation()}
		on:click={() => console.log('Tyrande clicked')}
		position={[0, 39, 5]}
		rotation={[0.01, 3, 0.01]}
		scale={5}
	/>
	<GLTF
		useDraco
		url="/mainMenu/airbaloon/scene-transformed.glb"
		interactive
		on:click={(e) => e.stopPropagation()}
		on:click={() => console.log('Air baloon clicked')}
		position={[90, -$positionY, 68]}
		rotation={[-0.01, -$rotationY, -0.01]}
		scale={1}
		floatIntensity={2}
		speed={3}
		rotationIntensity={0.5}
		rotationSpeed={0.1}
	/>
</T.Group>

<T.Group
	position={[0, -$positionY * 2, 0]}
	rotation={[0, $rotationY, 0]}
	scale={1}
	floatIntensity={4}
	speed={5}
	rotationIntensity={0.5}
	rotationSpeed={0.2}
>
	<GLTF
		useDraco
		url="/mainMenu/islandCharacters/scene-transformed.glb"
		position={[-60, 15, -40]}
		rotation={[0.01, 0, 0.01]}
		scale={9}
	/>
	<T.Mesh scale={0.02} position={[-71.1, 27.1, -33]} rotation={[0.0001, -0.5, 0.0001]}>
		<Text3DGeometry
			depth={5}
			bevelEnabled
			bevelSegments={20}
			bevelSize={0.2}
			bevelThickness={0.1}
			text={'HUNTER LVL 1'}
		/>
		<T.MeshStandardMaterial color="#00ff00" opacity={0.8} transparent={true} />
	</T.Mesh>
	<GLTF
		useDraco
		url="/mainMenu/nightelf/scene-transformed.glb"
		interactive
		on:click={(e) => e.stopPropagation()}
		on:click={() => console.log('Hunter clicked')}
		position={[-64.1, 15.1, -28]}
		rotation={[0.0001, -0.5, 0.0001]}
		scale={4}
	/>
</T.Group>

<T.Group position={[10, $positionY * 2, 0]} rotation={[0, $rotationY, 0]} scale={1}>
	<GLTF
		useDraco
		url="/mainMenu/islandSylvana/scene-transformed.glb"
		position={[-60, 15, 50]}
		rotation={[0, 1, 0]}
		scale={5}
	/>

	<GLTF
		useDraco
		url="/mainMenu/sylvana/scene-transformed.glb"
		interactive
		on:click={(e) => e.stopPropagation()}
		on:click={() => console.log('Sylvana clicked')}
		position={[-39, 25, 52]}
		rotation={[0, 1, 0]}
		scale={1.05}
	/>

	<GLTF
		useDraco
		url="/mainMenu/steampunkship/scene-transformed.glb"
		interactive
		on:click={(e) => e.stopPropagation()}
		on:click={() => console.log('Punkship clicked')}
		position={[-70, 11, 27]}
		rotation={[0, 1, 0]}
		scale={0.9}
	/>

	<GLTF
		useDraco
		url="/mainMenu/totem/scene-transformed.glb"
		interactive
		on:click={(e) => e.stopPropagation()}
		on:click={() => console.log('Totem clicked')}
		position={[-84.5, 12, 61.5]}
		rotation={[0, -1.5, 0]}
		scale={0.02}
	/>
</T.Group>
<Float floatIntensity={9} speed={5} rotationIntensity={0.9} rotationSpeed={0.9}>
	<GLTF
		useDraco
		url="/mainMenu/resources/scene-transformed.glb"
		interactive
		on:click={(e) => e.stopPropagation()}
		on:click={() => console.log('Resource clicked')}
		position={[-20, 25, 20]}
		rotation={[0, $rotationY, 0]}
		scale={10}
	/>
</Float>
<!-- <Grid
	position.y={-0.001}
	cellColor="#ffffff"
	sectionColor="#111111"
	sectionThickness={0}
	fadeDistance={290}
	cellSize={9}
	gridSize={gridSize}
	backgroundColor="#2f1a1a"
	backgroundOpacity={1}
	fadeStrength={1}
/> -->

<!--{#each tiles as tile (tile.id)}
	{#if grassTexture}
		<T.Mesh
			position={tile.position}
			on:pointerover={() => setHovered(tile.id, true)}
			on:pointerout={() => setHovered(tile.id, false)}
			on:click={() => setActive(tile.id, !tile.active)}
		>
			<T.BoxGeometry args={[cellSize, -0.1, cellSize]} />
			<T.MeshStandardMaterial
				map={grassTexture}
				color={tile.active
					? '#00ff00'
					: tile.hovered
						? '#ff0000'
						: tile.id % 2 === 0
							? '#cccccc'
							: '#aaaaaa'}
			/>
		</T.Mesh>
	{/if}
{/each}-->
<Float floatIntensity={2} speed={1} rotationIntensity={0.9} rotationSpeed={0.2}>
	<GLTF
		useDraco
		url="/mainMenu/gateOpen/scene-transformed.glb"
		interactive
		on:click={(e) => e.stopPropagation()}
		on:click={() => selectedWorld.set('azimuthWorld')}
		position={[220, -95, -380]}
		rotation={[-0.24, 2.22, 1.05]}
		scale={27}
	/>
</Float>

<Float floatIntensity={5} speed={1} rotationIntensity={3} rotationSpeed={0.6}>
	<GLTF
		useDraco
		url="/mainMenu/dreamweaver/scene-transformed.glb"
		interactive
		on:click={(e) => e.stopPropagation()}
		on:click={() => console.log('Dreamweaver clicked')}
		position={[0, -95, 0]}
		rotation={[1, $rotationY, 0]}
		scale={5}
	/>
</Float>

<Float floatIntensity={5} speed={0.1} rotationIntensity={2} rotationSpeed={0.1}>
	<GLTF
		useDraco
		url="/mainMenu/starPortal/scene-transformed.glb"
		interactive
		on:click={(e) => e.stopPropagation()}
		on:click={() => console.log('Star Portal clicked')}
		position={[-420, -205, -380]}
		rotation={[-0.22, $rotationY, 1.02]}
		scale={27}
	/>
</Float>
