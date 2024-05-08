<script lang="ts">
	import { useThrelte, useTask } from '@threlte/core';
	import { PerfMonitor } from '@threlte/extras';
	import { onMount } from 'svelte';
	import Stats from 'three/addons/libs/stats.module.js';
	////////////////////////////////////////////////////////// STATS
	let statsFPS = new Stats();
	let statsMS = new Stats();
	let statsMB = new Stats();

	statsFPS.showPanel(0); // 0: fps
	statsMS.showPanel(1); // 1: ms
	statsMB.showPanel(2); // 2: mb

	const { renderer } = useThrelte();

	useTask(() => {
		if (!renderer) return;

		statsFPS.begin();
		statsMS.begin();
		statsMB.begin();

		statsFPS.end();
		statsMS.end();
		statsMB.end();
	});

	onMount(() => {
		document.body.appendChild(statsFPS.dom);
		document.body.appendChild(statsMS.dom);
		document.body.appendChild(statsMB.dom);

		statsFPS.dom.style.cssText = 'position:fixed;top:0;left:calc(100% - 240px);';
		statsMS.dom.style.cssText = 'position:fixed;top:0;left:calc(100% - 160px);';
		statsMB.dom.style.cssText = 'position:fixed;top:0;left:calc(100% - 80px);';
	});
</script>

<PerfMonitor anchorX={'left'} logsPerSecond={30} />
