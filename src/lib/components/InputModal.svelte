<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	export let show = false;
	export let label = '';
	export let defaultValue = '';
	export let onSubmit: (value: string) => void;
	export let onCancel: () => void;

	let value = defaultValue;

	$: if (show) value = defaultValue;
</script>

{#if show}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
		transition:fade
	>
		<form
			class="relative max-w-md min-w-[340px] rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl"
			transition:scale={{ duration: 250 }}
			on:submit|preventDefault={() => onSubmit(value.trim())}
		>
			<button
				class="absolute top-3 right-3 text-gray-400 transition-colors hover:text-red-500"
				type="button"
				on:click={onCancel}
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
			<label for="input-modal-field" class="mb-4 block font-semibold text-gray-800">{label}</label>
			<input
				id="input-modal-field"
				class="mb-6 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow transition focus:border-blue-400 focus:outline-none"
				bind:value
				required
			/>
			<div class="flex justify-end gap-3 pt-2">
				<button
					type="button"
					class="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow transition hover:bg-gray-300"
					on:click={onCancel}
				>
					Cancelar
				</button>
				<button
					type="submit"
					class="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
				>
					Aceptar
				</button>
			</div>
		</form>
	</div>
{/if}
