<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	export let message = '';
	export let show = false;
	export let onConfirm: () => void;
	export let onCancel: () => void;
</script>

{#if show}
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
			<p class="mb-6 text-base text-gray-800">{message}</p>
			<div class="flex justify-end gap-3 pt-2">
				<button
					class="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow transition hover:bg-gray-300"
					on:click={onCancel}
				>
					Cancelar
				</button>
				<button
					class="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-red-700"
					on:click={onConfirm}
				>
					Aceptar
				</button>
			</div>
		</div>
	</div>
{/if}
