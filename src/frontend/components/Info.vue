<script lang="ts" setup>

</script>

<template>
    <div class="info-list">
        <div class="info">
            <i class="pi pi-dollar"></i>
            <h2>GIÁ CẢ ƯU ĐÃI</h2>
            <span></span>
        </div>

        <div class="info">
            <i class="pi pi-box"></i>
            <h2>SẢN PHẨM KIỂM ĐỊNH</h2>
            <span></span>
        </div>

        <div class="info">
            <i class="pi pi-whatsapp"></i>
            <h2>HỖ TRỢ 24 / 7</h2>
            <span></span>
        </div>

        <div class="info">
            <i class="pi pi-truck"></i>
            <h2>GIAO HÀNG NHANH</h2>
            <span></span>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .info-list{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 50px;
        padding: 0 250px;

        .info{
            width: 356px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #F7F7F8;
            border-radius: 5px;
            border: 1px solid #e9e9e9;
            height: 182px;
            text-align: center;
            padding: 10px;
            margin: 0 10px;

            i{
                font-size: 50px;
                color: #3F51B5;
                margin-bottom: 20px;
            }

            h2{
                font-weight: 400;
            }

            span{
                color: gray;
            }
        }
    }
</style>
