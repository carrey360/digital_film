<template>
    <Card class="rootContent">
        
        <div class="search">
            <Row span="24">
                <Col span="3">
                    <DatePicker type="date" placeholder="开始时间" class="search_input" v-model="query.start_time"></DatePicker>
                </Col>
                <Col span="3">
                    <DatePicker type="date" placeholder="结束时间" class="search_input" v-model="query.finish_time"></DatePicker>
                </Col>
                <Col span="3">
                    <Input placeholder="广告项目" class="searchInput search_input input_icon" v-model="query.ad_name"></Input>
                </Col>
                <Col span="3">
                    <Input placeholder="广告提供方" class="searchInput search_input input_icon" v-model="query.advertiser_name"></Input>
                </Col>
                <Col span="12" class="text_align_right">
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
        list: '/ad/list'
    }

    const tableColumns = (vm) => {
        return [
            {
                title: '序号',
                type: 'index',
                width: 60,
                align: 'center'
            },{
                title: '广告项目',
                key: 'ad_name'
            },{
                title: '广告提供方',
                key: 'advertiser_name'
            },{
                title: '广告时长',
                key: 'ad_duration'
            },{
                title: '项目开始时间',
                width: 180,
                key: 'advertiser_project_start_time'
            },{
                title: '项目结束时间',
                width: 180,
                key: 'advertiser_project_finish_time'
            },{
                title: '计划场次',
                key: 'plan_count'
            },{
                title: '完成场次',
                key: 'finish_count'
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
                cinemaList: [{id: 1, text: "望京兄弟影院"}],
                query: {
                    start_time: "",
                    finish_time: "",
                    ad_name: "",
                    advertiser_name: ""
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
                    start_time: "",
                    finish_time: "",
                    ad_name: "",
                    advertiser_name: ""
                };
            }
        }
    }
</script>
