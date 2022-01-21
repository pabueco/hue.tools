import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }): Promise<Response> => {
	const response = await resolve(event, {
		ssr: false
	});

	return response;
}