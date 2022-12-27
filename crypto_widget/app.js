

const app = Vue.createApp(
    {

        data() {
            return {

                asset_name: "BTCBUSD",
                assets_data: {},
                price: 0,
                price_24_stats: 0,
                order_book_depth:1,
                bids: 0,
                asks: 0,
                base_url:"https://api.binance.com/api/v3/",

                price_color: "white",
                last_price: 0,

                //
                // bitcoin_price: 0,
                // plans: [],
                // prices: [],
                // button_name: 'hi',
                // message: 'Hello, Ibra!',
                // counter: 0,
                // firstName: 'John',
                // lastName: 'Doe',
                // email: 'john@gmail.com',
                // gender: 'male',
                // picture: 'https://randomuser.me/api/portraits/men/10.jpg',
                // prefix: '',
                // start_time: '',
                // timer: '',
                // canvas_width: "400",
                // canvas_height: "100",
                // x: 10,
                // y:10,
                // current_x:0,
                // current_y:0,

            }
        },
        mounted() {


            const update_price_interval = setInterval(() => {
              this.update_price();
            }, 200);


            const update_price_24_stats_interval = setInterval(() => {
              this.update_price_24_stats();
            }, 500);

            const update_order_book_interval = setInterval(() => {
              this.update_order_book();
            }, 100);


        },

        methods: {
            get_plans(){

                this.plans =['The single', 'The curios', 'The addict'];
            },

            get_prices(){
                var prices = {}
                for (var plan of this.plans) {
                    prices[plan] = 10
                }
                this.prices = prices
            },



            get_prefix(){

                if (this.gender == 'male'){
                    return '(he/him)'
                }
                else {
                    return "(she/her)"
                }
            },

            get_current_time_in_sec(){
                var currentDateTime = new Date();
                return currentDateTime.getTime() / 1000;
            },

            reset_timer(){
                this.start_time = this.get_current_time_in_sec()

                var canvas = document.getElementById("myCanvas");
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
                ctx.stroke();
                this.current_x = 0;
                this.current_y = 0;
                this.x = 0;
                this.y = 0;

            },

            update_timer(){
                this.timer = this.get_current_time_in_sec() - this.start_time
                this.timer = parseFloat(this.timer).toFixed(0)
            },

            update_plot(){
                this.current_x = this.x;
                this.current_y = this.y;
                this.x += 1;
                this.y += 1;
                var canvas = document.getElementById("myCanvas");
                var ctx = canvas.getContext("2d");
                ctx.moveTo(this.current_x,this.current_y);
                ctx.lineTo(this.x,this.y);
                ctx.strokeStyle = 'white';

                ctx.stroke();

            },

            update_message(){
                this.counter += 1
                this.message = this.message + this.counter;

            },

            async get_account_info(){
                const { Spot } = require('@binance/connector')
                const apiKey = '3AJaggUYYg6kp2vUKLWS1omkhWBhxG0HCLLNyFwMTrtK3Ks1VXLvYZ2pSlBdDdmP'
                const apiSecret = 'XHNJQzUUpPrBOLHDBQz7g6K6krtTQ4f7yzVXVcbRDGdjUOXknPUgb8IS04EsFVXS'
                const client = new Spot(apiKey, apiSecret)
                // Get account information
                client.account().then(response => this.bitcoin_price = response.data)
            },

            async get_bitcoin_price(){

                const url = "https://api.binance.com/api/v3/depth?symbol=BNBBUSD&limit=5";
                const response = await fetch(url);
                var data = await response.json();
                console.log(data);
                this.bitcoin_price = data;



            },

            update_price(){
                this.get_asset_price(this.asset_name);
            },

            async get_asset_price(asset_name){
                const url = this.base_url + "ticker?symbol=" + asset_name;
                const response = await fetch(url);
                const data = await response.json();
                // console.log(data.lastPrice);
                // this.price = data.lastPrice.toFixed(2);
                this.price = (Math.round(data.lastPrice * 100) / 100).toFixed(2)
                if (this.price > this.last_price){
                    this.price_color = "green";

                // } else if (this.price === this.last_price) {
                //     this.price_color = "white";

                } else {
                    this.price_color = "red";
                }
                this.last_price = this.price;
                // return data.lastPrice;
            },



             update_price_24_stats(){
                this.get_asset_price_24_stats(this.asset_name)
            },

            async get_asset_price_24_stats(asset_name){
                const url = this.base_url + "ticker/24hr?symbol=" + asset_name;
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                this.price_24_stats = (Math.round(data.priceChangePercent * 100) / 100).toFixed(2)
                // return data.priceChangePercent;
            },


            update_order_book(){
                this.get_order_book(this.asset_name, this.order_book_depth)
            },

            async get_order_book(asset_name, depth){
                const url = this.base_url + "depth?symbol=" + asset_name + "&limit=" + depth;
                const response = await fetch(url);
                const data = await response.json();

                // var bids_price  = data.bids[0][0]
                // var asks_price = data.asks[0][0]
                // console.log(asks_price);
                this.bids = (Math.round(data.bids[0][0] * 100) / 100).toFixed(2)
                this.asks = (Math.round(data.asks[0][0] * 100) / 100).toFixed(2)
                // return data.priceChangePercent;
            },


        }
    }
)



.component('crypto-widget', {
    // template: '#temp-crypto-widget',
    template: "<div class=\"crypto-widget\">\n" +
        "        <div class=\"l-label-title\">\n" +
        "            {{asset_name}}\n" +
        "        </div>\n" +
        "          <div class=\"xxxl-label\" :style=\"{color: price_color}\">\n" +
        "            {{price}}\n" +
        "        </div>\n" +
        "          <div class=\"m-label\">\n" +
        "           24hr: {{price_24_stats}} %\n" +
        "        </div>\n" +
        "\n" +
        "          <div  class=\"m-label-bids\">\n" +
        "           Bids: {{bids}}\n" +
        "        </div>\n" +
        "\n" +
        "          <div class=\"m-label-asks\">\n" +
        "           Asks: {{asks}}\n" +
        "        </div>\n" +
        "\n" +
        "      </div>",
    props: ['asset_name', 'price', 'price_24_stats', 'bids', 'asks', 'price_color']
})


app.mount('#app')

