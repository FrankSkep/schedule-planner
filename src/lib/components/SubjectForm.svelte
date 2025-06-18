<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Subject } from '$lib/types';

	export let subject: Subject = { name: '', day: 'Lunes', startTime: '07:00', endTime: '08:00' };
	export let editIndex: number | null = null;

	const dispatch = createEventDispatcher();

	const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
	const hours = Array.from({ length: 16 }, (_, i) => `${(i + 7).toString().padStart(2, '0')}:00`);

	function submitForm() {
		dispatch('submit', { subject, editIndex });
	}

	function clear() {
		dispatch('clear');
	}

	function cancelEdit() {
		dispatch('cancelEdit');
	}
</script>

<form
	on:submit|preventDefault={submitForm}
	class="mb-6 space-y-4 rounded-lg bg-white p-6 shadow-md {editIndex !== null
		? 'border-2 border-yellow-400'
		: ''}"
>
	{#if editIndex !== null}
		<div class="mb-2 font-semibold text-yellow-700">
			Editando: {subject.name}
			<button
				type="button"
				on:click={cancelEdit}
				class="ml-4 rounded bg-gray-300 px-2 py-1 text-xs hover:bg-gray-400"
			>
				Cancelar edición
			</button>
		</div>
	{/if}
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<label>
			<span class="block font-semibold">Nombre de la materia</span>
			<input
				bind:value={subject.name}
				required
				class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
			/>
		</label>

		<label>
			<span class="block font-semibold">Día</span>
			<select bind:value={subject.day} class="mt-1 w-full rounded-md border-gray-300 shadow-sm">
				{#each days as d}
					<option>{d}</option>
				{/each}
			</select>
		</label>

		<label>
			<span class="block font-semibold">Hora inicio</span>
			<select
				bind:value={subject.startTime}
				class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
			>
				{#each hours as h}
					<option>{h}</option>
				{/each}
			</select>
		</label>

		<label>
			<span class="block font-semibold">Hora fin</span>
			<select bind:value={subject.endTime} class="mt-1 w-full rounded-md border-gray-300 shadow-sm">
				{#each hours as h}
					<option>{h}</option>
				{/each}
			</select>
		</label>
	</div>

	<div class="flex gap-4 pt-4">
		<button
			type="submit"
			class="cursor-pointer rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
		>
			Guardar
		</button>
		<button
			type="button"
			on:click={clear}
			class="cursor-pointer rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
		>
			Limpiar horario
		</button>
	</div>
</form>
