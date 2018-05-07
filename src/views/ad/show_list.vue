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
        list: '/ad/show/list'
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
                key: 'player_area_name',
                width: 200,
                ellipsis: true,
            },{
                title: '院线',
                key: 'player_cinemas_name',
                width: 200,
                ellipsis: true,
            },{
                title: '设备别名',
                key: 'player_byname',
                width: 200,
                ellipsis: true,
            },{
                title: '解码卡号',
                key: 'player_decipher_card',
                width: 200,
                ellipsis: true,
            },{
                title: '放映员',
                key: 'player_cinemas_runner_name'
            },{
                title: '广告项目',
                key: 'advertiser_project_name',
                width: 200,
                ellipsis: true,
            },{
                title: '广告提供方',
                key: 'advertiser_name',
                width: 200,
                ellipsis: true,
            },{
                title: '关联影片',
                key: 'plan_count',
                width: 200,
                ellipsis: true,
            },{
                title: '放映方式',
                key: 'show_type',
                width: 100,
                ellipsis: true,
            },{
                title: '开始时间',
                key: 'advertiser_project_start_time',
                width: 180,
                ellipsis: true,
            },{
                title: '结束时间',
                key: 'advertiser_project_finish_time',
                width: 180,
                ellipsis: true,
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
