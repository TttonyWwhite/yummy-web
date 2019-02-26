<template>
    <div>
        <ve-line :data="incomeData"></ve-line>
    </div>
</template>

<script>
    export default {
        name: "FinancialSummary",
        data() {
            return {
                incomeData: {
                    columns: ['日期', '营收额'],
                    rows: []
                }
            }
        },
        created() {
            this.axios.post('http://localhost:8080/getFinancialSummary').then(response => {
                let data = response.data.data
                data.reverse()
                for (var i = 0;i < data.length;i++) {
                    let temp = {'日期': data[i].date, '营收额': data[i].income}
                    this.incomeData.rows.push(temp)
                }
            })
        }
    }
</script>

<style scoped>

</style>