const TOTAL_PAGE_NUMBER = 5;

function range(start: number, end: number) {
	const length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
}

export function getPaginationRange(totalCount: number, pageLimit: number, currentPage: number): number[] {
	const totalPageCount = Math.ceil(totalCount / pageLimit);

	if (TOTAL_PAGE_NUMBER >= totalPageCount) {
		return range(1, totalPageCount);
	}

	const leftSiblingIndex = Math.max(currentPage, 1);
	const rightSiblingIndex = Math.min(currentPage, totalPageCount);

	const shouldShowLeftDots = leftSiblingIndex > 2;
	const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

	const firstPageIndex = 1;
	const lastPageIndex = totalPageCount;

	if (!shouldShowLeftDots && shouldShowRightDots) {
		return [...range(1, 3), -1, totalPageCount];
	}

	if (shouldShowLeftDots && !shouldShowRightDots) {
		return [firstPageIndex, -1, ...range(totalPageCount - 2, totalPageCount)];
	}

	if (shouldShowLeftDots && shouldShowRightDots) {
		return [firstPageIndex, -1, ...range(leftSiblingIndex, rightSiblingIndex), -1, lastPageIndex];
	}

	return [];
}
