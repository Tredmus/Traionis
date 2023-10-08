import { z, defineCollection } from 'astro:content';

const intro = defineCollection({
	type: 'data',
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		buttons: z.record(z.record(z.string().optional())),
		img: z.record(z.string().optional())
	}),
});

const services = defineCollection({
	type: 'data',
	schema: z.object({
		subtitle: z.string(),
		title: z.string(),
		services: z.array(
			z.record(
				z.object({
					title: z.string(),
					icon: z.string(),
					cards: z.array(
						z.record(
							z.object({
								title: z.string(),
								icon: z.string(),
								text: z.string()
							})
							)
						)
				})
				)
			)
	}),
});

export const collections = { intro, services };
