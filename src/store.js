import {writable} from 'svelte/store';

export let netlifyIdentity = writable();

export let todos = writable([]);