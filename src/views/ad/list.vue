<template>
    <Card class="rootContent">
        
        <div class="search">
            <Row span="24">
                <Col span="3">
                    <DatePicker type="date" placeholder="开始时间" class="search_input"></DatePicker>
                </Col>
                <Col span="3">
                    <DatePicker type="date" placeholder="结束时间" class="search_input"></DatePicker>
                </Col>
                <Col span="3">
                    <Input placeholder="广告项目" class="searchInput search_input">
                        <Button slot="prepend" icon="ios-search"></Button>
                    </Input>
                </Col>
                <Col span="3">
                    <Input placeholder="广告提供方" class="searchInput search_input">
                        <Button slot="prepend" icon="ios-search"></Button>
                    </Input>
                </Col>
                <Col span="12" class="text_align_right">
                    <Button type="primary">查询</Button>
                    <Button type="primary">清空条件</Button>
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
                key: 'advertiser_project_start_time'
            },{
                title: '项目结束时间',
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
                cinemaList: [{id: 1, text: "望京兄弟影院"}]
                
            }
        },
        mounted: function(){
            this.getTablesListData(1);
        },
        methods: {
            getTablesListData(page){
                this.tableData = {
                    data: [{
                        ad_duration:"90",
                        ad_name:"哇哈哈",
                        advertiser_name:"MIAO",
                        advertiser_project_finish_time:"2018-03-31",
                        advertiser_project_name:"功能饮料广告轮播",
                        advertiser_project_start_time:"2018-03-01",
                        finish_count:"少计划场次",
                        plan_count:"少计划场次",
                        show_type:"放映方式不合理，在放映明细显示即可"
                    },{
                        ad_duration:"90",
                        ad_name:"哇哈哈",
                        advertiser_name:"MIAO",
                        advertiser_project_finish_time:"2018-03-31",
                        advertiser_project_name:"功能饮料广告轮播",
                        advertiser_project_start_time:"2018-03-01",
                        finish_count:"少计划场次",
                        plan_count:"少计划场次",
                        show_type:"放映方式不合理，在放映明细显示即可"
                    },{
                        ad_duration:"90",
                        ad_name:"哇哈哈",
                        advertiser_name:"MIAO",
                        advertiser_project_finish_time:"2018-03-31",
                        advertiser_project_name:"功能饮料广告轮播",
                        advertiser_project_start_time:"2018-03-01",
                        finish_count:"少计划场次",
                        plan_count:"少计划场次",
                        show_type:"放映方式不合理，在放映明细显示即可"
                    },{
                        ad_duration:"90",
                        ad_name:"哇哈哈",
                        advertiser_name:"MIAO",
                        advertiser_project_finish_time:"2018-03-31",
                        advertiser_project_name:"功能饮料广告轮播",
                        advertiser_project_start_time:"2018-03-01",
                        finish_count:"少计划场次",
                        plan_count:"少计划场次",
                        show_type:"放映方式不合理，在放映明细显示即可"
                    },{
                        ad_duration:"90",
                        ad_name:"哇哈哈",
                        advertiser_name:"MIAO",
                        advertiser_project_finish_time:"2018-03-31",
                        advertiser_project_name:"功能饮料广告轮播",
                        advertiser_project_start_time:"2018-03-01",
                        finish_count:"少计划场次",
                        plan_count:"少计划场次",
                        show_type:"放映方式不合理，在放映明细显示即可"
                    }],
                    total:5
                }
                // let params = {
                //     page: page || this.page,
                //     limit: this.limit
                // };
                // Util.getData(urlMap.list, params).then((res) => {
                //     if(res){
                //         this.page = page;
                //         this.tableData = res;
                //     }
                // });
            },
            pageChange(page){
                this.getTablesListData(page);
            }
        }
    }
</script>
