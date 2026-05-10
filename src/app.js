/** @typedef {import('@odoo/owl')} */

import { Component, xml, mount, useRef, onMounted, useState } from "@odoo/owl";

class Task extends Component {
  static template = xml`
    <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
      <input type="checkbox" t-att-checked="props.task.isCompleted" t-on-click="toggleTask" />
      <span><t t-esc="props.task.text"/></span>
      <span class="delete" t-on-click="()=> this.props.onDelete(this.props.task)">🗑</span>
    </div>`;
  static props = ["task", "onDelete"];

  toggleTask() {
    this.props.task.isCompleted = !this.props.task.isCompleted;
    console.log(this.props.task);
  }
}

class Root extends Component {
  static template = xml`
  
  <div class="todo-app">
    <input placeholder="Enter a new task" t-on-keyup="addTask" t-ref="add-input"/>
    <div class="task-list">
        <t t-foreach="tasks" t-as="task" t-key="task.id">
            <Task task="task" onDelete.bind="deleteTask"/>
        </t>
    </div>
</div>
  `;

  nextId = 1;
  tasks = useState([]);
  deleteTask(task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks.splice(index, 1);
}

  setup() {
    const inputRef = useRef("add-input");
    onMounted(() => inputRef.el.focus());
  }

  addTask(ev) {
    if (ev.keyCode === 13) {
      const val = ev.target.value.trim();
      ev.target.value = "";

      this.tasks.push({
        id: this.nextId++,
        text: val,
        isCompleted: false,
      });

      console.log("adding task", this.tasks);
    }
  }

  static components = { Task };
}

mount(Root, document.body, { dev: true });
