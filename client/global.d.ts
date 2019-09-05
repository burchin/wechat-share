declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

interface Window {
  require: Function;
}