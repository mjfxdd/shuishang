<template>
    <div>
        <form action="http://47.105.137.32:8080/ERService/excel/importAthletesExcel" method="POST" enctype="multipart/form-data">
            sheetNo:<input type="text" name="sheetNo"><br/>
            headLineNum:<input type="text" name="headLineNum">
            yourfile: <input type="file" name="file"/><br/>
            <input type="submit" value="上传图片"/>
        </form>



        <form action="http://47.105.137.32:8080/ERService/excel/downImportAthletesTemp" method="GET">
            fileName:<input type="text" name="fileName"><br/>
            <input type="submit" value="下载"/>
        </form>



        <form action="http://47.105.137.32:8080/ERService/athletes/importAthletes" id="form1" method="post"  enctype="multipart/form-data">
            <input type="submit" class="subForm" value="上传">
            <input type="file" class="file2" name="myFile" ><br/>
        </form>
        <form action="http://47.105.137.32:8080/ERService/athletes/importAthletes" id="form2" method="post" enctype="multipart/form-data">
            <input type="file" name="file"/><br/>
            <input type="hidden" v-model="$store.state.userId" name="userId" >
            <input type="hidden" v-model="$store.state.token" name="token" >

            <input style="border: none;
    background: #1890ff;
    color: white;
    width: 178px;
    height: 35px;
    margin: 36px 0px 0px 0px;
    border-radius: 3px;" type="submit"   value="表格上传"/>
        </form>


    </div>
</template>
<script>
    import $ from 'jquery'
    import 'jquery-form'
    const treeData =
        [{
        title: '0-0',
        key: '0-0',
        children: [{
            title: '0-0-0',
            key: '0-0-0',
            children: [
                { title: '0-0-0-0', key: '0-0-0-0' },
                { title: '0-0-0-1', key: '0-0-0-1' },
                { title: '0-0-0-2', key: '0-0-0-2' },
            ],
        }, {
            title: '0-0-1',
            key: '0-0-1',
            children: [
                { title: '0-0-1-0', key: '0-0-1-0' },
                { title: '0-0-1-1', key: '0-0-1-1' },
                { title: '0-0-1-2', key: '0-0-1-2' },
            ],
        }, {
            title: '0-0-2',
            key: '0-0-2',
        }],
    }, {
        title: '0-1',
        key: '0-1',
        children: [
            { title: '0-1-0-0', key: 'qssa' },
            { title: '0-1-0-1', key: 'asd' },
            { title: '0-1-0-2', key: 'asd' },
        ],
    }, {
        title: '0-2',
        key: '0-2',
    }]

    export default {
        data () {
            return {
                expandedKeys: ['0-0-0', '0-0-1'],
                autoExpandParent: true,
                checkedKeys: ['0-1-0-1',],
                selectedKeys: [],
                treeData,
            }
        },
        watch: {
            checkedKeys(val) {
                console.log('onCheck', val)
            }
        }, mounted() {
            $("#form2").ajaxForm(function(data){

            });
            this.$post('/auth/login/login',{'userName':'jack','password':'Commit'}).then((data)=>{
                console.log(data)
            })
            this.$fetch('/product/product/productList').then((data)=>{

            })
        },
        methods: {
            onExpand (expandedKeys) {
                console.log('onExpand', expandedKeys)
                // if not set autoExpandParent to false, if children expanded, parent can not collapse.
                // or, you can remove all expanded children keys.
                this.expandedKeys = expandedKeys
                this.autoExpandParent = false
            },
            onCheck (checkedKeys) {
                console.log('onCheck', checkedKeys)
                this.checkedKeys = checkedKeys
            },
            onSelect (selectedKeys, info) {
                console.log('onSelect', info)
                this.selectedKeys = selectedKeys
            },
        },
    }

</script>

