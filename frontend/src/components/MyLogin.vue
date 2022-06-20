<!-- https://qiita.com/Shiho_anyplus/items/f76422ff3ea03f088b20 を参考にしている -->

<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-4">
                <v-btn color="orange" outlined rounded style="font-weight: bold;" @click='post1'>click me</v-btn>

                <v-form ref="entryForm" @submit.prevent="post2">
                    <v-text-field v-model="textBuf" label="入力してください" r></v-text-field>
                    <v-btn color="orange" outlined rounded style="font-weight: bold;" type="submit">Send</v-btn>
                </v-form>
            </v-col>
        </v-row>
        <div class="login">
            <h2>Sign in</h2>
            <div class="container" style="width:500px">
                <div class="row align-items-center">
                    <div class="col-md-4">アカウント名</div>
                    <div class="col-md-3">
                        <input v-model="authId" type="text" placeholder="Username">
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-md-4">パスワード</div>
                    <div class="col-md-3">
                        <input v-model="authPass" type="password" placeholder="Password">
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-md-12">
                        {{ msg }}
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-md-12">
                        <button class="btn btn-info btn-block login" v-on:click="post">ログイン</button>
                    </div>
                </div>
            </div>
        </div>
    </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
    margin-top: 20px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
}

input {
    margin: 10px 0;
    padding: 10px;
}
</style>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import store from '../store'
import Methods from '../api/methods'

export type DataType = {
    showPassword: boolean;
    msg: string;
    authId: string;
    authPass: string;
    textBuf: string;
}

export default defineComponent({

    name: 'MyLogin',
    data(): DataType {
        return {
            showPassword: false,
            msg: 'userIDとpasswordを入力して下さい',
            authId: '',
            authPass: '',
            textBuf: ''
        }
    },
    methods: {
        async post() {
            this.msg = await Methods.loginPosting(this.authId, this.authPass)    // バックエンド側にPOST
                .then(function (response) {
                    console.log(response);
                    return response.data.message;
                })
                .catch(function (error) {
                    console.log(error);
                    return error.message;
                });

            if (this.msg == 'OK') {
                store.dispatch("fetch", this.authId);
                this.$router.push('/Page1');
            }
        },
        // サーバーから返ってくる値をログに出力したいのでasyncとawaitを行う
        async post1() {
            let response = await Methods.testPosting()
            console.log(response)
        },
        async post2() {
            let response = await Methods.addPosting(this.textBuf)
            console.log(response)
        }
    }
});


export function extend(arg0: { name: string; data(): { showPassword: boolean; msg: string; authId: string; authPass: string; }; methods: { post(): Promise<void>; }; }) {
    throw new Error("Function not implemented.");
}
</script>