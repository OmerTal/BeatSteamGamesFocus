import { useEffect } from "react";

export const useAsync = <T extends {}>(
  asyncFunction: () => Promise<T>,
  onSuccess: Function,
  renderOptions: Object[],
  onFailure?: () => void,
  onFinally?: () => void[]
) => {
  useEffect(() => {
    let isActive = true;
    if (!renderOptions.some((obj) => obj === undefined)) {
      asyncFunction()
        .then((data: Object) => {
          if (isActive) {
            onSuccess(data);
          }
        })
        .catch(() => {
          onFailure?.();
        })
        .finally(() => {
          onFinally?.();
        });
    }
    return () => {
      isActive = false;
    };
  }, [...renderOptions]);
};
