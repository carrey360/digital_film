<style lang="less" scoped>
    html,body,#map{
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin: 0;
        font-family: "微软雅黑";
        
    }
</style>
<style lang="less">
    ul{
        list-style: none;
        .mapli{
            display: flex;
            width: 260px;
            .title{
                width:100px;
                text-align:right;
            }
            .content{
                margin-left:15px;
            }
        }
    }
</style>


<template>
    <div class="map" id="map"></div>
</template>

<script>
    import Util from '@/libs/util';

    const urlMap = {
        list: '/player/online'
    }

    let markerIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAAEhcmxxAAAAAXNSR0IArs4c6QAAAVtJREFUKBV1US1Mw1AQvntN9kOmQEIyEjqFgGIWEkKCRwJmIQGF2gSgQK8KEHMoSMgMINFgSGBqNQgCAhKQqA5Yl7bH+17XbBOceL133/ddv3dHpMOpR1Vz+F0RWnDDRxIdJkOCoPVLyWiiDwHdPidVpx6KatzFpoiDQXt9iYLjNYvK00SVs5jev8hDf/87SGTpCTlDpsE2kcwjR+Ty1lQKVPXdZZanGdtavtrgHjtu5BXHaa65raj1RrR3HZFdsrK6TZi2Nl/YxHMUeg4HnInwrAE6wQCCXR0HvHgik93f6GMAsdc+tBzjKgHjm2HLAyIy9nJ5tfqwy59spkvSKE4wXWwpKmRHqfj95jmmJBDWINBTlsL9vkVjmVFyevvpES0dRRB0FIYDALP4L1IM3P6S4hb8w1ZtRZllQQwiNtq349klVTaPBphsN97RXSqYH2roqPOmJp5iPaj9AbbXyF95UHbxAAAAAElFTkSuQmCC";

    export default {
        data () {
            return {
                limit: Util.limit,
                page: 1,
                map: ""
            }
        },
        mounted(){
            this.init();
            this.getMapListData(1);
            window.addEventListener('resize', this.setMapHeight);
        },
        methods: {
            init(){
                this.setMapHeight();
                this.map = new BMap.Map("map", {enableMapClick:false});    // 创建Map实例
                this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
                //添加地图类型控件
                this.map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));	  
                this.map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
                this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            },
            setMapHeight(){
                if(document.getElementById("map")){
                    document.getElementById("map").style.height = document.documentElement.clientHeight - 50 + "px";
                }
            },
            getMapListData(page){
                let params = {};
                Util.getData(urlMap.list, params).then((res) => {
                    if(res){
                        // this.tableData = res;
                        this.addMarker(res.data);
                    }
                });
            },
            addMarker(list){
                let myIcon = new BMap.Icon(markerIcon, new BMap.Size(12,12));

                (list|| []).map(item => {
                    let sContent =
                    "<ul>" + 
                    "<li class='mapli'><div class='title'>所属区县：</div><div class='content'>" + item.player_area_name +"</div></li>"+
                    "<li class='mapli'><div class='title'>所属乡镇：</div><div class='content'>" + item.player_area_name +"</div></li>"+
                    "<li class='mapli'><div class='title'>解码卡号：</div><div class='content'>" + item.player_decipher_card +"</div></li>"+
                    "<li class='mapli'><div class='title'>设备别名：</div><div class='content'>" + item.player_byname +"</div></li>"+
                    "<li class='mapli'><div class='title'>放映员：</div><div class='content'>" + item.player_cinemas_runner_name +"</div></li>"+
                    "<li class='mapli'><div class='title'>出厂编号：</div><div class='content'>" + item.player_area_name +"</div></li>"+
                    "<li class='mapli'><div class='title'>最后通讯时间：</div><div class='content'>" + item.player_online_login_time +"</div></li>"+
                    "<li class='mapli'><div class='title'>最后定位时间：</div><div class='content'>" + item.player_online_login_time +"</div></li>"+
                    "<li class='mapli'><div class='title'>最后位置：</div><div class='content'>" + item.player_cinemas_name +"</div></li>"+
                    "</ul>";
                    let point = new BMap.Point(item.player_online_longitude, item.player_online_latitude);
        
                    let marker = new BMap.Marker(point, {icon:myIcon});
                    let infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
                    this.map.centerAndZoom(point, 15);
                    this.map.addOverlay(marker);
                    marker.addEventListener("click", function(){          
                        this.openInfoWindow(infoWindow);
                    });
                });
            }
        }
    }
</script>


