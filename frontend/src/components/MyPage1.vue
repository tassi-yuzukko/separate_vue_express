<template>
    <div>
        <h1>ここはページ1です</h1>
        <h3>user:{{ $store.state.userId }}</h3>
        <router-link to="/page2">ページ2へ</router-link>
    </div>
</template>
