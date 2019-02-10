<template>
	<div>
		<InfoSummary></InfoSummary>
		<RecentOrder :order="this.order"></RecentOrder>
	</div>
</template>


<script>
	import InfoSummary from '../components/InfoSummary'
	import RecentOrder from '../components/recentOrder'

	export default {
		name: 'personalCenter',
		components: {
			InfoSummary,
			RecentOrder
		},
		data() {
			return {
				order: {
					image: '',
					orderId: '',
					price: 0,
					state: '',
					time: '',
					title: ''
				}
			}
		},
		mounted() {
			let param = new URLSearchParams()
			param.append("memberId", localStorage.getItem('ID'))
			this.axios.post('http://localhost:8080/getOrders', param).then(response => {
				console.log(response.data.data)
				this.order = response.data.data
			})	

			if (localStorage.getItem('reloaded')) {
				localStorage.removeItem('reloaded')
			} else {
				localStorage.setItem('reloaded', '1')
				location.reload()
			}
		}
	}
</script>