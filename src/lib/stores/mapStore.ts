import { writable } from 'svelte/store';
export let selectedWorld = writable("homeWorld")
export let isGameMenu = writable(true);
export const cycle = writable("");
export const rotationY = writable(0);
export const positionY = writable(0);