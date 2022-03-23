export default {
  install: (app, options) => {
    app.component('mo-icon', {
      props: {
        name: { type: String, default: null, required: true },
      },
      template: `<svg class="${options.prefix}-icon"><use :href="name"></use></svg>`,
    });
  },
};
