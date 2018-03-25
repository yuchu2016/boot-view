<template>
    <div id="Title">
      <div class="card-header" >
        <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
        <Select v-model="model1" style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Input v-model="value" placeholder="Enter something..." style="width: 200px"></Input>
        <Button type="primary" icon="ios-search" :loading="loadingSearch" @click="search">搜索</Button>
        <Button class="pull-right" icon="ios-download" :loading="loading" @click="toLoading">下载</Button>
      </div>
      <div class="card-body card-padding" >
        <Table :columns="columns1" :data="data1"></Table>
      </div>
      <div class="card-footer  card-padding">
        <div class="page pull-right">

          <Page  :total="100" show-elevator show-sizer  show-total></Page>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        loadingSearch:false,
        value:'',
        cityList: [
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        model1: '',
        columns1: [
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          }
        ],
        data1: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ]
      }
    },
    methods: {
      toLoading () {
        this.loading = ! this.loading;
      },
      search(){
        this.loadingSearch = !this.loadingSearch;
        this.axios.get('http://localhost:8083/api/user').then((response) => {
          console.log(response.data)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .card-footer{
    padding: 0 25px;
    min-height: 60px;
  }
</style>


