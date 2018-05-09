<style lang="less" scoped>
    .imgList{
        display: flex;
        flex-wrap: wrap;
        li{
            position: relative;
            // margin-right: 10px;
            margin-bottom: 10px;
            //float: left;
            width: 20%;
            img{
                height: 100%;
                width: 100%;
                background-size: contain;
            }
            .info{
                padding: 10px 0 5px 10px;
                color: #fff;
                position: absolute;
                bottom: 0;
                left: 0;
                background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,1));
                opacity:0.7;
                font-size: 14px;
                width: 100%;
                display: none;
            }
            &:hover{
                .info{
                    display: block;
                }
            }
        }
    }
</style>

<template>
    <Card class="rootContent">
        <ul class="imgList">
            <li v-for="item in list" :key="item.id">
                <img :src="item.url" />
                <div class="info">
                    <p>解码器卡号：{{ item.player_decipher_card}}</p>
                    <p>拍照时间：{{ item.created_time}}</p>
                </div>
            </li>
        </ul>
    </Card>
</template>
<script>
export default {
    data(){
        return {
            list: [
                {
                    url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523891417396&di=a23fec73c8030ce5a53b750b096d18c0&imgtype=0&src=http%3A%2F%2Fpic.nipic.com%2F2007-12-29%2F200712299383135_2.jpg",
                    id: "1",
                    player_decipher_card: "DF01-12111",
                    created_time: "2018-02-12 18:00:23"
                },{
                    url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523891417396&di=a23fec73c8030ce5a53b750b096d18c0&imgtype=0&src=http%3A%2F%2Fpic.nipic.com%2F2007-12-29%2F200712299383135_2.jpg",
                    id: "1",
                    player_decipher_card: "DF01-12111",
                    created_time: "2018-02-12 18:00:23"
                },{
                    url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523891417396&di=a23fec73c8030ce5a53b750b096d18c0&imgtype=0&src=http%3A%2F%2Fpic.nipic.com%2F2007-12-29%2F200712299383135_2.jpg",
                    id: "1",
                    player_decipher_card: "DF01-12111",
                    created_time: "2018-02-12 18:00:23"
                },{
                    url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523891417396&di=a23fec73c8030ce5a53b750b096d18c0&imgtype=0&src=http%3A%2F%2Fpic.nipic.com%2F2007-12-29%2F200712299383135_2.jpg",
                    id: "1",
                    player_decipher_card: "DF01-12111",
                    created_time: "2018-02-12 18:00:23"
                },{
                    url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523891417396&di=a23fec73c8030ce5a53b750b096d18c0&imgtype=0&src=http%3A%2F%2Fpic.nipic.com%2F2007-12-29%2F200712299383135_2.jpg",
                    id: "1",
                    player_decipher_card: "DF01-12111",
                    created_time: "2018-02-12 18:00:23"
                },{
                    url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523891417396&di=a23fec73c8030ce5a53b750b096d18c0&imgtype=0&src=http%3A%2F%2Fpic.nipic.com%2F2007-12-29%2F200712299383135_2.jpg",
                    id: "1",
                    player_decipher_card: "DF01-12111",
                    created_time: "2018-02-12 18:00:23"
                }
            ]
        }
    },
    methods: {

    }
}
</script>

