export function getStatusTime(date: string): [number, number] {
	const diffMs = Math.abs(new Date().getTime() - new Date(date).getTime());
	const hours = Math.floor(diffMs / 1000 / 60 / 60);
	const minutes = Math.floor((diffMs / 1000 / 60) % 60);

	return [hours, minutes];
}
