
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';





gsap.registerPlugin(ScrollTrigger);

export default (node: HTMLElement, { type, children, scrollTrigger, ...args }) => {
    const targets = children ? node.children : node;
    const timelineArgs = scrollTrigger ? { scrollTrigger: { trigger: node, start: 'top center', ...scrollTrigger } } : {};
    const timeline = gsap.timeline(timelineArgs)[type](targets, { ease: 'power2.out', overwrite: true, ...args });

    return {
        update(params) {
            timeline.duration(params.duration);
        },
        destroy() {
            timeline.killTweensOf(targets);
        }
    }
};