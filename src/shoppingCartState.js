export default {
	data: {
		cart: {
		}
	},
	add (product) {
		if (this.data.cart.hasOwnProperty(product.sid)){
            let found = _.find(this.data.cart[product.sid], ['id', product.id])
            if (typeof found !== 'object') {
                this.data.cart[product.sid].push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    qty: 1
                })
            }else {
            	this.inc(product)
			}
		} else {
			this.data.cart[product.sid] = [{
                id: product.id,
				title: product.title,
				price: product.price,
				image: product.image,
				qty: 1
			}]
		}
	},
	inc (product) {
		let found = _.find(this.data.cart[product.sid], ['id', product.id])
		if (typeof found === 'object') {
			let index = _.indexOf(this.data.cart[product.sid], found)
			this.data.cart[product.sid][index].qty++
		}
	},
	dec (product) {
		let found = _.find(this.data.cart[product.sid], ['id', product.id])
		if (typeof found === 'object') {
			let index = _.indexOf(this.data.cart[product.sid], found)
			if (this.data.cart[product.sid][index].qty === 1) {
				this.data.cart[product.sid].splice(index, 1)
			} else {
				this.data.cart[product.sid][index].qty--
			}
		}
	},
	clear(sid){
		this.data.cart[sid].splice(0,this.data.cart[sid].length)
	},
	remove(sid,product){
        let found = _.find(this.data.cart[sid], ['id', product.id])
        if (typeof found === 'object') {
            let index = _.indexOf(this.data.cart[sid], found)
			this.data.cart[sid].splice(index, 1)
        }
	}
}