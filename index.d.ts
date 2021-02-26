declare module 'ipay-ts' {
	enum IntentEnum {
		CAPTURE = 'CAPTURE',
		AUTHORIZE = 'AUTHORIZE',
		LOAN = 'LOAD'
	}

	enum LocaleEnum {
		ka = 'ka',
		en = 'en-US'
	}

	enum CurrencyEnum {
		GEL = 'GEL'
	}

	enum ApiEnum {
		PRODUCTION = 'ipay.ge',
		DEVELOPMENT = 'dev.ipay.ge'
	}

	enum IndustryEnum {
		ECOMMERCE = 'ECOMMERCE'
	}

	enum StatusEnum {
		CREATED = 'CREATED'
	}

	interface Link {
		href: string
		rel: string
		method: string
	}

	interface Unit {
		amount: {
			currency_code: CurrencyEnum
			value: string
		}
		payments: {
			captures: {
				id: string
				description: string
				quantity: number
				amount: {
					currency: CurrencyEnum
					value: string
				}
			}
		}
		shop_order_id: string
	}

	export interface Item {
		amount: number
		quantity: number
		description?: string
		product_id?: string
	}

	export interface CreationResponse {
		status: StatusEnum
		payment_hash: string
		links: Link[]
		order_id: string
	}

	export interface OrderResponse {
		order_id: string
		intent: IntentEnum
		purchaseUnit: Unit[]
	}

	export class IPay {
		constructor(
			intent: IntentEnum,
			redirect_url: string,
			username: string,
			password: string,
			api: ApiEnum,
			currency_code: CurrencyEnum,
			industry_type: IndustryEnum,
			locale?: LocaleEnum,
			shop_order_id?: string
		)

		createOrder(items: Item[]): Promise<CreationResponse>
		getOrders(order: string): Promise<OrderResponse>
	}
}