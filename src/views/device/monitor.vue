<template>
    <Card class="rootContent">
        
        <div class="search">
            <Row span="24">
                <Col span="3">
                    <Select clearable class="search_input" placeholder="播放类别" v-model="query.player_byid">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>
               
                <Col span="3">
                    <Input placeholder="解码卡号" class="searchInput search_input input_icon" v-model="query.player_decipher_card"></Input>
                </Col>

                <Col span="3">
                    <Select clearable class="search_input" placeholder="所属地区" v-model="query.player_area_id">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>

                <Col span="3">
                    <Select clearable class="search_input" placeholder="所属影院" v-model="query.player_cinemas_id">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
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
        list: '/player/online'
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
                key: 'player_area_name'
            },{
                title: '播放器别名',
                key: 'player_byname'
            },{
                title: '解码卡号',
                key: 'player_decipher_card'
            },{
                title: '当前状态',
                key: 'player_online_status'
            },{
                title: '最后通讯时间',
                width: 180,
                key: 'player_online_login_time'
            },{
                title: '放映员',
                key: 'player_cinemas_runner_name'
            },{
                title: '院线',
                key: 'player_cinemas_name'
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
                    player_byid: "",
                    player_cinemas_id: "",
                    player_decipher_card: "",
                    player_area_id: ""
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
                    player_byid: "",
                    player_cinemas_id: "",
                    player_decipher_card: "",
                    player_area_id: ""
                };
            }
        }
    }
</script>
