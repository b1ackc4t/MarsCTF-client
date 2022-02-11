<template>
    <div>
        <div class="card text-start">
            <div class="card-header">
                <div class="row">
                    <div class="col-8"><h3>优秀Writeup</h3></div>
                    <div class="col-4 align-self-center">
                        <button type="button" class="btn btn-lg btn-primary float-end" @click="enterEdit">我也来写</button>
                    </div>
                </div>
            </div>

            <div class="card-body">
                <div class="table-responsive">
                    <table class="table align-items-center mb-0">
                        <thead>
                        <tr>
                            <th class="text-uppercase text-secondary font-weight-bolder opacity-7">user</th>
                            <th class="text-uppercase text-secondary font-weight-bolder opacity-7 ps-2">score</th>
                            <th class="text-uppercase text-secondary font-weight-bolder opacity-7 ps-2">点赞数</th>
                            <th>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <div class="d-flex px-2">
                                    <div class="my-auto">
                                        <h6 class="mb-0">admin</h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="font-weight-normal mb-0">99</p>
                            </td>
                            <td>
                                <p class="font-weight-normal mb-0">2,500</p>
                            </td>
                            <td class="align-middle">
                                <i class="material-icons">thumb_up</i>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="d-flex px-2">
                                    <div class="my-auto">
                                        <h6 class="mb-0">admin</h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="font-weight-normal mb-0">99</p>
                            </td>
                            <td>
                                <p class="font-weight-normal mb-0">2,500</p>
                            </td>
                            <td class="align-middle">
                                <i class="material-icons">thumb_up</i>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="d-flex px-2">
                                    <div class="my-auto">
                                        <h6 class="mb-0">admin</h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="font-weight-normal mb-0">99</p>
                            </td>
                            <td>
                                <p class="font-weight-normal mb-0">2,500</p>
                            </td>
                            <td class="align-middle">
                                <i class="material-icons">thumb_up</i>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="d-flex px-2">
                                    <div class="my-auto">
                                        <h6 class="mb-0">admin</h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="font-weight-normal mb-0">99</p>
                            </td>
                            <td>
                                <p class="font-weight-normal mb-0">2,500</p>
                            </td>
                            <td class="align-middle">
                                <i class="material-icons">thumb_up</i>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="d-flex px-2">
                                    <div class="my-auto">
                                        <h6 class="mb-0">admin</h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="font-weight-normal mb-0">99</p>
                            </td>
                            <td>
                                <p class="font-weight-normal mb-0">2,500</p>
                            </td>
                            <td class="align-middle">
                                <i class="material-icons">thumb_up</i>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WPPart",
        props: {
            cid: Number
        },
        methods: {
            enterEdit() {
                this.$router.push({
                    name: 'editWP',
                    params: {
                        cid: this.cid
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>