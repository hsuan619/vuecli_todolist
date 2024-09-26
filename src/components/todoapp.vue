<template>
  <div class="container">
    <h1 class="text-center">My ToDoList</h1>
    <!-- input -->
    <div class="d-flex p-5">
      <!--input v-model 綁定data的task-->
      <input
        v-model="task"
        type="text"
        placeholder="輸入待辦事項"
        v-on:keyup.enter="submitTask"
        class="form-control"
      /><!--加入enter press-->
      <button
        type="button"
        @click="submitTask(index)"
        class="add btn btn-outline-dark btn-sm"
      >
        新增
      </button>
    </div>
    <!--事項表格table -->
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">
            <font style="vertical-align: inherit"
              ><font style="vertical-align: inherit">事項</font></font
            >
          </th>
          <th scope="col">
            <font style="vertical-align: inherit"
              ><font style="vertical-align: inherit">進度</font></font
            >
          </th>
          <th scope="col">
            <font style="vertical-align: inherit"
              ><font style="vertical-align: inherit">#</font></font
            >
          </th>
          <th scope="col">
            <font style="vertical-align: inherit"
              ><font style="vertical-align: inherit">#</font></font
            >
          </th>
        </tr>
      </thead>
      <tbody>
        <!--v-for遍歷進表格-->
        <tr v-for="(task, index) in this.tasks" :key="index">
          <td>
            <!--以狀態為條件選擇樣式(CSS)-->
            <span
              :class="{
                done: task.status === 'Done',
                'text-warning': task.status === 'In-progress',
                todo: task.status === 'To-Do',
              }"
            >
              {{ task.name }}
              <!--data裡tasks的name-->
            </span>
          </td>
          <td style="width: 120px">
            <!--點擊切換狀態-->
            <span
              @click="changeStatus(index)"
              class="pointer"
              :class="{
                done: task.status === 'Done',
                'text-warning': task.status === 'In-progress',
                todo: task.status === 'To-Do',
              }"
            >
              {{ task.status }}
              <!--data裡tasks的status-->
            </span>
          </td>
          <!--edit icon-->
          <td>
            <!--點擊編輯名稱-->
            <div class="pointer text-center" @click="editTask(index)">
              <span class="fa fa-pen"></span>
            </div>
          </td>
          <!--delete icon-->
          <td>
            <!--點擊刪除事項-->
            <div class="pointer text-center" @click="deleteTask(index)">
              <span class="fa fa-trash"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <!--計算未完成事項-->
      <span class="other"
        ><b>還有{{ countToDo().length }}項未完成</b></span
      >
      <!--點擊清除全部事項-->
      <button
        type="button"
        @click="removeAll()"
        class="but btn reducefontsize btn-outline-danger"
      >
        清除全部
      </button>
    </div>
    <div class="tips">
      使用說明: 1.可按Enter輸入 2.點擊進度可更改狀態 3.編輯可更改名稱
      4.新增的任務會被放到最上方
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  props: {
    msg: String,
  },
  data() {
    return {
      task: "", // 存放輸入欄的值
      editedTask: null, // 判斷是否在編輯中，預設為未編輯
      availableStatus: ["To-Do", "In-progress", "Done"], // 跟方法的 changeStatus 判斷
      tasks: [
        // 預設的事項
        {
          name: "task1", // 事項名稱
          status: "In-progress", // 狀態
        },
        {
          name: "task2",
          status: "Done",
        },
        {
          name: "task3",
          status: "To-Do",
        },
      ],
    };
  },
  mounted() {
    if (localStorage.getItem("todos")) {
      // 如果 localStorage 中有 todos
      this.tasks = JSON.parse(localStorage.getItem("todos")); // 讀取並渲染資料
    }
  },
  methods: {
    // 儲存變動到 localStorage
    saveTodos() {
      localStorage.setItem("todos", JSON.stringify(this.tasks)); // 每次變動後更新 localStorage
    },
    // 計算未完成事項數量
    countToDo() {
      return this.tasks.filter((task) => task.status == "To-Do").length; // 篩選並回傳 "To-Do" 狀態的數量
    },
    // 清除所有事項
    removeAll() {
      this.tasks = []; // 清空 tasks 清單
      localStorage.removeItem("todos"); // 從 localStorage 中移除
    },
    // 新增或編輯事項
    submitTask() {
      if (this.task.length === 0) return; // 如果沒有輸入任何值，直接返回
      if (this.editedTask === null) {
        // 如果不是編輯狀態，新增事項
        this.tasks.unshift({
          name: this.task, // 設定名稱為輸入的值
          status: "To-Do", // 狀態設為 "To-Do"
        });
      } else {
        // 編輯模式
        this.tasks[this.editedTask].name = this.task; // 編輯該事項的名稱
        this.editedTask = null; // 重置編輯狀態
      }
      this.task = ""; // 清空輸入框
      this.saveTodos(); // 儲存變動
    },
    // 刪除特定事項
    deleteTask(index) {
      this.tasks.splice(index, 1); // 刪除該 index 的事項
      this.saveTodos(); // 儲存變動
    },
    // 編輯事項
    editTask(index) {
      this.task = this.tasks[index].name; // 將輸入欄設為該事項名稱
      this.editedTask = index; // 設定正在編輯的項目 index
    },
    // 更改事項狀態
    changeStatus(index) {
      let newIndex = this.availableStatus.indexOf(this.tasks[index].status); // 找到目前狀態的 index
      newIndex = (newIndex + 1) % this.availableStatus.length; // 切換到下一個狀態
      this.tasks[index].status = this.availableStatus[newIndex]; // 更新狀態
      this.saveTodos(); // 儲存變動
    },
  },
};
</script>

<!-- Add "scoped"=> this component only -->
<style scoped>
.container {
  margin-top: 100px;
}
.tips {
  text-align: left;
  margin-top: 30px;
}
.pointer {
  cursor: pointer;
}
.done {
  text-decoration: line-through;
  color: forestgreen;
}
.progress {
  color: darkblue;
}
.todo {
  color: firebrick;
}
.footer {
  color: gray;
}

.other {
  margin-top: 400px;
  margin: 10px;
  text-align: left;
}

.add {
  width: 60px;
  margin-left: 5px;
}
.container th {
  position: relative;
  text-align: center;
}
.container tbody {
  text-align: center;
}
.but {
  margin-top: 10px;
  float: right;
}
</style>
