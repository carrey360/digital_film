<template>
    <Card class="rootContent">
        
        <div class="search">
            <Row span="24">
                <Col span="3">
                    <Select clearable class="search_input" placeholder="所属影院" v-model="query.player_cinemas_id">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>
                <Col span="3">
                    <Select clearable class="search_input" placeholder="类型" v-model="query.movie_type">
                        <Option v-for="item in movieTypeList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>
                <Col span="3">
                    <DatePicker type="date" placeholder="开始放映时间" class="search_input" v-model="query.show_start_time"></DatePicker>
                </Col>
                <Col span="3">
                    <DatePicker type="date" placeholder="结束放映时间" class="search_input" v-model="query.show_finish_time"></DatePicker>
                </Col>
                <Col span="3">
                    <Input placeholder="影片名称" class="searchInput search_input input_icon" v-model="query.movie_name"></Input>
                </Col>
                <Col span="1">
                    <Button type="text" @click="showMoreQuery">{{ moreQuery.text }}</Button>
                </Col>
                <Col span="8" class="text_align_right">
                    <Button type="primary" @click="btnQuery">查询</Button>
                    <Button type="primary" @click="resetQuery">清空条件</Button>
                </Col>
            </Row>

            <Row span="24" style="margin-top:15px;" v-show="moreQuery.flag">
                <Col span="3">
                    <Select clearable class="search_input" placeholder="所属区县" v-model="query.player_area_id">
                        <Option v-for="item in addressList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>
                <Col span="3">
                    <Select clearable class="search_input" placeholder="是否有效" v-model="query.show_check_state">
                        <Option value="1">有效</Option>
                        <Option value="2">无效</Option>
                    </Select>
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
        list: '/movie/abnormal/statistics'
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
                width: 150,
                key: 'player_area_name'
            },{
                title: '院线',
                width: 150,
                key: 'movie_fid'
            },{
                title: '设备别名',
                width: 150,
                key: 'movie_supply_name'
            },{
                title: '解码卡号',
                width: 200,
                key: 'player_decipher_card'
            },{
                title: '放映员',
                width: 150,
                key: 'player_cinemas_runner_name'
            },{
                title: '影片编号',
                width: 200,
                key: 'player_cinemas_id'
            },{
                title: '影片名称',
                width: 150,
                key: 'movie_name'
            },{
                title: '影片类型',
                width: 150,
                key: 'movie_type'
            },{
                title: '开始时间',
                width: 180,
                key: 'show_start_time'
            },{
                title: '结束时间',
                width: 180,
                key: 'show_finish_time'
            },{
                title: '异常原因',
                width: 200,
                key: 'show_check_state'
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
                cinemaList: Util.getCinemasList(),
                movieTypeList: Util.getMovieTypeList(),
                addressList: Util.addressList(),
                moreQuery: {
                    flag: false,
                    text: "高级筛选"
                },
                query: {
                    movie_name: "",
                    show_start_time: "",
                    show_finish_time: "",
                    player_cinemas_id: "",
                    movie_type: "",
                    player_area_id: "",
                    show_check_state: ""
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
            showMoreQuery(){
                if(this.moreQuery.flag){
                    this.moreQuery.text = "高级筛选";
                    this.moreQuery.flag = false;
                }else{
                    this.moreQuery.text = "收起高级";
                    this.moreQuery.flag = true;
                }
            },
            btnQuery(){
                this.getTablesListData(1);
            },
            resetQuery(){
                this.query = {
                    movie_name: "",
                    show_start_time: "",
                    show_finish_time: "",
                    player_cinemas_id: "",
                    movie_type: "",
                    player_area_id: "",
                    show_check_state: ""
                };
            }
        }
    }
</script>
