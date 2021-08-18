import {computed} from 'vue'
export function useFocus(data,callback){ // 获取哪些元素被选中了
    const focusData = computed(() => {
        let focus = [];
        let unfocused = [];
        data.value.blocks.forEach(block => (block.focus ? focus : unfocused).push(block));
        return { focus, unfocused }
    });
    const clearBlockFocus = () => {
        data.value.blocks.forEach(block => block.focus = false);
    }
    const containerMousedown = () => {
        clearBlockFocus(); // 点击容器让选中的失去焦点
    }
    const blockMousedown = (e, block) => {
        e.preventDefault();
        e.stopPropagation();
        // block上我们规划一个属性 focus 获取焦点后就将focus变为true
        if (!e.shiftKey) {
          //没有按住shift就先清空其他选中
          clearBlockFocus();
        } 
        block.focus = !block.focus;
        callback(e)
    }
    return {
        blockMousedown,
        containerMousedown,
        focusData
    }
}