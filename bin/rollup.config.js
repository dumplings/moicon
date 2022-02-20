import vue from 'rollup-plugin-vue';

export default {
  input: 'src/MoIcon/main.js',
  output: {
    format: 'esm',
    file: 'dist/vueIcon.js',
  },
  plugins: [
    vue(),
  ],
};
