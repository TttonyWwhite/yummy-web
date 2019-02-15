<template>
	<div>
		<InfoSummary></InfoSummary>
		<RecentOrder></RecentOrder>
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
		}
	}
</script>