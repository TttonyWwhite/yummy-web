<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="一周营业额统计" name="first">
                <ve-line v-if="activeName == 'first'" :data="businessData"></ve-line>
            </el-tab-pane>
            <el-tab-pane label="新增用户统计" name="second">
                <ve-line v-if="activeName == 'second'" :data="newMemberData"></ve-line>
            </el-tab-pane>
            <el-tab-pane label="一周订单统计" name="third">
                <ve-line v-if="activeName == 'third'" :data="orderData"></ve-line>
            </el-tab-pane>
            <el-tab-pane label="订单退货统计" name="fourth">
                <ve-line v-if="activeName == 'fourth'" :data="refundData"></ve-line>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeName: 'first',
                businessData: {
                    columns: ['日期', '营业额'],
                    rows: []
                },
                newMemberData: {
                    columns: ['日期', '新增用户'],
                    rows:[]
                },
                orderData: {
                    columns: ['日期', '订单数'],
                    rows: []
                },
                refundData: {
                    columns: ['日期', '退订数'],
                    rows: []
                }
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        created() {
            let param = new URLSearchParams()
            param.append('restaurantId', this.$route.params.id)
            this.axios.post('http://localhost:8080/getBusinessSummary', param).then(response => {
                let data = response.data.data
                data.reverse()
                for (var i = 0;i < data.length;i++) {
                    let temp = {'日期': data[i].date, '营业额': data[i].total}
                    this.businessData.rows.push(temp)
                }
            })

            this.axios.post('http://localhost:8080/getNewMemberSummary', param).then(response => {
                //console.log(response)
                let data = response.data.data
                for (var i = 0;i < data.length;i++) {
                    let temp = {'日期': data[i].str, '新增用户': data[i].count}
                    this.newMemberData.rows.push(temp)
                }
            })

            this.axios.post('http://localhost:8080/getOrderSummary', param).then(response => {
                let data = response.data.data
                data.reverse()
                for (var i = 0;i < data.length;i++) {
                    let temp = {'日期': data[i].str, '订单数': data[i].count}
                    this.orderData.rows.push(temp)
                }
            })

            this.axios.post('http://localhost:8080/getRefundSummary', param).then(response => {
                let data = response.data.data
                data.reverse()
                for (var i = 0;i < data.length;i++) {
                    let temp = {'日期': data[i].str, '退订数': data[i].count}
                    this.refundData.rows.push(temp)
                }
            })

        }
    }
</script>