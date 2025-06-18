<script lang="ts">
	import type { Subject } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let subjects: Subject[];
	export let editingIndex: number | null = null;

	const dispatch = createEventDispatcher();

	function handleEdit(index: number) {
		dispatch('edit', index);
	}

	function handleDelete(index: number) {
		if (confirm('¿Seguro que deseas eliminar esta materia?')) {
			dispatch('delete', index);
		}
	}
</script>

<div class="mt-6">
	<h2 class="mb-2 text-xl font-semibold">Materias registradas</h2>
	<ul class="space-y-2 text-sm">
		{#each subjects as s, i}
			<li class="{editingIndex === i ? 'bg-yellow-100' : ''} rounded p-2">
				{s.name} - {s.day}
				{s.startTime} a {s.endTime}
				<button
					on:click={() => handleEdit(i)}
					class="mr-2 rounded bg-yellow-400 px-2 py-1 text-xs text-white hover:bg-yellow-500"
					disabled={editingIndex !== null && editingIndex !== i}
				>
					Editar
				</button>
				<button
					on:click={() => handleDelete(i)}
					class="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
					disabled={editingIndex !== null}
				>
					Eliminar
				</button>
			</li>
		{/each}
	</ul>
</div>
