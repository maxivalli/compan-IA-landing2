// El build "light" de lottie-web no trae tipos propios; reusamos los del paquete.
declare module 'lottie-web/build/player/lottie_light' {
  import type { AnimationConfigWithPath, AnimationItem } from 'lottie-web';
  const lottie: { loadAnimation(params: AnimationConfigWithPath): AnimationItem };
  export default lottie;
}
