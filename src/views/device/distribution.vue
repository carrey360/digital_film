<style lang="less" scoped>
    
</style>

<template>
    <Card class="rootContent">
        
        <div class="search">
            <Row span="24">
                <Col span="4">
                    <Select clearable class="search_input" placeholder="所属影院">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>
                
                <Col span="4">
                    <Select clearable class="search_input" placeholder="播放类别">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>

                <Col span="4">
                    <Input placeholder="出厂编号" class="searchInput search_input">
                        <Button slot="prepend" icon="ios-search"></Button>
                    </Input>
                </Col>
                
                <Col span="4">
                    <Input placeholder="解码卡号" class="searchInput search_input">
                        <Button slot="prepend" icon="ios-search"></Button>
                    </Input>
                </Col>

                <Col span="4">
                    <Input placeholder="机器型号" class="searchInput search_input">
                        <Button slot="prepend" icon="ios-search"></Button>
                    </Input>
                </Col>

                <!-- <Col span="2">
                    <Button type="text">高级查询</Button>
                </Col>

                <Col span="2">
                    <Button type="primary" icon="arrow-down-c">下载结果</Button>
                </Col> -->
            </Row>
            <Row style="margin-top:15px;">
                <Col span="4">
                    <Select clearable class="search_input" placeholder="所属省">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>
                <Col span="4">
                    <Select clearable class="search_input" placeholder="所属市辖区">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>
                <Col span="4">
                    <Select clearable class="search_input" placeholder="所属区县">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>

                <Col span="4">
                    <Select clearable class="search_input" placeholder="厂商">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>

                <Col span="8">
                    <Button type="primary" icon="ios-search">查询</Button>
                    <Button type="primary" icon="nuclear">清空条件</Button>
                    <Button type="primary" icon="arrow-down-c">下载结果</Button>
                </Col>
            </Row>
        </div>

        <Row class="table">
            <Table class="myTable" border :columns="tableColumns" :data="tableData.list" :loading="tableLoading"></Table>
        </Row>

        <Row class="pagination">
            <Page :total="tableData.total" :page-size="limit" show-total size="small" @on-change="pageChange"></Page>
        </Row>

    </Card>
    
</template>

<script>
    import Util from '@/libs/util';
    import moment from 'moment';

    const urlMap = {
        list: '/b/order/list',
        express: '/b/order/express/input',
        verify:'/b/order/confirm'
    }

    const tableColumns = (vm) => {
        return [
            {
                title: '序号',
                type: 'index',
                width: 60,
                align: 'center'
            },{
                title: '地区',
                key: 'price'
            },{
                title: '播放器别名',
                key: 'goods_num'
            },{
                title: '出厂编号',
                key: 'address'
            },{
                title: '解码卡号',
                key: 'info_name'
            },{
                title: '设备型号',
                key: 'info_phone'
            },{
                title: '模块编号',
                key: 'create_time'
            },{
                title: '放映员',
                key: 'status_desc'
            },{
                title: '放映方式',
                key: 'express_type'
            },{
                title: '使用情况',
                key: 'express_type'
            },{
                title: '院线',
                key: 'express_type'
            },{
                title: '厂商',
                key: 'express_type'
            }
        ]
    };

    export default {
        data () {
            return {
                limit: Util.limit,
                page: 1,
                tableLoading: false,
                tableColumns: tableColumns(this),
                tableData: {list: [], total: 0},
                cinemaList: [{id: 1, text: "望京兄弟影院"}]
                
            }
        },
        mounted: function(){
            // this.getTablesListData(1);
        },
        methods: {
            getTablesListData(page){
                let params = {
                    page: page || this.page,
                    limit: this.limit
                };
                Util.getData(urlMap.list, params).then((res) => {
                    if(res){
                        this.page = page;
                        this.tableData = res;
                    }
                });
            },
            pageChange(page){
                this.getTablesListData(page);
            }
        }
    }
</script>