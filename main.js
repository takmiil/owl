import { Component, mount, signal, xml } from "@odoo/owl";

      class Counter extends Component {
        static template = xml`
          <button t-on-click="() => this.count.set(this.count() + 1)">
            Count: <t t-out="this.count()"/>
          </button>`;
        count = signal(0);
      }

      mount(Counter, document.body);