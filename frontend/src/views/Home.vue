<template>
  <div class="dashboard">
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="https://a.storyblok.com/f/39898/1024x1024/dea4e1b62d/vue-js_logo-svg.png" width="40" height="40">
      </a>
      <div>
        <img :src="$auth.user.picture" width="30" height="30">
        <span class="text-muted font-weight-light px-2">{{$auth.user.name}} </span>
        <button type="button" class="btn btn-outline-secondary btn-sm" style="margin-left: 10px;"><a href="/">Home</a></button>
        <button type="button" class="btn btn-outline-secondary btn-sm" style="margin-left: 10px;"><a href="/admin">Admin</a></button>
        <button type="button" class="btn btn-outline-secondary btn-sm" style="margin-left: 10px;"><a href="/about">About</a></button>
        <button type="button" class="btn btn-outline-secondary btn-sm" style="margin-left: 10px;" @click="$auth.logout()">Logout</button>
      </div>
    </nav>
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-4">Admin Page</h1>
        <hr class="my-4">
        <p class="lead">
          This is admin page.
        </p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-4">
          <div class="form-group">
            <input type="text" class="form-control" id="username" placeholder="UserName" v-model="username">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <input type="text" class="form-control" id="email" placeholder="Email" v-model="email">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <button v-if="editevent===false" type="button" class="btn btn-success" @click= "CreateData">Create</button>
            <button v-if="editevent" type="button" class="btn btn-success" @click= "editdatasend">Edit</button>
          </div>
        </div>
      </div>
      <div>
        <h3>Test table</h3>
        <table class="table">
          <thead>
            <tr>
              <th>UserName</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tabledata">
              <td>{{ item.email }}</td>
              <td>{{ item.password }}</td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-success" @click="editdata(item)">Edit</button>
                  <button type="button" class="btn btn-danger" @click="deldata(item.id)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      email: '',
      tabledata: [],
      editevent: false,
      editid:'',
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    getdata: function(){
      axios.post('http://localhost:4000/api/users/getuser',{
        id:this.$auth.user.name
      })
      .then((res)=>{
        this.tabledata = res.data.rows
      })
    },
    CreateData: function(){
      axios.post('http://localhost:4000/api/users', {
        email:this.username,
        password: this.email,
        username: this.$auth.user.name
      })
      .then((res)=>{
        if(res.status === 201){
          this.getdata()
          this.username = '';
          this.email = '';
        }
      })
    },
    editdata: function(item){
      this.username = item.email;
      this.email = item.password;
      this.editid = item.id;
      this.editevent = true;
    },
    editdatasend: function(item){
      axios.post('http://localhost:4000/api/users/edituser', {
        email:this.username,
        password: this.email,
        username: this.$auth.user.name,
        id: this.editid
      })
      .then((res)=>{
        if(res.status === 201){
          this.getdata()
          this.username = '';
          this.email = '';
          this.editevent = false;
        }
      })
    },
    deldata: function(id){
      axios.post('http://localhost:4000/api/users/deluser',{
        id: id
      })
      .then((res)=>{
        if(res.status === 201){
          this.getdata()
        }
      })
    }
  }
}
</script>

<style scoped>
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');

.btn-primary {
  background: #468f65;
  border: 1px solid #468f65;
}
.card {
  text-decoration: none;
  color: #000;
}
</style>
