new Vue({
  el: "#app",
  data: {
    formLogin: {
      email: "",
      password: ""
    },
    formCovid: {
      name: "",
      status: ""
    },
    isLoggedIn: false,
    covid: [],
    countNewCorona: 0,
    statusAlert: false,
    textAlert: ""
  },
  computed: {
    getCoronaBySakit() {
      const sakit = [];
      this.covid.forEach((item) => {
        item.status === "sakit" ? sakit.push(item) : ""
      })
      return sakit
    },
    getCoronaBySembuh() {
      const sembuh = [];
      this.covid.forEach((item) => {
        item.status === "sembuh" ? sembuh.push(item) : ""
      })
      return sembuh
    }
  },
  methods: {
    login() {
      // asumsikan saya hit keserver
      // setelah proses saya ingin menyimpan token
      const token = "ini adalah token";
      this.isLoggedIn = true
      localStorage.setItem("token", token);
      this.getCorona()
    },
    getCorona() {
      // asumsikan menembak ke server
      const result = [
        {
          name: "koni",
          status: "sakit"
        },
        {
          name: "ciwa",
          status: "sembuh"
        },
        {
          name: "ciwok",
          status: "sakit"
        },
      ]

      this.covid = result
    },
    addCovid() {
      const newCovid = JSON.parse(JSON.stringify(this.formCovid))
      this.covid.push(newCovid)
    },
    logout() {
      this.isLoggedIn = false
      localStorage.clear()
    }
  },
  created() {
    console.log("ini created")
    console.log(this.$el)
    // untuk mengecek token.
    const token = localStorage.token
    if (token) {
      this.isLoggedIn = true
      this.getCorona()
    }
    // untuk proses mengambil data pertamakali / proses async
  },
  mounted() {
    console.log("ini mounted")
    console.log(this.$el)
    // memanipulasi dom
  },
  watch: {
    isLoggedIn(newData, oldData) {
      if (newData) {
        this.textAlert = "login berhasil ..."
        this.statusAlert = true
      }else{
        this.textAlert = "logout berhasil ..."
        this.statusAlert = true
      }
    },
    statusAlert(newData) {
      if (newData) {
        setTimeout(() => {
          this.statusAlert = false
        }, 4000)
      }
    }
  }
})

const sa = {

}

let j = {
  b: asa
}
sa.a = j


// fitur login
// membuat aplikasi korona. input korona, menampilkan list korona