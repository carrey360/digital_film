<template>
    <Card class="rootContent">
        
        <div class="search">
            <Row span="24">
                <Col span="3">
                    <Select clearable class="search_input" placeholder="播放供应商" v-model="query.movie_supply_id">
                        <Option v-for="item in factoryList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>
                <Col span="3">
                    <Input placeholder="影片名称" class="searchInput search_input input_icon" v-model="query.cinemas_id"></Input>
                </Col>
                <Col span="18" class="text_align_right">
                    <Button type="primary" @click="btnQuery">查询</Button>
                    <Button type="primary" @click="resetQuery">清空条件</Button>
                </Col>

            </Row>
        </div>

        <Row class="table">
            <Table class="myTable" border :columns="tableColumns" :data="tableData.data" :loading="tableLoading"></Table>
        </Row>

        <Row class="pagination">
            <Page :total="tableData.total" :page-size="limit" show-total size="small" @on-change="pageChange"></Page>
        </Row>

    </Card>
    
</template>

<script>
    import Util from '@/libs/util';

    const urlMap = {
        list: '/movie/statistics'
    }

    const tableColumns = (vm) => {
        return [
            {
                title: '序号',
                type: 'index',
                width: 60,
                align: 'center'
            },{
                title: '影片名称',
                key: 'movie_name'
            },{
                title: 'FID',
                key: 'movie_fid'
            },{
                title: '影片供应商',
                key: 'movie_supply_name'
            },{
                title: '影片类型',
                key: 'movie_type'
            },{
                title: '时长',
                key: 'movie_duration'
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
                tableData: {data: [], total: 0},
                factoryList: Util.getFactoryList(),
                query: {
                    movie_supply_id: "",
                    cinemas_id: ""
                }
            }
        },
        mounted: function(){
            this.getTablesListData(1);
        },
        methods: {
            getTablesListData(page){
                let params = {
                    page: page || this.page,
                    limit: this.limit
                };
                Object.assign(params, this.query);

                Util.getData(urlMap.list, params).then((res) => {
                    if(res){
                        this.page = page;
                        this.tableData = res;
                    }
                });
            },
            pageChange(page){
                this.getTablesListData(page);
            },
            btnQuery(){
                this.getTablesListData(1);
            },
            resetQuery(){
                this.query = {
                    movie_supply_id: "",
                    movie_name: ""
                };
            }
        }
    }
</script>
