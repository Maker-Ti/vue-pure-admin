<template>
  <router-view />
</template>
<style>

  .blue-icon{
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background: #409EFF;
    color: #fff;
    text-align: center;
    font-size: 13px;
    padding-top: 2px;

  }
  .app-main{
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .app-body{
    margin: 0.5%;
    padding: 5px;
    width: 99%;
    height: 96%;
    background: #fff;
    border-radius: 5px;
    overflow-y: auto;
  }
  .blue-divide{
    width: 4px;
    height: 100%;
    background: #5f62ff;
    border-radius: 4px;
  }
  .grey-divide-hor{
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;

    border-radius: 2px;
    height: 2px;
    background: #9b9b9b;

  }
  .roundIcon{
    border-radius: 50%;
  }
  .inline{
    display: inline-block;
    vertical-align: top
  }
</style>