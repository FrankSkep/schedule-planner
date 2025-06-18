<script lang="ts">
	import type { Subject } from '$lib/types';
	import { timeToMinutes, getColorForSubject } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	export let subjects: Subject[];

	const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
	const hours = Array.from({ length: 16 }, (_, i) => `${(i + 7).toString().padStart(2, '0')}:00`);

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

<div class="overflow-auto">
	<table
		class="w-full min-w-[1100px] table-fixed border-collapse border border-gray-300 text-center text-sm"
	>
		<thead class="bg-gray-100 font-semibold text-gray-700">
			<tr>
				<th class="w-32 border px-2 py-1">Hora</th>
				{#each days as d}
					<th class="border px-2 py-1">{d}</th>
				{/each}
			</tr>
		</thead>
		<tbody class="bg-white">
			{#each hours as h}
				<tr>
					<td class="border px-2 py-1">{h}–{(parseInt(h) + 1).toString().padStart(2, '0')}:00</td>
					{#each days as d}
						<td class="border px-2 py-1 align-top">
							{#each subjects as s, i}
								{#if s.day === d && timeToMinutes(s.startTime) <= timeToMinutes(h) && timeToMinutes(s.endTime) > timeToMinutes(h)}
									<div
										style="background-color: {getColorForSubject(s.name)}"
										class="relative rounded p-1 text-left break-words whitespace-pre-line"
									>
										<div class="absolute top-1 right-1 flex gap-1">
											<button
												class="text-yellow-600 hover:text-yellow-800"
												title="Editar"
												on:click={() => handleEdit(i)}
												style="background: transparent; border: none; padding: 0;"
											>
												<i class="fa fa-pen"></i>
											</button>
											<button
												class="text-red-600 hover:text-red-800"
												title="Eliminar"
												on:click={() => handleDelete(i)}
												style="background: transparent; border: none; padding: 0;"
											>
												<i class="fa fa-trash"></i>
											</button>
										</div>
										<span>{s.name}</span>
									</div>
								{/if}
							{/each}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
