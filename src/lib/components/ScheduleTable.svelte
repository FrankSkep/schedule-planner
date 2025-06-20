<script lang="ts">
	import type { Subject } from '$lib/types';
	import { timeToMinutes, getColorForSubject } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	export let subjects: Subject[];

	const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

	// Calcular hora mínima y máxima según las materias
	function getHourRange(subjects: Subject[]) {
		if (!subjects.length) return ['07:00', '23:00'];
		const allTimes = subjects.flatMap((s) => [s.startTime, s.endTime]);
		const min = allTimes.reduce((a, b) => (timeToMinutes(a) < timeToMinutes(b) ? a : b));
		const max = allTimes.reduce((a, b) => (timeToMinutes(a) > timeToMinutes(b) ? a : b));
		return [min, max];
	}

	$: [minHour, maxHour] = getHourRange(subjects);

	// Generar el rango de horas a mostrar
	$: hours = (() => {
		const start = timeToMinutes(minHour);
		const end = timeToMinutes(maxHour);
		const arr = [];
		for (let t = start; t < end; t += 60) {
			const h = Math.floor(t / 60)
				.toString()
				.padStart(2, '0');
			arr.push(`${h}:00`);
		}
		return arr;
	})();

	const dispatch = createEventDispatcher();

	function handleEdit(index: number) {
		dispatch('edit', index);
	}

	function handleDelete(index: number) {
		dispatch('delete', index);
	}
</script>

<div class="overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg">
	<table class="w-full min-w-[900px] table-fixed border-collapse text-center text-sm">
		<thead
			class="sticky top-0 z-10 bg-gradient-to-r from-blue-100 to-blue-200 font-semibold text-gray-700 shadow"
		>
			<tr>
				<th class="w-32 border-b px-2 py-2">Hora</th>
				{#each days as d}
					<th class="border-b px-2 py-2">{d}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each hours as h, hi}
				<tr class={hi % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
					<td class="border-b px-2 py-2 font-mono text-base text-gray-700"
						>{h}–{(parseInt(h) + 1).toString().padStart(2, '0')}:00</td
					>
					{#each days as d}
						<td class="border-b px-2 py-2 align-top">
							{#each subjects as s, i}
								{#if s.day === d && timeToMinutes(s.startTime) <= timeToMinutes(h) && timeToMinutes(s.endTime) > timeToMinutes(h)}
									<div
										style="background-color: {getColorForSubject(s.name)}"
										class="relative rounded-xl border border-blue-200 p-2 text-left break-words whitespace-pre-line shadow-md"
									>
										<div class="absolute top-1 right-1 flex gap-1">
											<button
												class="text-yellow-600 hover:text-yellow-800"
												title="Editar"
												aria-label="Editar"
												on:click={() => handleEdit(i)}
												style="background: transparent; border: none; padding: 0;"
											>
												<i class="fa fa-pen"></i>
											</button>
											<button
												class="text-red-600 hover:text-red-800"
												title="Eliminar"
												aria-label="Eliminar"
												on:click={() => handleDelete(i)}
												style="background: transparent; border: none; padding: 0;"
											>
												<i class="fa fa-trash"></i>
											</button>
										</div>
										<span class="font-semibold">{s.name}</span>
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
