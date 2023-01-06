const { createApp } = Vue;
const app = {
    // 資料
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "tttom3669",
            products: [],
            tempProduct: {},
        }
    },
    methods: {
        //檢查登入狀況
        checkLogin() {
            //取出token
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            // headers夾帶token (有儲存時)
            axios.defaults.headers.common['Authorization'] = token;
            axios.post(`${this.url}/api/user/check`).then((res) => {
                this.render();
            }).catch((err) => {
                alert('請重新登入');
                window.location = 'login.html';
            });
        },
        getProducts() {
            axios.get(`${this.url}/api/${this.path}/admin/products`).then((res) => {
                this.products = res.data.products;
            }).catch((err) => {
                console.log(err);
            });
        },
        render() {
            this.getProducts();
        },
        //產品細節展開
        getItemProduct(item) {
            this.tempProduct = { ...item };
        },
    },
    mounted() {
        this.checkLogin();
    },
};

createApp(app).mount("#app"); //渲染至畫面上
