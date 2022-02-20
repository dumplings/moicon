import MoIcon from './main.vue';

const IconPlugin = {
  install(app) {
    app.component(MoIcon.name, MoIcon);
  },
};

export default IconPlugin;
