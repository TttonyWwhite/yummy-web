<template>
  <div style="margin-left: 20px;background-color: white;height: 100%">
    <div style="margin-right: 20px;margin-left: 20px">
      <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: flex-start">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item style="font-weight: bold;font-size: 16px;margin-top: 10px">我的资料</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 16px;margin-top: 10px">地址管理</el-breadcrumb-item>
        </el-breadcrumb>
        <a href="javascript:;" style="font-size: 16px;height: 16px;color: dodgerblue;text-decoration: none;margin-top: 10px" @click="openNewAddressDialog">添加地址</a>
      </div>
      <div style="margin-top: 10px;border-top: 2px solid #8a8a8a">
        <el-card
                v-for="(info,index) in addressInfo"
                :key="info.addressId" style="margin-top: 20px">
          <div>
            <span>{{info.contactName}}</span>
            <span v-show="defaultAddress === info.addressId" style="margin-left: 30px;color: cornflowerblue">默认地址</span>
            <el-button size="mini" @click="deleteAddress(info, index)" style="border: 0;color: cornflowerblue;font-size: 14px;float: right">删除</el-button>
            <el-button @click="openChangeAddressDialog(info, index)" size="mini" style="border: 0;color: cornflowerblue;font-size: 14px;float: right">修改</el-button>
            <el-button v-show="defaultAddress !== info.addressId" @click="setDefaultAddress(info)" size="mini" style="border: 0;color: cornflowerblue;font-size: 14px;float: right">设为默认地址</el-button>
          </div>
          <div style="margin-top: 10px">
            <span>{{info.address}}</span>
          </div>
          <div style="margin-top: 3px">
            <span>{{info.phoneNumber}}</span>
          </div>
        </el-card>
        <h1 v-show="addressInfo.length === 0" style="display: flex;justify-content: center;margin-top: 20px">暂无地址</h1>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible">
      <div class="amap-page-container">
        <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
        <el-amap
          vid="amapDemo"
          :zoom="zoom"
          :amap-manager="amapManager"
          :center="mapCenter"
          class="amap-demo"
          :events="events">
            <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker"></el-amap-marker>
        </el-amap>
        <div class="toolbar">
          <el-form label-position="left" style="margin-top: 10px">
            <el-form-item label="位置" label-width="70px" style="">
              <el-input readonly id="address" size="medium" style="" v-model="address"></el-input>
            </el-form-item>
            <el-form-item label="联系人" label-width="70px" style="margin-top: -15px">
              <el-input size="medium" v-model="contactName"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" label-width="70px" style="margin-top: -15px">
              <el-input size="medium" v-model="phoneNumber"></el-input>
            </el-form-item>
          </el-form>
          <el-button v-show="title === '新增地址'" style="position: relative;float: right;margin-top: -15px" size="medium" @click="addAddress">添加地址</el-button>
          <el-button v-show="title === '修改地址'" style="position: relative;float: right;margin-top: -15px" size="medium" @click="changeAddress()">修改地址</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'
import axios from 'axios'
let amapManager = new VueAMap.AMapManager()
export default {
  data: function () {
    let self = this
    return {
      amapManager,
      name: '',
      sex: '',
      markers: [],
      mapCenter: [],
      title: '',
      city: '',
      dialogVisible: false,
      addressInfo: [
          {
              addressId: 1,
              contactName:'孙铭辉',
              phoneNumber: '12121313122',
              address:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
          }
      ],
      searchOption: {
        city: '',
        citylimit: false
      },
      zoom: 10,
      events: {
        init (o) {
        },
        click (e) {
          let { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          self.markers = []
          self.markers.push([lng, lat])
          // 这里通过高德 SDK 完成。
          let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress
                self.city = result.regeocode.addressComponent.city
                self.$nextTick()
              }
            }
          })
        }
      },
      address: '',
      lng: 0,
      lat: 0,
      contactName:'',
      phoneNumber:'',
      index: 0,
      initMapCenter: [],
      defaultAddress: null
    }
  },
  created () {
    let param = new URLSearchParams()
    param.append("memberId", this.$route.params.id)
    this.axios.post('http://localhost:8080/getDefaultAddress', param).then(response => {
      this.defaultAddress = response.data.data.addressId
    })

    this.axios.post('http://localhost:8080/getDetailAddress', param).then(response => {
      this.addressInfo = response.data.data;
    })

    let self = this
    AMap.plugin(['AMap.CitySearch',],function () {
      let citysearch = new AMap.CitySearch()
      citysearch.getLocalCity((status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.city && result.bounds) {
            self.searchOption.city = result.city
            self.mapCenter = [(result.bounds.northeast.lng + result.bounds.southwest.lng) / 2, (result.bounds.northeast.lat + result.bounds.southwest.lat) / 2]
            self.initMapCenter = [(result.bounds.northeast.lng + result.bounds.southwest.lng) / 2, (result.bounds.northeast.lat + result.bounds.southwest.lat) / 2]
          }
        }
      })
    })
  },
  methods: {
    openNewAddressDialog () {
      this.zoom = 10
      this.title = '新增地址'
      this.address = ''
      this.markers = []
      this.mapCenter = [this.initMapCenter[0], this.initMapCenter[1]]
      this.dialogVisible = true
      this.contactName = ''
      this.phoneNumber = ''
    },
    openChangeAddressDialog (info, index) {
      this.title = '修改地址'
      this.zoom = 18
      this.address = this.addressInfo[index].address
      this.mapCenter = [this.addressInfo[index].lng, this.addressInfo[index].lat]
      this.markers = []
      this.markers.push([this.addressInfo[index].lng, this.addressInfo[index].lat])
      this.dialogVisible = true
      this.index = index
      this.contactName = info.contactName
      this.phoneNumber = info.phoneNumber
      this.lng = info.lng
      this.lat = info.lat
    },
    onSearchResult (pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        this.markers = []
        pois.forEach(poi => {
          let {lng, lat} = poi
          lngSum += lng
          latSum += lat
          this.markers.push([poi.lng, poi.lat])
        })
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.mapCenter = [center.lng, center.lat]
      }
    },
    addAddress () {
      if (!this.address || !this.contactName || !this.phoneNumber) {
        this.$confirm('请完善地址！')
      } else {
          this.axios.post('http://localhost:8080/addAddress', {
              memberId: this.$route.params.id,
              address: this.address,
              contactName: this.contactName,
              phoneNumber: this.phoneNumber,
              lng: this.lng,
              lat: this.lat
          })
              .then(response => {
                console.log(response)
                  this.dialogVisible = false
                  this.addressInfo.push({
                      address:this.address,
                      contactName:this.contactName,
                      phoneNumber:this.phoneNumber,
                      addressId: response.data.data,
                      lng: this.lng,
                      lat: this.lat,
                      memberId: this.$route.params.id
                  })
          })
      }
    },
    changeAddress () {
      if (!this.address || !this.contactName || !this.phoneNumber) {
        this.$confirm('请完善地址！')
      } else {
        let address = this.addressInfo[this.index]
        address.phoneNumber = this.phoneNumber
        address.contactName = this.contactName
        address.lng = this.lng
        address.lat = this.lat
        address.address = this.address

        this.axios.post('http://localhost:8080/modifyAddress', address).then(response => {
          this.$message('修改成功')
          this.dialogVisible = false
        })
      }
    },
    deleteAddress (info, index) {
      this.$confirm('确认删除？')
        .then(() => {
            let addressId = info.addressId
            let param = new URLSearchParams()
            param.append('addressId', addressId)
            this.axios.post('http://localhost:8080/deleteAddress', param).then(response => {
              this.$message('删除成功！')
            })

            this.addressInfo.splice(index, 1)
        })
        .catch(() => {
        })
    },
    setDefaultAddress (info, index) {
      let param = new URLSearchParams()
      param.append("memberId", this.$route.params.id)
      param.append("addressId", info.addressId)

      this.axios.post('http://localhost:8080/setDefaultAddress', param).then(response => {
          this.$message('修改成功！')
          this.defaultAddress = info.addressId;
      })
    }
  }
}
</script>

<style scoped>
  .amap-demo {
    height: 300px;
  }
  .search-box {
    position: absolute;
    top: 25px;
    left: 20px;
  }
  .amap-page-container {
    position: relative;
    margin-top: -30px;
  }
</style>
