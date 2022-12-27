// const app = Vue.createApp({
//   data() {
//     return {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john@gmail.com',
//       gender: 'male',
//       picture: 'https://randomuser.me/api/portraits/men/10.jpg',
//     }
//   },
//   methods: {
//     async getUser() {
//       const res = await fetch('https://randomuser.me/api')
//       const { results } = await res.json()
//
//       // console.log(results)
//
//       this.firstName = results[0].name.first
//       this.lastName = results[0].name.last
//       this.email = results[0].email
//       this.gender = results[0].gender
//       this.picture = results[0].picture.large
//     },
//   },
// })


const app = Vue.createApp(
    {

        data() {
            return {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@gmail.com',
                gender: 'male',
                picture: 'https://randomuser.me/api/portraits/men/10.jpg',
                prefix: '',
                start_time: '',
                timer: '',
                canvas_width: 1200,
                canvas_height: 600,
                x: 0,
                y:0,
                current_x:0,
                current_y:0,
                buffer_length: 10,
                data_buffer_x: [],
                data_buffer_y: [],
                canvas: null,



            }
        },
        mounted() {
            var canvas = document.getElementById("myCanvas")
            var ctx = canvas.getContext("2d");
            ctx.moveTo(this.current_x,this.canvas_height- this.current_y);
            this.prefix = this.get_prefix();
            this.start_time = this.get_current_time_in_sec()





            const intervalId = setInterval(() => {
              this.update_timer();
            }, 1000);

            const updatePlotInterval = setInterval(() => {
              this.update_plot();
            }, 100);


        },

        methods: {
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



            update_timer(){
                this.timer = this.get_current_time_in_sec() - this.start_time
                this.timer = parseFloat(this.timer).toFixed(0)
            },

            update_plot(){


                ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
                ctx.stroke();
                this.x += 10;
                this.y = Math.floor(Math.random() * this.canvas_height) + 1;

                if (this.data_buffer_x.length < this.buffer_length ) {
                    this.data_buffer_x.push(this.x);
                    this.data_buffer_y.push(this.y);
                } else {
                    this.data_buffer_x.shift();
                    this.data_buffer_x.push(this.x);
                    this.data_buffer_y.shift();
                    this.data_buffer_y.push(this.y);
                }

                for (let i = 0; i < this.data_buffer_x.length; i++) {
                    this.x = this.data_buffer_x[i];
                    this.y = this.data_buffer_y[i];
                    ctx.lineTo(this.x,this.canvas_height - this.y);
                    this.current_x = this.x;
                    this.current_y = this.canvas_height - this.y;
                    ctx.moveTo(this.current_x,this.current_y);
                    ctx.strokeStyle = 'white';

                }
                ctx.stroke();






            }
        }
    }
)
app.mount('#app')

