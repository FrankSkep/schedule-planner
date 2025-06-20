<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import type { Subject } from '$lib/types';

	export let subject: Subject = { name: '', day: 'Lunes', startTime: '07:00', endTime: '08:00' };
	export let editIndex: number | null = null;
	export let message: string = '';

	const dispatch = createEventDispatcher();

	const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
	const hours = Array.from({ length: 16 }, (_, i) => `${(i + 7).toString().padStart(2, '0')}:00`);

	function submitForm() {
		dispatch('submit', { subject, editIndex });
	}

	function cancelEdit() {
		dispatch('cancelEdit');
	}
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
	transition:fade
>
	<div
		class="relative max-w-md min-w-[340px] rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl"
		transition:scale={{ duration: 250 }}
	>
		<button
			class="absolute top-3 right-3 text-gray-400 transition-colors hover:text-red-500"
			on:click={() => dispatch('close')}
			aria-label="Cerrar"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
		<form on:submit|preventDefault={submitForm} class="space-y-4">
			{#if editIndex !== null}
				<div class="mb-2 flex items-center gap-2 font-semibold text-yellow-700">
					<span>✏️ Editando: {subject.name}</span>
				</div>
			{/if}
			{#if message}
				<p class="mb-2 font-semibold text-red-600">{message}</p>
			{/if}
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<label>
					<span class="block font-semibold text-gray-700">Nombre de la materia</span>
					<input
						bind:value={subject.name}
						required
						class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow transition focus:border-blue-400 focus:outline-none"
					/>
				</label>
				<label>
					<span class="block font-semibold text-gray-700">Día</span>
					<select
						bind:value={subject.day}
						class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow transition focus:border-blue-400 focus:outline-none"
					>
						{#each days as d}
							<option>{d}</option>
						{/each}
					</select>
				</label>
				<label>
					<span class="block font-semibold text-gray-700">Hora inicio</span>
					<select
						bind:value={subject.startTime}
						class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow transition focus:border-blue-400 focus:outline-none"
					>
						{#each hours as h}
							<option>{h}</option>
						{/each}
					</select>
				</label>
				<label>
					<span class="block font-semibold text-gray-700">Hora fin</span>
					<select
						bind:value={subject.endTime}
						class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow transition focus:border-blue-400 focus:outline-none"
					>
						{#each hours as h}
							<option>{h}</option>
						{/each}
					</select>
				</label>
			</div>
			<div class="flex justify-end gap-3 pt-3">
				<button
					type="submit"
					class="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
				>
					Guardar
				</button>
				<button
					type="button"
					on:click={editIndex !== null ? () => dispatch('cancelEdit') : () => dispatch('close')}
					class="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow transition hover:bg-gray-300"
				>
					Cancelar
				</button>
			</div>
		</form>
	</div>
</div>
