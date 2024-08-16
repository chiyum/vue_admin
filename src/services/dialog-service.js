import { useQuasar } from "quasar";
import defaultDialog from "@/widgets/dialog/dialog-default.vue";

export function useDialog() {
  const $q = useQuasar();
  const show = (props, dialog = defaultDialog) => {
    return $q.dialog({
      component: dialog,
      // props forwarded to your custom component
      componentProps: {
        ...props,
      },
    });
  };

  return {
    show,
  };
}

export default useDialog;
