const { Component, xml, mount, useRef, onMounted, useState  } = owl;

class Task extends Component {
  static template = xml`
    <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
      <input type="checkbox" t-att-checked="props.task.isCompleted" />
      <span><t t-esc="props.task.text"/></span>
    </div>`;
  static props = ["task"];
}

class Root extends Component {
  static template = xml`
  
  <div class="todo-app">
    <input placeholder="Enter a new task" t-on-keyup="addTask" t-ref="add-input"/>
    <div class="task-list">
        <t t-foreach="tasks" t-as="task" t-key="task.id">
            <Task task="task"/>
        </t>
    </div>
</div>
  `;

  nextId = 1;
  tasks = useState([]);

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
        isCompleted: false
      });

      console.log("adding task", this.tasks);
    }
  }

  static components = { Task };
}

mount(Root, document.body, { dev: true });
