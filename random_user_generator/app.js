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
                canvas_width: "400",
                canvas_height: "100",
                x: 10,
                y:10,
                current_x:0,
                current_y:0,
            }
        },
        mounted() {
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

            }
        }
    }
)
app.mount('#app')

