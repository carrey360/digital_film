<template>
    <Card class="rootContent">
        
        <div class="search">
             <Row span="24">
                <Col span="3">
                    <Input placeholder="影片名称" class="searchInput search_input input_icon" v-model="query.movie_name"></Input>
                </Col>
                <Col span="3">
                    <DatePicker type="date" placeholder="开始放映时间" class="search_input" v-model="query.show_start_time"></DatePicker>
                </Col>
                <Col span="3">
                    <DatePicker type="date" placeholder="结束放映时间" class="search_input" v-model="query.show_finish_time"></DatePicker>
                </Col>
                
                <Col span="15" class="text_align_right">
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
        list: '/movie/rank/statistics'
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
                key: 'movie_name',
                align: 'center'
            },{
                title: '放映场次',
                key: 'num',
                align: 'center'
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
                query: {
                    movie_name: "",
                    show_start_time: "",
                    show_finish_time: ""
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
                    movie_name: "",
                    show_start_time: "",
                    show_finish_time: ""
                };
            }
        }
    }
</script>