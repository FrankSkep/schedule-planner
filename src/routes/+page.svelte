<script lang="ts">
	import { browser } from '$app/environment';
	import ScheduleTable from '$lib/components/ScheduleTable.svelte';
	import Modal from '$lib/components/SubjectModal.svelte';
	import { conflictExists } from '$lib/utils';
	import type { Subject } from '$lib/types';
	import { toPng } from 'html-to-image';
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import InputModal from '$lib/components/InputModal.svelte';

	// PNG Export
	let tableRef: HTMLDivElement;
	let isExportingPNG = false;
	let pngFileName = 'horario.png';

	let showConfirmReset = false;
	let showInputJSON = false;
	let showInputPNG = false;
	let pendingExportType: 'json' | 'png' | null = null;
	let tempFileName = '';

	let modalMessage = '';

	let subjects: Subject[] = [];
	let current: Subject = { name: '', day: 'Lunes', startTime: '07:00', endTime: '08:00' };
	let editIndex: number | null = null;
	let message = '';
	let showModal = false;

	let pendingDeleteIndex: number | null = null;

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
			modalMessage = 'La hora de inicio debe ser menor que la de fin.';
			return;
		}

		if (conflictExists(subjects, subject, idx === null ? undefined : idx)) {
			modalMessage = 'Conflicto de horario con otra materia.';
			return;
		}

		if (idx !== null) {
			subjects[idx] = subject;
			subjects = [...subjects];
		} else {
			subjects = [...subjects, subject];
		}

		saveSubjects();
		modalMessage = '';
		current = { name: '', day: 'Lunes', startTime: '07:00', endTime: '08:00' };
		editIndex = null;
		showModal = false;
	}

	function handleDelete(index: number) {
		pendingDeleteIndex = index;
		showConfirmReset = true;
	}

	function handleEdit(index: number) {
		current = { ...subjects[index] };
		editIndex = index;
		modalMessage = '';
		showModal = true;
	}

	function handleAdd() {
		current = { name: '', day: 'Lunes', startTime: '07:00', endTime: '08:00' };
		editIndex = null;
		modalMessage = '';
		showModal = true;
	}

	function handleCancelEdit() {
		current = { name: '', day: 'Lunes', startTime: '07:00', endTime: '08:00' };
		editIndex = null;
		modalMessage = '';
		showModal = false;
	}

	function resetSchedule() {
		showConfirmReset = true;
	}

	function handleConfirmReset() {
		if (pendingDeleteIndex !== null) {
			subjects.splice(pendingDeleteIndex, 1);
			subjects = [...subjects];
			saveSubjects();
			pendingDeleteIndex = null;
			showConfirmReset = false;
			return;
		}
		// Si no hay índice, es un reseteo total
		subjects = [];
		localStorage.removeItem('subjects');
		showConfirmReset = false;
	}

	function handleCancelReset() {
		showConfirmReset = false;
	}

	function exportJSON() {
		tempFileName = 'horario';
		pendingExportType = 'json';
		showInputJSON = true;
	}

	function importJSON(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!input.files?.length) return;
		const file = input.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const data = JSON.parse(e.target?.result as string);
				if (Array.isArray(data)) {
					subjects = data;
					saveSubjects();
					message = '';
				} else {
					message = 'Archivo inválido.';
				}
			} catch {
				message = 'Archivo inválido.';
			}
		};
		reader.readAsText(file);
	}

	function exportPNG() {
		tempFileName = pngFileName.replace(/\.png$/i, '');
		pendingExportType = 'png';
		showInputPNG = true;
	}

	function handleInputModalSubmit(value: string) {
		if (!value) {
			showInputJSON = false;
			showInputPNG = false;
			return;
		}
		if (pendingExportType === 'json') {
			const blob = new Blob([JSON.stringify(subjects, null, 2)], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${value}.json`;
			a.click();
			URL.revokeObjectURL(url);
			showInputJSON = false;
		}
		if (pendingExportType === 'png') {
			isExportingPNG = true;
			message = '';
			showInputPNG = false;
			if (!tableRef) {
				isExportingPNG = false;
				showInputPNG = false;
				return;
			}
			toPng(tableRef)
				.then((dataUrl) => {
					const a = document.createElement('a');
					a.href = dataUrl;
					a.download = `${value}.png`;
					a.click();
				})
				.catch(() => {
					message = 'No se pudo exportar como PNG.';
				})
				.finally(() => {
					isExportingPNG = false;
				});
		}
		pendingExportType = null;
	}

	function handleInputModalCancel() {
		showInputJSON = false;
		showInputPNG = false;
		pendingExportType = null;
	}
</script>

<main class="min-h-screen bg-gray-50 p-6 text-gray-800">
	<div class="relative mx-auto max-w-7xl">
		<div class="mb-6 flex items-center justify-between">
			<h1
				class="mb-2 flex-1 bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent drop-shadow-lg"
			>
				Planificador de Horario Académico
			</h1>
			<a
				href="https://github.com/FrankSkep/schedule-planner"
				target="_blank"
				rel="noopener noreferrer"
				class="ml-4 inline-flex items-center gap-2 rounded bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-700"
				aria-label="Ver en GitHub"
			>
				<i class="fab fa-github fa-lg"></i>
				GitHub
			</a>
		</div>

		<div class="mb-6 flex flex-col justify-between gap-3 md:flex-row">
			<div class="flex gap-3">
				<button
					on:click={handleAdd}
					class="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow transition hover:bg-blue-700"
				>
					+ Agregar materia
				</button>
				<button
					type="button"
					on:click={resetSchedule}
					class="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-base font-semibold text-white shadow transition hover:bg-red-700"
				>
					Limpiar horario
				</button>
			</div>

			<div class="flex flex-col gap-3 md:ml-auto md:flex-row">
				<button
					on:click={exportJSON}
					class="cursor-pointer rounded-lg bg-green-600 px-4 py-2 text-base font-semibold text-white shadow transition hover:bg-green-700"
				>
					Exportar JSON
				</button>
				<label
					class="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-base font-semibold text-gray-700 shadow transition hover:bg-gray-300"
				>
					Importar JSON
					<input type="file" accept="application/json" on:change={importJSON} class="hidden" />
				</label>
				<button
					on:click={exportPNG}
					class="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-base font-semibold text-white shadow transition hover:bg-indigo-700"
					disabled={isExportingPNG}
				>
					{#if isExportingPNG}
						<svg
							class="h-5 w-5 animate-spin text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
							></path>
						</svg>
						Exportando...
					{:else}
						Exportar PNG
					{/if}
				</button>
			</div>
		</div>

		{#if message}
			<p class="mb-4 font-semibold text-red-600">{message}</p>
		{/if}

		<div bind:this={tableRef}>
			<ScheduleTable
				{subjects}
				on:edit={(e) => handleEdit(e.detail)}
				on:delete={(e) => handleDelete(e.detail)}
			/>
		</div>

		{#if showModal}
			<Modal
				subject={current}
				{editIndex}
				message={modalMessage}
				on:submit={handleSubmit}
				on:cancelEdit={handleCancelEdit}
				on:close={handleCancelEdit}
			/>
		{/if}
	</div>

	<ConfirmModal
		show={showConfirmReset}
		message={pendingDeleteIndex !== null
			? '¿Seguro que deseas eliminar esta materia?'
			: '¿Estás seguro de que deseas borrar todo el horario?'}
		onConfirm={handleConfirmReset}
		onCancel={() => {
			showConfirmReset = false;
			pendingDeleteIndex = null;
		}}
	/>
	<InputModal
		show={showInputJSON}
		label="Escribe el nombre del archivo JSON:"
		defaultValue={tempFileName}
		onSubmit={handleInputModalSubmit}
		onCancel={handleInputModalCancel}
	/>
	<InputModal
		show={showInputPNG}
		label="Escribe el nombre del archivo PNG:"
		defaultValue={tempFileName}
		onSubmit={handleInputModalSubmit}
		onCancel={handleInputModalCancel}
	/>
</main>
