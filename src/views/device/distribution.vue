<template>
    <Card class="rootContent">
        
        <div class="search">
            <Row span="24">
                <Col span="3">
                    <Select clearable class="search_input" placeholder="所属影院">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>
                
                <Col span="3">
                    <Select clearable class="search_input" placeholder="播放类别">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>

                <Col span="3">
                    <Input placeholder="出厂编号" class="searchInput search_input">
                        <Button slot="prepend" icon="ios-search"></Button>
                    </Input>
                </Col>
                
                <Col span="3">
                    <Input placeholder="解码卡号" class="searchInput search_input">
                        <Button slot="prepend" icon="ios-search"></Button>
                    </Input>
                </Col>

                <Col span="3">
                    <Input placeholder="机器型号" class="searchInput search_input">
                        <Button slot="prepend" icon="ios-search"></Button>
                    </Input>
                </Col>
                <Col span="1">
                    <Button type="text" @click="showMoreQuery">{{ moreQuery.text }}</Button>
                </Col>

                <Col span="8" class="text_align_right">
                    <Button type="primary">查询</Button>
                    <Button type="primary">清空条件</Button>
                    <Button type="primary">下载结果</Button>
                </Col>
            </Row>
            <Row style="margin-top:15px;" v-show="moreQuery.flag">
                <Col span="3">
                    <Select clearable class="search_input" placeholder="所属省">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>
                <Col span="3">
                    <Select clearable class="search_input" placeholder="所属市辖区">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>
                <Col span="3">
                    <Select clearable class="search_input" placeholder="所属区县">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
                    </Select>
                </Col>

                <Col span="3">
                    <Select clearable class="search_input" placeholder="厂商">
                        <Option v-for="item in cinemaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
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
        list: '/player/distribution'
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
                title: '播放器别名',
                width: 150,
                key: 'player_byname'
            },{
                title: '出厂编号',
                type: 'html',
                width: 200,
                key: 'player_factory_number'
            },{
                title: '解码卡号',
                width: 150,
                key: 'player_decipher_card'
            },{
                title: '设备型号',
                width: 150,
                key: 'player_factory_version'
            },{
                title: '模块编号',
                width: 100,
                key: 'player_messager_id'
            },{
                title: '放映员',
                width: 100,
                key: 'player_cinemas_runner_name'
            },{
                title: '放映方式',
                width: 100,
                key: 'player_usage'
            },{
                title: '使用情况',
                width: 150,
                key: 'express_type'
            },{
                title: '院线',
                width: 150,
                key: 'player_cinemas_name'
            },{
                title: '厂商',
                width: 150,
                key: 'player_factory_name'
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
                moreQuery: {
                    flag: false,
                    text: "高级筛选"
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
                    this.moreQuery.text = "收起高级筛选";
                    this.moreQuery.flag = true;
                }
            }
        }
    }
</script>