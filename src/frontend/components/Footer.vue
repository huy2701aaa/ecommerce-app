<script lang="ts" setup>

</script>
<template>
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="footer-col">
                    <h4>Cửa hàng</h4>
                    <ul>
                        <li><a href="#">Chúng tôi</a></li>
                        <li><a href="#">Dịch vụ</a></li>
                        <li><a href="#">Giấy phép</a></li>
                        <li><a href="#">Chương trình ưu đãi 24h</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Trợ giúp</h4>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Vận chuyển</a></li>
                        <li><a href="#">Hoàn trả</a></li>
                        <li><a href="#">Trạng thái đặt hàng</a></li>
                        <li><a href="#">Tuỳ chọn thanh toán</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Trực tuyến</h4>
                    <ul>
                        <li><a href="#">Đồng hồ</a></li>
                        <li><a href="#">Túi sách</a></li>
                        <li><a href="#">Giày dép</a></li>
                        <li><a href="#">Trang trí</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Theo dõi chúng tôi</h4>
                    <div class="social-links">
                        <a href="#"><i class="pi pi-facebook"></i></a>
                        <a href="#"><i class="pi pi-twitter"></i></a>
                        <a href="#"><i class="pi pi-instagram"></i></a>
                        <a href="#"><i class="pi pi-globe"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    margin: auto;
    padding-left:  200px;
}

.row {
    display: flex;
    flex-wrap: wrap;
}

ul {
    list-style: none;
}

.footer {
    background-color: #F7F7F8;
    padding: 70px 0;
    width: 100%;
    margin-top: 50px;
    color: gray;
}

.footer-col {
    width: 25%;
    padding: 0 15px;
}

.footer-col h4 {
    font-size: 18px;
    color: #333;
    text-transform: capitalize;
    margin-bottom: 35px;
    font-weight: 500;
    position: relative;
}

.footer-col h4::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    background-color: #e91e63;
    height: 2px;
    box-sizing: border-box;
    width: 50px;
}

.footer-col ul li:not(:last-child) {
    margin-bottom: 10px;
}

.footer-col ul li a {
    font-size: 16px;
    text-transform: capitalize;
    color: #333;
    text-decoration: none;
    font-weight: 300;
    color: gray;
    display: block;
    transition: all 0.3s ease;
}

.footer-col ul li a:hover {
    color: #333;
    padding-left: 8px;
}

.footer-col .social-links a {
    display: inline-block;
    height: 40px;
    width: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    margin: 0 10px 10px 0;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    color: #333;
    transition: all 0.5s ease;
}
</style>