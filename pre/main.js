new Vue({
  el: "#app",
  data: {
    formLogin: {
      email: "",
      password: ""
    },
    isLoggedIn: false,
    formCovid: {
      name: "",
      status: "" // sakit, sembuh
    },
    terkonfirmasi: [],
    jumlahSakit: 0,
    jumlahSembuh: 0
  },
  computed: { // function getter
    getCovidBySembuh() {
      const sembuh = []
      this.terkonfirmasi.forEach((val) => {
        (val.status == "sembuh") ? sembuh.push(val) : null
      })
      return sembuh
    },
    getCovidBySakit() {
      const sakit = []
      this.terkonfirmasi.forEach((val) => {
        (val.status == "sakit") ? sakit.push(val) : null
      })
      return sakit
    },
  },
  methods: {
    login() {
      // ada proses ajax atau request login ke server
      localStorage.setItem("token", "ini adalah token");
      this.isLoggedIn = true
      this.getCovid()
    },
    addCovid() {
      const covid = {
        name: this.formCovid.name,
        staus: this.formCovid.status,
      }
      console.log("asa", covid)
      const oldData = JSON.parse(JSON.stringify(this.terkonfirmasi)) 
      oldData.push(JSON.parse(JSON.stringify(this.formCovid)))
      this.terkonfirmasi = oldData
    },
    getCovid() {
      // proses hit ke server
      const data = [ // result dari server
        {
          name: "koni",
          status: "sakit"
        },
        {
          name: "joni",
          status: "sakit"
        },
        {
          name: "ciwa",
          status: "sembuh"
        },
        {
          name: "onita",
          status: "sakit"
        },
      ]
      this.terkonfirmasi = data
    }
  },
  created() {
    const token = localStorage.token
    if (token) {
      this.isLoggedIn = true
      this.getCovid()
    }

    // bisa digunakan untuk fetch data
  },
  watch: {
   getCovidBySembuh(newVal, oldVal)  {
    console.log(oldVal.length, ">>>> data sebelumnya")
    console.log(newVal.length, ">>>> terbaru")
   },
   jumlahSembuh(newVal, oldVal)  {
    console.log(oldVal.length, ">>>> data sebelumnya")
    console.log(newVal.length, ">>>> terbaru")
   },
  }
})

// saya ingin membuat aplikasi covid. bisa memanbahnkan data covid terbaru, entah itu yang ter-kena virus atau yang sembuh.
// di aplikasi bisa menampilkan jumlah yang terkena covid
// 