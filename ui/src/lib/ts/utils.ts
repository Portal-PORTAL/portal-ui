export function getNumberValue(value: any) {
    let return_val = 0
	if (!value) return return_val;
	if (value.__fixed__) return_val = value.__fixed__
	return Number(return_val);
}

export const createBlockExplorerLink = (route, id) => `https://www.tauhq.com/${route}/${id}`
