<template>
    <div>
        <form action="http://106.12.61.239:8080/ERService/excel/importAthletesExcel" method="POST" enctype="multipart/form-data">
            sheetNo:<input type="text" name="sheetNo"><br/>
            headLineNum:<input type="text" name="headLineNum">
            yourfile: <input type="file" name="file"/><br/>
            <input type="submit" value="上传图片"/>
        </form>



        <form action="http://106.12.61.239:8080/ERService/excel/downImportAthletesTemp" method="GET">
            fileName:<input type="text" name="fileName"><br/>
            <input type="submit" value="下载"/>
        </form>
    </div>
</template>
<script>
    const treeData = [{
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

