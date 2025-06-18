<script lang="ts">
	import type { Subject } from '$lib/types';
	import { timeToMinutes, getColorForSubject } from '$lib/utils';

	export let subjects: Subject[];

	const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
	const hours = Array.from({ length: 16 }, (_, i) => `${(i + 7).toString().padStart(2, '0')}:00`);
</script>

<div class="overflow-auto">
	<table class="w-full table-fixed border-collapse border border-gray-300 text-center text-sm">
		<thead class="bg-gray-100 font-semibold text-gray-700">
			<tr>
				<th class="w-24 border px-2 py-1">Hora</th>
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
						<td class="border px-2 py-1">
							{#each subjects as s}
								{#if s.day === d && timeToMinutes(s.startTime) <= timeToMinutes(h) && timeToMinutes(s.endTime) > timeToMinutes(h)}
									<div style="background-color: {getColorForSubject(s.name)}" class="rounded p-1">
										{s.name}
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
