export class DecimalTransformer {
	public to(data: number | null): number | null {
		return data;
	}

	public from(data: string | null): number | null {
		// output value, you can use Number, parseFloat variations
		// also you can add nullable condition:
		// if (!Boolean(data)) return 0;

		if (!data) {
			return null;
		}

		return Number(String(data));
	}
}
