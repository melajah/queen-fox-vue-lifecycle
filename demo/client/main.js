new Vue({
  el: "#app",
  data: {
    message: "sudah jalan?",
    emailLogin: "",
    passwordLogin: "",
    isLoggedIn: false,
    infected: [],
    nameInfected: "",
    statusInfected: "",
    textMsg: "kurang 5 huruf",
    statusSumbit: false,
    msgLogin: ""
  },
  computed: {
    getInfectedBySembuh() {
      const sembuh = []
      this.infected.forEach((val) => {
        if (val.status === "sembuh") {
          sembuh.push(val)
        }
      })
      return sembuh
    },
    getInfectedBySakit() {
      const sakit = []
      this.infected.forEach((val) => {
        if (val.status === "sakit") {
          sakit.push(val)
        }
      })
      return sakit
    }
  },
  methods: {
    login() {
      // asumsikan ada proses hit kerserver
      // saya akan token
      const token = "ini adalah token"
      localStorage.setItem("token", token);
      this.isLoggedIn = true
      this.getInfected()
    },
    getInfected() {
      axios({
        method: "get",
        url: "http://localhost:3000/infected"
      })
      .then(response => {
        console.log(response.data)
        this.infected = response.data
      })
      .catch(console.log)
    },
    addInfected() {
      if (this.nameInfected.length < 5) {
        this.textMsg = "huruf masih kurang dari 5"
      }else {
        axios({
          method: "post",
          url: "http://localhost:3000/infected",
          data: {
            name: this.nameInfected,
            status: this.statusInfected,
          }
        })
        .then(response => {
          this.infected.push({
            id: response.data.id,
            name: response.data.name,
            status: response.data.status,
          })
        })
        .catch(console.log)
      }
    },
    logout() {
      localStorage.clear()
      this.isLoggedIn = false
    }
  },
  // watch
  watch: {
    nameInfected(newVal, oldVal) {
      console.log(oldVal, "<<< ini adalah value yang lama")
      console.log(newVal, "<<< ini adalah value yang baru")

      if (newVal.length > 5) {
        this.textMsg = "text sudah melewati 5 huruf"
        this.statusSumbit = true
      }else {
        this.textMsg = "text baru " + newVal.length + "huruf"
        this.statusSumbit = false
      }
    },
    isLoggedIn(newVal) {
      if (newVal) {
        this.msgLogin = "anda sudah login ..."
      }else {
        this.msgLogin = "anda sudah logout ..."
      }
    },
    msgLogin(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.msgLogin = ""
        }, 3000)
      }
    }
  },
  created() {
    console.log("ini created")
    // console.log("$el", this.$el)
    // console.log(document.getElementById("app"))
    // kita ingen ngcek token apakah ada atau tidak

    const token = localStorage.token
    if (token) {
      this.isLoggedIn = true
      this.getInfected()
    }

    // ketika kita ingin mengambil data ke server.
  },
  mounted() {
    console.log("ini mounted")
    // console.log("$el", this.$el)
    // console.log(document.getElementById("app"))
    // dom manipulasi
    // library canvas
  }
})

// saya ingin membuat aplikasi, nama corona app
// ada login, get infected, add infected