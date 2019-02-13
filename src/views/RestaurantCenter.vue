<template>
	<div>
		<el-form ref="infoForm" label-width="90px">
			<el-form-item label="餐厅名称">
				<el-input v-model="infoForm.name" disabled></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				infoForm: {
					name: '炸酱面'
				}
			}
		}
	}
</script>