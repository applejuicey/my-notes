<template>
  <div class="list-notes">

    <el-row>
      <el-col :span="24" class="table-container">
        <h1>浏览器数据库中暂存的笔记</h1>

        <el-table :data="tableCurrentData" stripe class="notes-list-table">
          <el-table-column label="标题">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="作者">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="标签">
            <template slot-scope="scope">
              <span>{{ scope.row.tags }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数据库内ID">
            <template slot-scope="scope">
              <span>{{ scope.row.noteID }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationData.currentPage"
            :page-sizes="paginationData.pageSizesArray"
            :page-size="paginationData.currentPageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationData.totalRowNumber">
        </el-pagination>

      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="table-container">
        <h1>服务器上保存的笔记</h1>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { OpenOrCreateAnIndexedDB, getNRecordsThroughKey, getRecordNumber } from '@/config/indexedDB/indexedDB.js';
  export default {
    name: 'admin-list-notes',
    components: {

    },
    data() {
      return {

        tableCurrentData: null,
        paginationData: {
          totalRowNumber: 100,
          pageSizesArray: [5, 10],
          currentPageSize: 5,
          currentPage: 1,
        },
        recordStartNumber: 1, //从哪条记录开始
        recordNumber: 5,  //要几条记录

      };
    },
    computed: {

    },
    watch: {

      // 监听起点recordStartNumber和长度recordNumber两个变量，拉取数据
      recordStartNumber: {
        handler(newValue, oldValue) {
          console.log('新起点:', newValue);
          if (this.$store.state.IDBDatabaseInfo) {
            this.getDataFromIndexedDB(this.recordStartNumber, this.recordNumber, this.$store.state.IDBDatabaseInfo);
          }
        },
      },
      recordNumber: {
        handler(newValue, oldValue) {
          console.log('新长度:', newValue);
          if (this.$store.state.IDBDatabaseInfo) {
            this.getDataFromIndexedDB(this.recordStartNumber, this.recordNumber, this.$store.state.IDBDatabaseInfo);
          }
        },
      },

      // 监听分页信息paginationData，有变化则保存至sessionStorage
      paginationData: {
        handler(newValue, oldValue) {
          console.log('新分页信息:', newValue);
          sessionStorage.setItem('paginationData', JSON.stringify(this.paginationData));
        },
        deep: true,
      },

    },
    beforeCreate() {

    },
    created() {

      let this_vm =this;
      // 从sessionStorage中取出当前分页的状态paginationData
      if (sessionStorage.getItem('paginationData')) {
        this_vm.paginationData = JSON.parse(sessionStorage.getItem('paginationData'));
      }
      // 先连接到数据库，拉取一次数据
      OpenOrCreateAnIndexedDB().then( database => {
        this.$store.dispatch('setIDBDatabaseInfo', database);
        this_vm.getRecordTotalNumberFromIndexedDB(database);
        let recordNumber = this.paginationData.currentPageSize;
        let recordStartNumber = (this.paginationData.currentPage - 1) * this.paginationData.currentPageSize + 1;
        this.getDataFromIndexedDB(recordStartNumber, recordNumber, database);
      }).catch( error => {
        console.log(error);
      });

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {

      /**
       * @description: 根据recordStartNumber和recordNumber，从IndexedDB中获取数据
       * @param: recordStartNumber, recordNumber, IDBDatabaseInfo
       * @return:
       * @author: FY
       * @date: 2018-12-14
      */
      getDataFromIndexedDB: function (recordStartNumber, recordNumber, IDBDatabaseInfo) {
        let this_vm = this;
        let notesTableLoading = this.$loading({
          lock: true,
          text: '正在获取笔记列表......',
          // spinner: 'el-icon-loading',
          background: 'rgba(0, 191, 255, 0.05)',
          // 以class的方式定位loading
          target: document.querySelector('.table-container'),
        });
        getNRecordsThroughKey(recordStartNumber, recordNumber, IDBDatabaseInfo).then(function (data) {
          let tempArr = [];
          for (let item of data) {
            tempArr.push({
              title: item.IDBValue.title,
              author: item.IDBValue.author,
              tags: item.IDBValue.tags,
              noteID: item.IDBValue.noteID,
              noteContent: item.IDBValue.noteContent,
            });
          }
          this_vm.tableCurrentData = tempArr;
          setTimeout(() => {
            notesTableLoading.close();
          }, 1000);
        }).catch(function (error) {
          notesTableLoading.close();
          console.error(error);
        });
      },

      /**
       * @description: 从IndexedDB中获取笔记的数量，并填充到paginationData.totalRowNumber中
       * @param: IDBDatabaseInfo
       * @return:
       * @author: FY
       * @date: 2018-12-14
       */
      getRecordTotalNumberFromIndexedDB: function (IDBDatabaseInfo) {
        let this_vm = this;
        getRecordNumber(IDBDatabaseInfo).then(function (data) {
          this_vm.paginationData.totalRowNumber = data;
        }).catch(function (error) {
          console.error(error);
        });
      },

      /**
       * @description: 查看、编辑、删除IndexedDB中的笔记，一些组件处理IndexedDB中的笔记时noteID要以8开头
       * @param: index是表格中的行号, row是当前行的数据
       * @return:
       * @author: FY
       * @date: 2018-12-14
      */
      handleView(index, row) {
        let this_vm = this;
        if (row.noteID) {
          // 当前row中存在noteID时，跳转至查看页面
          this_vm.$router.push({ name:'noteDisplay', params: { noteid: row.noteID + 80000000 + '' } });
        } else {
          this_vm.$message({
            message: '该行中不存在noteID',
            type: 'error',
            showClose: true,
          });
        }
      },
      handleEdit(index, row) {
        let this_vm = this;
        if (row.noteID) {
          // 当前row中存在noteID时，跳转至编辑页面
          this.$router.push({ name:'editNote', params: { noteid: row.noteID + 80000000 + '' } });
        } else {
          this_vm.$message({
            message: '该行中不存在noteID',
            type: 'error',
            showClose: true,
          });
        }
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

      /**
       * @description: 当用户点击了每页显示几条记录的时候的处理事件
       * @param: val：代表用户当前选择了每页显示val条记录
       * @return:
       * @author: FY
       * @date: 2018-12-14
      */
      handleSizeChange(val) {
        let this_vm = this;
        // 当每页记录数量currentPageSize变更时，改变每次获取笔记的数量recordNumber
        this_vm.paginationData.currentPageSize = val;
        this_vm.recordNumber = this_vm.paginationData.currentPageSize;
        // 同时根据currentPage重新计算开始位置recordStartNumber
        this_vm.recordStartNumber = (this_vm.paginationData.currentPage - 1) * this_vm.paginationData.currentPageSize + 1;
      },

      /**
       * @description: 当用户点击了页码的时候的处理事件
       * @param: val：代表用户当前选择了第val页
       * @return:
       * @author: FY
       * @date: 2018-12-14
       */
      handleCurrentChange(val) {
        let this_vm = this;
        // 当currentPage变化时，重新计算开始位置recordStartNumber
        this_vm.paginationData.currentPage = val;
        this_vm.recordStartNumber = (this_vm.paginationData.currentPage - 1) * this_vm.paginationData.currentPageSize + 1;
      },

    },
  }
</script>

<style scoped>
  .list-notes {
    height: 78vh;
    overflow-y: scroll;
  }
  .table-container h1 {
    margin: 5px 0 5px 0;
    font-weight: lighter;
    font-size: xx-large;
  }
</style>