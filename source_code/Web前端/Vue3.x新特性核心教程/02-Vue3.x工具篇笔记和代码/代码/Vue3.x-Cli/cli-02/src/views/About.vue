<template>
  <div class="about">
    <h1>This is an about page {{search}}</h1>
  </div>
</template>

<script>
  export default {
    name: "About",

    props : {
      search : {
        type : String,
        default : 'no'
      }
    }
  }
</script>
