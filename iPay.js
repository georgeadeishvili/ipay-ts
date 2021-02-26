const api = require('./api')

class IPay {
	constructor(cfg) {
		if (!IPay.instance) {
			this.options = cfg
			this.token = api.generateToken(cfg)
			return this
		}
		return IPay.instance
	}

	async createOrder(items) {
		let totalAmount = items.reduce((total, currentValue) => total + currentValue.amount * currentValue.quantity, 0)
		const checkoutDetails = {
			intent: this.options.intent,
			redirect_url: this.options.redirect_url,
			shop_order_id: this.options.shop_order_id,
			card_transaction_id: this.options.card_transaction_id,
			locale: this.options.locale,
			purchase_units: [
				{
					amount: {
						currency_code: this.options.currency_code,
						value: totalAmount,
					},
					industry_type: this.options.industry_type,
				},
			],
			items,
		}
		let token = await this.token
		const result = await api.checkout(this.options, token.access_token, checkoutDetails)
		if (result.error_message == 'Requested token expired/invalid') {
			this.token = api.generateToken(this.options)
			token = await this.token
		}
		return api.checkout(this.options, token.access_token, checkoutDetails)
	}

	async getOrders(order) {
		let token = await this.token
		const result = await api.getOrders(this.options, token.access_token, order)
		if (result.error_message == 'Requested token expired/invalid') {
			this.token = api.generateToken(this.options)
			token = await this.token
		}
		return api.getOrders(this.options, token.access_token, order)
	}
}

module.exports = { IPay }