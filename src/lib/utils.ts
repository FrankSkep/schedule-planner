import type { Subject } from '$lib/types';
import { browser } from '$app/environment';

export function timeToMinutes(t: string): number {
	const [h, m] = t.split(':').map(Number);
	return h * 60 + m;
}

export function conflictExists(subjects: Subject[], newSubj: Subject, excludeIndex = -1): boolean {
	return subjects.some((s, i) => {
		if (i === excludeIndex) return false;
		return (
			s.day === newSubj.day &&
			timeToMinutes(newSubj.startTime) < timeToMinutes(s.endTime) &&
			timeToMinutes(newSubj.endTime) > timeToMinutes(s.startTime)
		);
	});
}

let colorMap: Record<string, string> = browser
	? JSON.parse(localStorage.getItem('colorMap') || '{}')
	: {};

export function getColorForSubject(name: string): string {
	if (colorMap[name]) return colorMap[name];

	const hue = Math.floor(Math.random() * 360);
	const pastel = `hsl(${hue}, 70%, 85%)`;
	colorMap[name] = pastel;

	if (browser) {
		localStorage.setItem('colorMap', JSON.stringify(colorMap));
	}

	return pastel;
}
