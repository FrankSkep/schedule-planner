<script lang="ts">
	import { browser } from '$app/environment';
	import SubjectForm from '$lib/components/SubjectForm.svelte';
	import ScheduleTable from '$lib/components/ScheduleTable.svelte';
	import SubjectList from '$lib/components/SubjectList.svelte';
	import { conflictExists } from '$lib/utils';
	import type { Subject } from '$lib/types';

	let subjects: Subject[] = [];
	let current: Subject = { name: '', day: 'Lunes', startTime: '07:00', endTime: '08:00' };
	let editIndex: number | null = null;
	let message = '';

	if (browser) {
		subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
	}

	function saveSubjects() {
		if (browser) {
			localStorage.setItem('subjects', JSON.stringify(subjects));
		}
	}

	function handleSubmit(event: CustomEvent<{ subject: Subject; editIndex: number | null }>) {
		const { subject, editIndex: idx } = event.detail;

		if (parseInt(subject.startTime) >= parseInt(subject.endTime)) {
			message = 'La hora de inicio debe ser menor que la de fin.';
			return;
		}

		if (conflictExists(subjects, subject, idx === null ? undefined : idx)) {
			message = 'Conflicto de horario con otra materia.';
			return;
		}

		if (idx !== null) {
			subjects[idx] = subject;
			subjects = [...subjects];
		} else {
			subjects = [...subjects, subject];
		}

		saveSubjects();
		message = '';
		current = { name: '', day: 'Lunes', startTime: '07:00', endTime: '08:00' };
		editIndex = null;
	}

	function handleDelete(index: number) {
		subjects.splice(index, 1);
		subjects = [...subjects];
		saveSubjects();
	}

	function handleClear() {
		if (confirm('¿Estás seguro de que deseas borrar todo el horario?')) {
			subjects = [];
			localStorage.removeItem('subjects');
		}
	}

	function handleEdit(index: number) {
		current = { ...subjects[index] };
		editIndex = index;
	}
</script>

<main class="min-h-screen bg-gray-50 p-6 text-gray-800">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-6 text-center text-3xl font-bold">Planificador de Horario Académico</h1>

		<SubjectForm
			subject={current}
			{editIndex}
			on:submit={handleSubmit}
			on:clear={handleClear}
			on:cancelEdit={() => {
				current = { name: '', day: 'Lunes', startTime: '07:00', endTime: '08:00' };
				editIndex = null;
			}}
		/>

		{#if message}
			<p class="mb-4 font-semibold text-red-600">{message}</p>
		{/if}

		<ScheduleTable {subjects} />

		<SubjectList
			{subjects}
			editingIndex={editIndex}
			on:edit={(e) => handleEdit(e.detail)}
			on:delete={(e) => handleDelete(e.detail)}
		/>
	</div>
</main>
